import { useState } from 'react';
import './index.css';

const initialData = [
  {
    num: 1,
    finalScore: 0,
    currScore: 0,
    isActive: true,
    hasWon: false,
  },
  {
    num: 2,
    finalScore: 0,
    currScore: 0,
    isActive: false,
    hasWon: false,
  },
];

export default function App() {
  const [gameData, setGameData] = useState(initialData);
  const [diceIcon, setDiceIcon] = useState(null); // dice icon
  const [winStatus, setWinStatus] = useState(false);
  let currScore = gameData.find((g) => g.isActive).currScore; // breaks when isActive is set to false
  let finalScore = gameData.find((g) => g.isActive).finalScore;
  let hasWon = gameData.find((g) => g.isActive).hasWon;

  // Update current score (active player ONLY)
  function handleUpdateCurrScore(current) {
    setGameData((g) => g.map((i) => (i.isActive ? { ...i, currScore: current } : i)));
  }

  // Update final score (active player ONLY)
  function handleUpdateFinalScore(final) {
    setGameData((g) => g.map((i) => (i.isActive ? { ...i, finalScore: final } : i)));
  }

  // Switch player
  function handleSwitchPlayer() {
    setGameData((g) => g.map((i) => ({ ...i, isActive: !i.isActive })));
  }

  function handleRoll() {
    // 1. Generate a number between 1~6
    const dice = Math.floor(Math.random() * 6 + 1);
    setDiceIcon(dice); // set "dice icon" to dice number

    if (dice !== 1) {
      currScore += dice;
      handleUpdateCurrScore(currScore);
    } else {
      handleUpdateCurrScore(0);
      handleSwitchPlayer();
    }
  }

  function handleHold() {
    finalScore += currScore;
    handleUpdateFinalScore(finalScore); // must be outside if-else statement to prevent handleSwitchPlayer from getting invoked in the else block

    if (finalScore < 10) {
      handleUpdateCurrScore(0);
      handleSwitchPlayer();
    } else {
      console.log('you win');
      setWinStatus(true);
      setDiceIcon(null);
      hasWon = true;
      setGameData((g) => g.map((i) => (i.isActive ? { ...i, hasWon: hasWon } : i)));
    }
  }

  function handleNewGame() {
    // reset gameData to default values
    setGameData((g) =>
      g.map((i) => ({
        ...i,
        finalScore: 0,
        currScore: 0,
        isActive: i.num === 1 ? true : false,
        hasWon: false,
      }))
    );
    setWinStatus(false);
  }

  return (
    <div className="app">
      {gameData.map((i) => (
        <Player
          key={crypto.randomUUID()}
          isActive={i.isActive}
          hasWon={i.hasWon}
        >
          <Name num={i.num} />
          <Score score={i.finalScore} />
          <CurrScoreWrapper>
            <CurrLabel />
            <CurrScore currScore={i.currScore} />
          </CurrScoreWrapper>
        </Player>
      ))}

      <DiceImage
        src={diceIcon}
        className={diceIcon === null ? 'hidden' : 'dice'}
      />

      {/* Buttons */}
      <Button
        className="btn btn--new"
        onClick={handleNewGame}
      >
        🔄 New game
      </Button>
      <Button
        className="btn btn--roll"
        onClick={handleRoll}
        disabled={winStatus}
      >
        🎲 Roll dice
      </Button>
      <Button
        className="btn btn--hold"
        onClick={handleHold}
        disabled={winStatus}
      >
        📥 Hold
      </Button>
    </div>
  );
}

// Reusuable components
function Button({ className, onClick, disabled, children }) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Player({ isActive, hasWon, children }) {
  const active = isActive ? 'player--active player' : 'player';
  const hasPlayerWon = hasWon ? 'player--winner player' : 'player';
  return <section className={`${active} ${hasPlayerWon}`}>{children}</section>;
}

function Name({ num }) {
  return <h2 className="name">Player {num}</h2>;
}

function Score({ score }) {
  return <p className="score">{score}</p>;
}

function CurrScoreWrapper({ children }) {
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
      src={`./src/assets/dice-${src}.png`}
      alt="playing dice"
      className={className}
    />
  );
}
