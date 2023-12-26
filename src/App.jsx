import './index.css';

export default function App() {
  return (
    <>
      <Navbar>
        <Title />
        <Between />
        <Button>Again!</Button>
        <Number />
      </Navbar>
      <Main>
        <LeftBox>
          <Input />
          <Button>Check!</Button>
        </LeftBox>
        <RightBox>
          <Message />
          <Score />
        </RightBox>
      </Main>
    </>
  );
}

function Navbar({ children }) {
  return <header>{children}</header>;
}

function Button({ children }) {
  return <button className="btn">{children}</button>;
}

function Between() {
  return <p className="between">(Between 1 and 20)</p>;
}

function Title() {
  return <h1>Guess My Number!</h1>;
}

function Number() {
  return <div className="number">?</div>;
}

function Main({ children }) {
  return <main>{children}</main>;
}

function LeftBox({ children }) {
  return <section className="left">{children}</section>;
}

function Input() {
  return (
    <input
      type="number"
      className="guess"
    />
  );
}

function RightBox({ children }) {
  return <section className="right">{children}</section>;
}

function Message() {
  return <p className="message">Start guessing...</p>;
}

function Score() {
  return (
    <>
      <p className="label-score">💯 Score: 0</p>
      <p className="label-score">🥇 Highscore: 0</p>
    </>
  );
}
