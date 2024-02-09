import './index.css';

/* Original Bankist App by Jonas Schmedtmann. */

export default function App() {
  return (
    <>
      <Navbar>
        <p className="welcome">Log in to get started.</p>
        <img
          src="./src/assets/logo.png"
          alt="logo"
          className="logo"
        />

        <Form className={'login'}>
          {/* Login */}
          <Input
            type={'text'}
            placeholder={'user'}
            className={'login__input login__input--user'}
          />
          <Input
            type={'password'}
            placeholder={'PIN'}
            maxLength={4}
            className={'login__input login__input--pin'}
          />

          <Button className="login__btn">→</Button>
        </Form>
      </Navbar>

      <MainContainer>
        {/* Balance */}
        <Content className={'balance'}>
          <Inner>
            <p className="balance__label">Current balance</p>
            <p className="balance__date">
              As of <span className="date">05/03/2037</span>
            </p>
          </Inner>
          <p className="balance__value">0000 EUR</p>
        </Content>

        {/* Movements: LOOP THRU DATA */}
        <Content className={'movements'}>
          <Inner className={'movements__row'}>
            <div className="movements__type movements__type--deposit">2 deposit</div>
            <div className="movements__date">3 days ago</div>
            <div className="movements__value">4000€</div>
          </Inner>

          <Inner className={'movements__row'}>
            <div className="movements__type movements__type--withdrawal">1 withdrawal</div>
            <div className="movements__date">24/01/2037</div>
            <div className="movements__value">-378€</div>
          </Inner>
        </Content>

        {/* Summary: NEED TO DYNAMICALLY UPDATE */}
        <Content className={'summary'}>
          <p className="summary__label">In</p>
          <p className="summary__value summary__value--in">0000€</p>
          <p className="summary__label">Out</p>
          <p className="summary__value summary__value--out">0000€</p>
          <p className="summary__label">Interest</p>
          <p className="summary__value summary__value--interest">0000€</p>
          <Button className="btn--sort">↓ SORT</Button>
        </Content>

        {/* Operation: Transfers */}
        <Content className={'operation operation--transfer'}>
          <h2>Transfer money</h2>

          <Form className={'form form--transfer'}>
            <Input
              type={'text'}
              className={'form__input form__input--to'}
            />
            <Input
              type={'number'}
              className={'form__input form__input--amount'}
            />
            <Button className="form__btn form__btn--transfer">→</Button>

            <Label className="form__label">Transfer to</Label>
            <Label className="form__label">Amount</Label>
          </Form>
        </Content>

        {/* Operation: Loan */}
        <Content className={'operation operation--loan'}>
          <h2>Request loan</h2>

          <Form className={'form form--loan'}>
            <Input
              type={'number'}
              className={'form__input form__input--loan-amount'}
            />
            <Button className="form__btn form__btn--loan">→</Button>

            <Label className="form__label form__label--loan">Amount</Label>
          </Form>
        </Content>

        {/* Operation: Close */}
        <Content className={'operation operation--close'}>
          <h2>Close account</h2>

          <Form className={'form form--close'}>
            <Input
              type={'text'}
              className={'form__input form__input--user'}
            />
            <Input
              type={'password'}
              maxLength={4}
              className={'form__input form__input--pin'}
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
    </>
  );
}

// Component Composition
function Navbar({ children }) {
  return <nav>{children}</nav>;
}

function MainContainer({ children }) {
  return <main className="app">{children}</main>;
}

function LogoutTimer({ children }) {
  return <>{children}</>;
}

// Reusable Component
function Form({ className, children }) {
  return <form className={className}>{children}</form>;
}
function Input({ type, placeholder, maxLength, className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      maxLength={maxLength}
      className={className}
    />
  );
}

function Content({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Inner({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className, children }) {
  return <button className={className}>{children}</button>;
}

function Label({ className, children }) {
  return <label className={className}>{children}</label>;
}
