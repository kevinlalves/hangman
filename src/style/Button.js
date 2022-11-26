import styled from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: 3px;
  background-color: ${props => props.enabled ? "#E1ECF4" : "#9FAAB5"};
  border: 1px solid #7AA7C7;
  cursor: ${props => (props.enabled) ? "pointer" : "not-allowed"};
  font-weight: 700;
  font-size: 16px;
  color: ${props => (props.enabled) ? "#39739D" : "#798A9F"};
`;

export default Button;
