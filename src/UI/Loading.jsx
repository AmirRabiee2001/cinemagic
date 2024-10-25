import styled from "styled-components";
import Backdrop from "./Backdrop";

export const Loader = styled.div`
  width: 8px;
  height: 40px;
  border-radius: 4px;
  display: block;
  margin: 20px auto;
  position: relative;
  background: currentColor;
  color: var(--color-text);
  box-sizing: border-box;
  animation: animloader 0.3s 0.3s linear infinite alternate;

  &::after,
  &::before {
    content: "";
    width: 8px;
    height: 40px;
    border-radius: 4px;
    background: currentColor;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    box-sizing: border-box;
    animation: animloader 0.3s 0.45s linear infinite alternate;
  }
  &::before {
    left: -20px;
    animation-delay: 0s;
  }

  @keyframes animloader {
    0% {
      height: 48px;
    }
    100% {
      height: 4px;
    }
  }
`;

const Loading = () => {
  return (
    <Backdrop>
      <Loader />
    </Backdrop>
  );
};
export default Loading;
