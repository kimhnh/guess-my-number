import { useState } from 'react';
import './index.css';

export default function App() {
  let dice; // derived state of currScore
  const [currScore, setCurrScore] = useState(0);
  const [isActive, setIsActive] = useState(0); // using num prop to indicate active player

  // 1. click 'roll dice' >> generate randNum 1~6
  // 2. if player rolls !1, update currScore to dice
  // 3. if player rolls 1, currScore = 0 and switch player (need a state and update it)

  // todo: currScore text should only update on 'active player'
  function handleRoll() {
    dice = Math.floor(Math.random() * 6 + 1); // 1~6
    // check if roll = 1
    if (dice !== 1) {
      setCurrScore((c) => c + dice);
      console.log(dice);
      // wipe current score to 0
    } else {
      setCurrScore(0);
      setIsActive((a) => (isActive === 0 ? 1 : 0));
    }
  }

  return (
    <div className="app">
      <Player
        num={0}
        isActive={isActive}
      >
        <Name className="name">player 1</Name>
        <Score>20</Score>
        <CurrScoreBox>
          <CurrLabel />
          <CurrScore currScore={currScore} />
        </CurrScoreBox>
      </Player>
      <Player
        num={1}
        isActive={isActive}
      >
        <Name className="name">player 2</Name>
        <Score>5</Score>
        <CurrScoreBox>
          <CurrLabel />
          <CurrScore currScore={currScore} />
        </CurrScoreBox>
      </Player>
      <DiceImage />
      <Button className="btn btn--new">🔄 New game</Button>
      <Button
        className="btn btn--roll"
        onClick={handleRoll}
      >
        🎲 Roll dice
      </Button>
      <Button className="btn btn--hold">📥 Hold</Button>
    </div>
  );
}

// Reusable components
function Button({ className, onClick, children }) {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// note: don't pass down props if they can be resolved in the component
function Player({ num, isActive, children }) {
  return (
    <section
      num={num}
      className={isActive === num ? 'player player--active' : 'player'}
    >
      {children}
    </section>
  );
}

function Name({ children }) {
  return <h2 className="name">{children}</h2>;
}

function Score({ children }) {
  return <p className="score">{children}</p>;
}

function CurrScoreBox({ children }) {
  return <div className="current">{children}</div>;
}

// Compositions
function CurrLabel() {
  return <p className="current-label">Current</p>;
}

function CurrScore({ currScore }) {
  return <p className="current-score">{currScore ? currScore : 0}</p>;
}

// dice img: placeholder
function DiceImage() {
  return (
    <img
      src="./src/assets/dice-1.png"
      alt="playing dice"
      className="dice"
    />
  );
}
