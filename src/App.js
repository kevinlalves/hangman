import "./App.css";
import words from "./palavras";
import alphabet from "./alfabeto";
import Game from "./componentes/Jogo";
import Letters from "./componentes/Letras";
import Guess from "./componentes/Chute";
import styled from "styled-components";
import { useState } from "react";

const initialEnabled = populateEnabled();
const maxMistakesAllowed = 6;

export default function App() {
  const state = Object.freeze({
    ongoing: "ongoing",
    finished: "finished",
    uninitialized: "uninitialized"
  });
  const [chosenWord, setChosenWord] = useState("");
  const [mistakeNum, setMistakeNum] = useState(0);
  const [enabled, setEnabled] = useState(initialEnabled);
  const [gameState, setGameState] = useState(state.uninitialized);
  const [secretWord, setSecretWord] = useState([]);
  const [guess, setGuess] = useState("");
  const [secretWordColor, setSecretWordColor] = useState("black");
  const [rightGuessesCount, setRightGuessesCount] = useState(0);


  ///////////// private ////////////////////////////////////////////////////////////////////////
  const chooseWord = () => {
    const newChosenWord = words.getRandom();
    setChosenWord(newChosenWord);
    const underlineWord = Array(newChosenWord.length).fill("_");
    setSecretWord(underlineWord);
  };

  const updateGameState = (matchPosition, letter) => {
    if (matchPosition.length) {
      const newRightGuessesCount = rightGuessesCount + matchPosition.length;
      if (newRightGuessesCount === chosenWord.length) {
        checkGuess(chosenWord);
      }
      const newSecretWord = [...secretWord];
      for (const pos of matchPosition) {
        newSecretWord[pos] = letter;
      }
      setSecretWord(newSecretWord);
    } else {
      const newMistakeNum = mistakeNum + 1;
      setMistakeNum(newMistakeNum);
      if (newMistakeNum === maxMistakesAllowed) {
        checkGuess("");
      }
    }
  };

  const disable = letter => {
    const newEnabled = { ...enabled };
    newEnabled[letter] = false;
    setEnabled(newEnabled);
  };

  const resetSettings = () => {
    setGuess("");
    setMistakeNum(0);
    setEnabled(populateEnabled());
    setSecretWordColor("black");
  };
  //////////////////////////////////////////////////////////////////////////////////////////////

  const startGame = () => {
    if (gameState != state.uninitialized) {
      resetSettings();
    }
    chooseWord();
    setGameState(state.ongoing);
  };

  const guessWord = letter => {
    const matchPosition = [];
    for (let i = 0; i < chosenWord.length; i++) {
      if (letter === chosenWord[i]) {
        matchPosition.push(i);
      }
    }
    updateGameState(matchPosition, letter);
    disable(letter);
  };

  const checkGuess = guess => {
    if (gameState !== state.ongoing) {
      return;
    }
    if (guess === chosenWord) {
      setSecretWordColor("green");
    } else {
      setSecretWordColor("red");
      setMistakeNum(maxMistakesAllowed);
    }
    setGuess("");
    setSecretWord(chosenWord);
    setGameState(state.finished);
  };

  const guessWithEnter = key => {
    if (key === "Enter") {
      checkGuess(guess);
    }
  }

  return (
    <AppContent>
      <Game
        onClick={startGame}
        secretWord={secretWord}
        gameState={gameState}
        state={state}
        mistakeNum={mistakeNum}
        secretWordColor={secretWordColor} />
      <Letters enabled={enabled} state={state} gameState={gameState} onClick={guessWord} />
      <Guess
        guess={guess}
        gameState={gameState}
        state={state}
        onChange={g => setGuess(g)}
        onClick={() => checkGuess(guess)}
        onKeyDown={guessWithEnter} />
    </AppContent>
  );
}

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1025px;
  height: 839px;
  margin-left: auto;
  margin-right: auto;
`

function populateEnabled() {
  const enabled = {};
  for (const letter of alphabet) {
    enabled[letter] = true;
  }
  return enabled;
}

function getRandom() {
  let randomNumber = Math.random();
  while (randomNumber === 1) {
    randomNumber = Math.random();
  }
  return this[Math.floor(randomNumber * this.length)];
}

Object.defineProperty(Array.prototype, 'getRandom', {
  value: getRandom
});
