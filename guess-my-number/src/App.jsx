import { useState } from 'react';
import './index.css';

export default function App() {
  const randomNum = Math.floor(Math.random() * 20) + 1; // derived state?
  const [secretNum, setSecretNum] = useState(randomNum);
  const [guessNum, setGuessNum] = useState('');
  const [msg, setMsg] = useState('Start guessing...');
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [hasWon, setHasWon] = useState(false); // change of UI so a derived state would not work

  // Reset all state except highScore
  function handlePlayAgain() {
    setSecretNum(randomNum);
    setGuessNum('');
    setMsg('Start guessing...');
    setScore(20);
    setHasWon(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Guard clause, prevent NaN from being input
    if (!guessNum || guessNum === '') {
      setMsg('⛔ No number!');
    }

    // Player wins
    if (guessNum === secretNum) {
      setMsg('🎉 Correct Number!');
      setHasWon(true);

      if (score > highScore) {
        setHighScore(score);
      }

      // Player is wrong
    } else {
      if (score > 1) {
        setMsg(guessNum > secretNum ? '📈 Too high!' : '📉 Too low!');
        setScore((s) => s - 1);

        // Player loses
      } else {
        setMsg('💣 You lost the game!');
        setScore(0);
      }
    }
  }

  return (
    <div
      className="app"
      style={{ backgroundColor: hasWon && '#60b347' }}
    >
      <Navbar>
        <Title />
        <Between />
        <Button
          className="btn again"
          onClick={handlePlayAgain}
        >
          Again!
        </Button>
        <AnswerBlock style={{ width: hasWon && '30rem' }}>{hasWon ? secretNum : '?'}</AnswerBlock>
      </Navbar>

      <Main>
        <Box className="left">
          <Form onSubmit={handleSubmit}>
            <Input
              guessNum={guessNum}
              setGuessNum={setGuessNum}
            />
            <Button className="btn">Check!</Button>
          </Form>
        </Box>

        <Box className="right">
          <Message msg={msg} />
          <Score
            score={score}
            highScore={highScore}
          />
        </Box>
      </Main>
    </div>
  );
}

// Reusable components
function Button({ children, className, onClick }) {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Box({ children, className }) {
  return <section className={className}>{children}</section>;
}

// Composition
function Navbar({ children }) {
  return <header>{children}</header>;
}

function Between() {
  return <p className="between">(Between 1 and 20)</p>;
}

function Title() {
  return <h1>Guess My Number!</h1>;
}

function AnswerBlock({ children, style }) {
  return (
    <div
      className="number"
      style={style}
    >
      {children}
    </div>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}

function Form({ children, onSubmit }) {
  return <form onSubmit={onSubmit}>{children}</form>;
}

function Input({ guessNum, setGuessNum }) {
  return (
    <input
      type="number"
      className="guess"
      value={guessNum}
      onChange={(e) => setGuessNum(Number(e.target.value))} // the reason why Number method wasn't working is because I had a component named 'Number'
    />
  );
}

function Message({ msg }) {
  return <p className="message">{msg}</p>;
}

function Score({ score, highScore }) {
  return (
    <>
      <p className="label-score">💯 Score: {score}</p>
      <p className="label-highscore">🥇 Highscore: {highScore}</p>
    </>
  );
}
