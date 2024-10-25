import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => (props.type === "1" ? "var(--color-primary)" : "transparent")};
  color: ${(props) => (props.type === "1" ? "#fff" : "var(--color-text)")};
  border: ${(props) => (props.type === "1" ? "none" : "1px solid var(--color-text)")};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export default Button;
