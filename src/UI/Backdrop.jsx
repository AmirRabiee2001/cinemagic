import styled from "styled-components";
import ReactDOM from "react-dom";

const BackDrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: var(--backdrop-color);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Backdrop = ({ children }) => {
  const target = document.getElementById("overlay");

  return target ? ReactDOM.createPortal(<BackDrop>{children}</BackDrop>, target) : null;
};
export default Backdrop;
