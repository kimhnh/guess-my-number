import { useState } from 'react';
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
- add time/date formatting for: balance / movements
- add localizing currency based on region (update initial data): balance / movements / summary
- add timer
- login -> sort -> log out -> sort bugged
*/

export default function App() {
  const [data, setData] = useState(initialData);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState(''); // to display UI
  const [isSorted, setIsSorted] = useState(false);

  // Derived states (Helps update "real-time" but must all map data)
  let currMovs = data.find((d) => user === d.username)?.movements;
  let currBalance = data.find((d) => user === d.username)?.balance;

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
          <Balance currBalance={currBalance} />
          <Movements currMovs={currMovs} />
          <Summary
            currMovs={currMovs}
            data={data}
            user={user}
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
            onLogInOut={handleLogInOut}
          />

          {/* Logout Timer*/}
          <LogoutTimer />
        </Container>
      )}
    </>
  );
}
