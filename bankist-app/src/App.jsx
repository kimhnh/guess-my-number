import { useEffect, useState } from 'react';
import { initialData } from './data/data';
import Balance from './components/Balance';
import Container from './components/Container';
import CloseOperation from './components/CloseOperation';
import Input from './components/form/Input';
import LoanOperation from './components/LoanOperation';
import LogoutTimer from './components/LogoutTimer';
import Movements from './components/Movements';
import Navbar from './components/Navbar';
import Summary from './components/Summary';
import TransferOperation from './components/TransferOperation';
import './assets/index.css';

/* Original Bankist App by Jonas Schmedtmann. */

/* TODO:
- prevent logout timer from re-rendering every second
*/

export default function App() {
  const [data, setData] = useState(initialData);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState(''); // to display UI only
  const [isSorted, setIsSorted] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(5); // change to 5 * 60

  // Derived states (Helps update "real-time" but must all map data)
  let currUser = data.find((d) => user === d.username);
  let currMovs = data.find((d) => user === d.username)?.movements;
  let currBalance = data.find((d) => user === d.username)?.balance;
  let currInterest = data.find((d) => user === d.username)?.interestRate;

  // Event handlers
  function handleLogout() {
    // delete backupMovements with deconstructing
    if (currUser.backupMovements) {
      console.log('this account has a backup Movs');
      setData((d) =>
        d
          .map((i) =>
            user === i.username
              ? {
                  ...i,
                  movements: i.backupMovements.slice(),
                }
              : i
          )
          .map(({ backupMovements, ...rest }) => rest)
      );
    }
    setIsSorted(false);
    setUser('');
    setPassword('');
    setLoggedUser('');
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    if (
      user === data.find((d) => user === d.username)?.username &&
      password === data.find((d) => password === d.pin).pin
    ) {
      setLoggedUser(data.find((d) => user === d.username));
    } else {
      setUser('');
      setPassword('');
      console.log('Failed to login.');
    }
  }

  // link sorted movements with movementsDates (maybe I cant do this within my scope right now)
  function handleSortClick() {
    if (!isSorted) {
      setIsSorted((s) => !s);
      setData((d) =>
        d.map((i) =>
          user === i.username
            ? {
                ...i,
                backupMovements: i.movements.slice(),
                movements: i.movements.toSorted((a, b) => a - b),
              }
            : i
        )
      );
    }

    // revert to original movements array
    // delete backupMovements with deconstructing
    if (isSorted) {
      setIsSorted((s) => !s);
      setData((d) =>
        d
          .map((i) =>
            user === i.username
              ? {
                  ...i,
                  movements: i.backupMovements.slice(),
                }
              : i
          )
          .map(({ backupMovements, ...rest }) => rest)
      );
    }
  }

  // 1. restart timer when user makes a transfer / takes out a loan

  // Effects
  // Logout Timer (setInterval)
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (loggedUser && logoutTimer > 0) {
  //       setLogoutTimer((l) => l - 1);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [loggedUser, logoutTimer]);

  return (
    <>
      {/* Login */}
      <Navbar
        loggedUser={loggedUser}
        onLoginSubmit={handleLoginSubmit}
        onLogout={handleLogout}
      >
        <Input
          type={'text'}
          placeholder={'user'}
          className={'login__input login__input--user'}
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          type={'password'}
          placeholder={'PIN'}
          maxLength={4}
          className={'login__input login__input--pin'}
          value={password}
          onChange={(e) => setPassword(Number(e.target.value))}
        />
      </Navbar>

      {/* Display UI @ Login */}
      {loggedUser && (
        <Container>
          <Balance
            loggedUser={loggedUser}
            currBalance={currBalance}
          />
          <Movements
            currUser={currUser}
            currMovs={currMovs}
          />
          <Summary
            loggedUser={loggedUser}
            currMovs={currMovs}
            currInterest={currInterest}
            onSortClick={handleSortClick}
          />

          {/* Operations */}
          <TransferOperation
            loggedUser={loggedUser}
            data={data}
            setData={setData}
          />
          <LoanOperation
            currMovs={currMovs}
            currBalance={currBalance}
            setData={setData}
            user={user}
          />
          <CloseOperation
            loggedUser={loggedUser}
            setData={setData}
            onLogout={handleLogout}
          />

          {/* Logout Timer*/}
          <LogoutTimer logoutTimer={logoutTimer} />
        </Container>
      )}
    </>
  );
}
