import { useState } from 'react';
import './index.css';

export default function App() {
  const [isActive, setIsActive] = useState(0); // using num prop to indicate active player
  const p1Playing = isActive === 0; // derived state
  const [playing, setPlaying] = useState(true);
  const [diceNum, setDiceNum] = useState(null); // dice image state
  const [currScoreP1, setCurrScoreP1] = useState(0);
  const [currScoreP2, setCurrScoreP2] = useState(0);
  const [scoreP1, setScoreP1] = useState(0);
  const [scoreP2, setScoreP2] = useState(0);

  function handleRoll() {
    const dice = Math.floor(Math.random() * 6 + 1); // 1~6
    setDiceNum((s) => dice);
    // check if roll = 1
    if (dice !== 1) {
      // check player
      if (p1Playing) {
        setCurrScoreP1((c) => c + dice);
      } else {
        setCurrScoreP2((c) => c + dice);
      }
      console.log(dice);
      // wipe current score to 0
    } else {
      // check player
      if (p1Playing) {
        setCurrScoreP1(0);
      } else {
        setCurrScoreP2(0);
      }
      setIsActive((a) => (isActive === 0 ? 1 : 0));
    }
  }

  function handleHold() {
    if (scoreP1 >= 10 || scoreP2 >= 10) {
      setPlaying(false); // todo: batch update or update logic not working as intended
    } else {
      if (p1Playing) {
        setScoreP1((s) => s + currScoreP1);
        setCurrScoreP1(0);
      } else {
        setScoreP2((s) => s + currScoreP2);
        setCurrScoreP2(0);
      }
      setIsActive((a) => (isActive === 0 ? 1 : 0));
    }
  }

  function handleNewGame() {
    setIsActive(0);
    setPlaying(true);
    setCurrScoreP1(0);
    setCurrScoreP2(0);
    setScoreP1(0);
    setScoreP2(0);
  }

  return (
    <div className="app">
      <Player
        num={0}
        isActive={isActive}
        playing={playing}
      >
        <Name className="name">player 1</Name>
        <Score score={scoreP1} />
        <CurrScoreBox>
          <CurrLabel />
          <CurrScore
            isActive={isActive}
            currScore={currScoreP1}
          />
        </CurrScoreBox>
      </Player>
      <Player
        num={1}
        isActive={isActive}
        playing={playing}
      >
        <Name className="name">player 2</Name>
        <Score score={scoreP2} />
        <CurrScoreBox>
          <CurrLabel />
          <CurrScore
            isActive={isActive}
            currScore={currScoreP2}
          />
        </CurrScoreBox>
      </Player>
      <DiceImage
        src={`./src/assets/dice-${diceNum}.png`}
        className={diceNum === null ? 'hidden' : 'dice'}
      />
      <Button
        className="btn btn--new"
        onClick={handleNewGame}
      >
        🔄 New game
      </Button>

      <Button
        className="btn btn--roll"
        onClick={handleRoll}
        playing={playing}
      >
        🎲 Roll dice
      </Button>

      <Button
        className="btn btn--hold"
        onClick={handleHold}
        playing={playing}
      >
        📥 Hold
      </Button>
    </div>
  );
}

// Reusable components
function Button({ className, onClick, children, playing, disabled = 'false' }) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={playing === false}
    >
      {children}
    </button>
  );
}

// note: don't pass down props if they can be resolved in the component
function Player({ num, isActive, playing, children }) {
  return (
    <section
      num={num}
      className={isActive === num ? 'player player--active' : 'player'} // todo: fix logic to add 'player--winner' when game ends
    >
      {children}
    </section>
  );
}

function Name({ children }) {
  return <h2 className="name">{children}</h2>;
}

function Score({ score }) {
  return <p className="score">{score}</p>;
}

function CurrScoreBox({ children }) {
  return <div className="current">{children}</div>;
}

// Compositions
function CurrLabel() {
  return <p className="current-label">Current</p>;
}

function CurrScore({ currScore }) {
  return <p className="current-score">{currScore}</p>;
}

// Dice Image
function DiceImage({ src, className }) {
  return (
    <img
      src={src}
      alt="playing dice"
      className={className}
    />
  );
}
