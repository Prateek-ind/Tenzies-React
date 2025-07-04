import { useEffect, useRef, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useRaf } from "react-use";

const Main = () => {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld
            ? die
            : {
                ...die,
                value: Math.floor(Math.random() * 6) + 1,
              }
        )
      );
    }
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => {
    return (
      <Die
        hold={hold}
        key={dieObj.id}
        value={dieObj.value}
        isHeld={dieObj.isHeld}
        id={dieObj.id}
      />
    );
  });

  return (
    <main className="game-container">
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations you won, press "New Game to start again"</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>
      <div className="die-container">{diceElements}</div>
      <button onClick={rollDice} ref={buttonRef} className="roll-dice-btn">
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default Main;
