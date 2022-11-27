import "../App.css";
import forca0 from "../assets/forca0.png";
import forca1 from "../assets/forca1.png";
import forca2 from "../assets/forca2.png";
import forca3 from "../assets/forca3.png";
import forca4 from "../assets/forca4.png";
import forca5 from "../assets/forca5.png";
import forca6 from "../assets/forca6.png";
import styled from "styled-components";

const forcaPicture = { forca0, forca1, forca2, forca3, forca4, forca5, forca6 };


export default function Game(props) {
  const mistakeNum = props.mistakeNum;
  const gameState = props.gameState;
  const state = props.state;
  const onClick = props.onClick;
  const secretWordColor = props.secretWordColor;
  const chosenWord = props.chosenWord;

  const secretWord = () => {
    if (typeof (props.secretWord) === "object") {
      return props.secretWord.join(" ");
    } else {
      return props.secretWord;
    }
  };

  return (
    <GameContent secretWordColor={secretWordColor}>
      <img data-test="game-image" src={forcaPicture[`forca${mistakeNum}`]} alt="imagem de um boneco na forca" />
      <RightPanel>
        <Button data-test="choose-word" onClick={onClick} >
          Escolher Palavra
        </Button>
        {gameState !== state.uninitialized && <p data-test="word" data-answer={chosenWord} >{secretWord()}</p>}
      </RightPanel>
    </GameContent>
  );
}

const Button = styled.button`
  color: white;
  background-color: #27AE60;
  font-size: 20px;
  width: 200px;
  height: 60px;
  border-radius: 8px;
  margin-top: 30px;
  cursor: pointer;
`
const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-weight: 700;
  width: calc(100% - 400px);
  height: 100%;
  justify-content: space-between;
`

const GameContent = styled.div`
  display: flex;
  margin-top: 59px;
  height: 467px;
  margin-bottom: 71px;
  width: 934px;
  p {
    font-family: 'Noto Sans', sans-serif;
    font-size: 50px;
    margin-right: 8px;
    margin-bottom: 27px;
    color: ${props => props.secretWordColor}
  }
  img {
    width: 400px;
    height: 100%;
  }
`
