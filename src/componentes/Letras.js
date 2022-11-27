import styled from "styled-components";
import alphabet from "../alfabeto";
import Button from "../style/Button";

export default function Letters(props) {
  const { enabled, gameState, state, onClick } = props;

  const clickEnabled = letter => {
    return enabled[letter] && (gameState === state.ongoing);
  };

  return (
    <LetterContent>
      {alphabet.map(
        letter => <LetterButton
          key={letter}
          enabled={clickEnabled(letter)}
          onClick={clickEnabled(letter) ? () => onClick(letter) : undefined}
          data-test="letter"
        >
          {letter.toUpperCase()}
        </LetterButton>
      )}
    </LetterContent>
  );
}

const LetterContent = styled.div`
  width: 676px;
  height: 91px;
  display: flex;
  flex-wrap: wrap;
`;

const LetterButton = styled(Button)`
  height: 40px;
  width: 40px;
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 11px;
`;
