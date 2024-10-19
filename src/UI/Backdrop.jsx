import styled from "styled-components";

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
  return <BackDrop>{children}</BackDrop>;
};
export default Backdrop;
