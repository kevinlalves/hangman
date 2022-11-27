import GlobalStyle from "./style/GlobalSyle";
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

  const updateGameState = matchPosition => {
    if (matchPosition.length) {
      const newRightGuessesCount = rightGuessesCount + matchPosition.length;
      if (newRightGuessesCount === chosenWord.length) {
        checkGuess(chosenWord);
        return ;
      }
      setRightGuessesCount(newRightGuessesCount);
      const newSecretWord = [...secretWord];
      for (const pos of matchPosition) {
        newSecretWord[pos] = chosenWord[pos];
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
    setRightGuessesCount(0);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////

  const startGame = () => {
    if (gameState !== state.uninitialized) {
      resetSettings();
    }
    chooseWord();
    setGameState(state.ongoing);
  };

  const guessLetter = letter => {
    const matchPosition = [];
    const normalizedWord = chosenWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    for (let i = 0; i < normalizedWord.length; i++) {
      if (letter === normalizedWord[i]) {
        matchPosition.push(i);
      }
    }
    updateGameState(matchPosition);
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
  };

  return (
    <AppContent>
      <GlobalStyle />
      <Game
        onClick={startGame}
        secretWord={secretWord}
        chosenWord={chosenWord}
        gameState={gameState}
        state={state}
        mistakeNum={mistakeNum}
        secretWordColor={secretWordColor} />
      <Letters enabled={enabled} state={state} gameState={gameState} onClick={guessLetter} />
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
`;

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
