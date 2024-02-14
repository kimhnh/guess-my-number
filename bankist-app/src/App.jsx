import { useState } from 'react';
import Button from './components/Button';
import Content from './components/Content';
import Form from './components/Form';
import Inner from './components/Inner';
import Input from './components/Input';
import Label from './components/Label';
import LogoutTimer from './components/LogoutTimer';
import MainContainer from './components/MainContainer';
import Navbar from './components/Navbar';
import './index.css';

/* Original Bankist App by Jonas Schmedtmann. */

// sort works but now any transfer/request loan actions do not update immediately

const initialData = [
  {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  },
  {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
  {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  },
  {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  },
];

// create accountNo, balance, username properties (forEach OK for now...?)
const createUsername = function (arr) {
  return arr.forEach((el, index) => {
    el.accountNo = index + 1;
    el.balance = el.movements.reduce((acc, curr) => acc + curr, 0);
    el.username = el.owner
      .toLowerCase()
      .split(' ')
      .map((el) => el[0])
      .join('');
  });
};

createUsername(initialData);
// console.log(initialData);

export default function App() {
  // Current user states
  const [data, setData] = useState(initialData);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [currUser, setCurrUser] = useState(''); // display only
  const [isSorted, setIsSorted] = useState(false);
  const [displayMovs, setDisplayMovs] = useState('');

  // Derived states (Helps update "real-time")
  let currMovs = data.find((d) => user === d.username)?.movements;
  let currBalance = data.find((d) => user === d.username)?.balance;
  let currInterest = data.find((d) => user === d.username)?.interestRate;

  // Action states
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [loan, setLoan] = useState('');
  const [closeUser, setCloseUser] = useState('');
  const [closePassword, setClosePassword] = useState('');

  // Event-handlers
  function handleClick() {
    setCurrUser('');
    setUser('');
    setPassword('');
    setDisplayMovs('');
    setIsSorted(false);
  }

  function handleSortClick() {
    if (!isSorted) {
      setIsSorted(!isSorted);
      setDisplayMovs((d) => currMovs.toSorted((a, b) => a - b));
    }

    if (isSorted) {
      setIsSorted(!isSorted);
      setDisplayMovs((d) => data.find((d) => user === d.username).movements);
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    // revisit this condition
    if (
      user === data.find((d) => user === d.username)?.username &&
      password === data.find((d) => password === d.pin).pin
    ) {
      setCurrUser((c) => data.find((d) => user === d.username));
      setDisplayMovs((d) => data.find((d) => user === d.username).movements);
    } else {
      setUser('');
      setPassword('');
      console.log('Failed to login.');
    }
  }

  function handleTransferSubmit(e) {
    e.preventDefault();

    // 1. prevent self-transfer, 2. recipient exists in data, 3. positive amount, 4. transferAmount <= balance
    if (
      currUser.username !== transferTo &&
      data.find((d) => transferTo === d.username) &&
      transferAmount > 0 &&
      transferAmount <= currUser.balance
    ) {
      // Add movement (currUser)
      setData((d) =>
        d.map((i) =>
          currUser.username === i.username
            ? {
                ...i,
                movements: [...currUser.movements, -transferAmount],
                balance: currUser.balance - transferAmount,
              }
            : i
        )
      );

      // Add movement (recipient)
      setData((d) =>
        d.map((i) =>
          transferTo === i.username
            ? {
                ...i,
                movements: [...i.movements, transferAmount],
                balance: i.balance + transferAmount,
              }
            : i
        )
      );
    } else {
      console.log('Failed to transfer.');
    }
    setTransferTo('');
    setTransferAmount('');
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

  function handleCloseSubmit(e) {
    e.preventDefault();

    // only check if current user === close user
    if (currUser.username === closeUser && currUser.pin === closePassword) {
      setData((d) => d.filter((i) => closeUser !== i.username));
      handleClick(); // logout
    } else {
      console.log('Failed to close account.');
    }
    setCloseUser('');
    setClosePassword('');
    setDisplayMovs('');
    setIsSorted(false);
  }

  return (
    <>
      <Navbar>
        <p className="welcome">
          {!currUser ? 'Log in to get started.' : `Welcome back, ${currUser.owner.split(' ')[0]}!`}
        </p>
        <img
          src="./src/assets/logo.png"
          alt="logo"
          className="logo"
        />

        {!currUser ? (
          <Form
            className={'login'}
            onSubmit={handleLoginSubmit}
          >
            {/* Login */}
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
            <Button className="login__btn">→</Button>
          </Form>
        ) : (
          <Button
            onClick={handleClick}
            className="login__btn"
          >
            Logout
          </Button>
        )}
      </Navbar>

      {currUser && (
        <MainContainer>
          {/* Balance */}
          <Content className={'balance'}>
            <Inner>
              <p className="balance__label">Current balance</p>
              <p className="balance__date">
                As of <span className="date">05/03/2037</span>
              </p>
            </Inner>
            <p className="balance__value">{currBalance} EUR</p>
          </Content>

          {/* Movements: displayed descending order */}
          <Content className={'movements'}>
            {displayMovs.toReversed().map((mov, index, arr) => (
              <Inner
                className={'movements__row'}
                key={crypto.randomUUID()}
              >
                <div
                  className={`movements__type movements__type--${
                    mov > 0 ? 'deposit' : 'withdrawal'
                  }`}
                >
                  {arr.length - index} {mov > 0 ? 'deposit' : 'withdrawal'}
                </div>
                <div className="movements__date">3 days ago</div>
                <div className="movements__value">{mov}€</div>
              </Inner>
            ))}
          </Content>

          {/* Summary */}
          <Content className={'summary'}>
            <p className="summary__label">In</p>
            <p className="summary__value summary__value--in">
              {currMovs.filter((mov) => mov > 0).reduce((acc, curr) => acc + curr, 0)}€
            </p>
            <p className="summary__label">Out</p>
            <p className="summary__value summary__value--out">
              {Math.abs(currMovs.filter((mov) => mov < 0).reduce((acc, curr) => acc + curr, 0))}€
            </p>
            <p className="summary__label">Interest</p>
            <p className="summary__value summary__value--interest">
              {currMovs
                .filter((mov) => mov > 0)
                .map((deposit) => deposit * (currInterest / 100))
                .filter((int) => int >= 1)
                .reduce((acc, int) => acc + int, 0)}
              €
            </p>
            <Button
              className="btn--sort"
              onClick={handleSortClick}
            >
              ↓ SORT
            </Button>
          </Content>

          {/* Operation: Transfers */}
          <Content className={'operation operation--transfer'}>
            <h2>Transfer money</h2>

            <Form
              className={'form form--transfer'}
              onSubmit={handleTransferSubmit}
            >
              <Input
                type={'text'}
                className={'form__input form__input--to'}
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
              />
              <Input
                type={'number'}
                className={'form__input form__input--amount'}
                value={transferAmount}
                onChange={(e) => setTransferAmount(Number(e.target.value))}
              />
              <Button className="form__btn form__btn--transfer">→</Button>
              <Label className="form__label">Transfer to</Label>
              <Label className="form__label">Amount</Label>
            </Form>
          </Content>

          {/* Operation: Loan */}
          <Content className={'operation operation--loan'}>
            <h2>Request loan</h2>

            <Form
              className={'form form--loan'}
              onSubmit={handleLoanSubmit}
            >
              <Input
                type={'number'}
                className={'form__input form__input--loan-amount'}
                value={loan}
                onChange={(e) => setLoan(Number(e.target.value))}
              />
              <Button className="form__btn form__btn--loan">→</Button>

              <Label className="form__label form__label--loan">Amount</Label>
            </Form>
          </Content>

          {/* Operation: Close */}
          <Content className={'operation operation--close'}>
            <h2>Close account</h2>

            <Form
              className={'form form--close'}
              onSubmit={handleCloseSubmit}
            >
              <Input
                type={'text'}
                className={'form__input form__input--user'}
                value={closeUser}
                onChange={(e) => setCloseUser(e.target.value)}
              />
              <Input
                type={'password'}
                maxLength={4}
                className={'form__input form__input--pin'}
                value={closePassword}
                onChange={(e) => setClosePassword(Number(e.target.value))}
              />

              <Button className={'form__btn form__btn--close'}>→</Button>
              <Label className={'form__label'}>Confirm user</Label>
              <Label className={'form__label'}>Confirm PIN</Label>
            </Form>
          </Content>

          {/* Logout Timer*/}
          <LogoutTimer>
            <p className="logout-timer">
              You will be logged out in <span className="timer">05:00</span>
            </p>
          </LogoutTimer>
        </MainContainer>
      )}
    </>
  );
}
