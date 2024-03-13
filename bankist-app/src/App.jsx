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
- fix date formatter + add new date values into loan/transfer operations
- fix logout timer
- login -> sort -> log out -> sort bugged
*/

export default function App() {
  const [data, setData] = useState(initialData);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState(''); // to display UI
  const [isSorted, setIsSorted] = useState(false);
  const [loan, setLoan] = useState('');
  const [logoutTimer, setLogoutTimer] = useState(100); // change to 5 * 60

  // Derived states (Helps update "real-time" but must all map data)
  let currMovs = data.find((d) => user === d.username)?.movements;
  let currBalance = data.find((d) => user === d.username)?.balance;
  let currInterest = data.find((d) => user === d.username)?.interestRate;

  // Event handlers
  function handleLogInOut() {
    setUser('');
    setPassword('');
    setLoggedUser('');
    setIsSorted(false);
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

  function handleSortClick() {
    if (!isSorted) {
      setIsSorted((s) => !s);
      setData((d) =>
        d.map((i) =>
          user === i.username
            ? {
                ...i,
                originalMovements: i.movements.slice(),
                movements: i.movements.toSorted((a, b) => a - b),
              }
            : i
        )
      );
    }

    if (isSorted) {
      setIsSorted((s) => !s);
      setData((d) =>
        d.map((i) => (user === i.username ? { ...i, movements: i.originalMovements.slice() } : i))
      );
    }
  }

  function handleLoanSubmit(e) {
    e.preventDefault();
    if (loan > 0 && currMovs.some((mov) => mov <= loan * 0.1)) {
      setData((d) =>
        d.map((i) =>
          user === i.username
            ? { ...i, movements: [...i.movements, loan], balance: currBalance + loan }
            : i
        )
      );
    } else {
      console.log('Failed to receive loan.');
    }
    setLoan('');
  }

  // 1. start timer when logged in (dependancy array) [DONE]
  // 2. update timer every second (setter function, subtract 1) [DONE]
  // 3. do the above only when logged in + timer is greater than 0 [DONE]
  // 4. restart timer when user makes a transfer / takes out a loan
  // 5. cancel timer (clean-up fn) [DONE]

  // Effects
  // Logout Timer (setInterval)
  useEffect(() => {
    const timer = setInterval(() => {
      if (loggedUser && logoutTimer > 0) {
        setLogoutTimer((l) => l - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [loggedUser, logoutTimer]);

  return (
    <>
      {/* Login */}
      <Navbar
        loggedUser={loggedUser}
        onLoginSubmit={handleLoginSubmit}
        onLogInOut={handleLogInOut}
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
            loggedUser={loggedUser}
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
            loan={loan}
            setLoan={setLoan}
            onLoanSubmit={handleLoanSubmit}
          />
          <CloseOperation
            loggedUser={loggedUser}
            setData={setData}
            onLogInOut={handleLogInOut}
          />

          {/* Logout Timer*/}
          <LogoutTimer logoutTimer={logoutTimer} />
        </Container>
      )}
    </>
  );
}
