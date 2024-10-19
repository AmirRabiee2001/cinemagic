import styled, { keyframes } from "styled-components";

// Keyframes for the animation
const pulse = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 0.4; }
  100% { opacity: 0.2; }
`;

// Styled component for the placeholder card
export const PlaceholderCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-text-2);
  animation: ${pulse} 1.5s infinite ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Wrapper for the image and its container
export const ImageWrapper = styled.div`
  position: relative;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "")};
  overflow: hidden;
  width: ${(props) => (props.width ? props.width : "100%")};
  cursor: pointer;
  height: ${(props) => (props.height ? props.height : "100%")};
  img {
    opacity: ${(props) => (props.isLoaded ? 1 : 0)};
    transition: all 0.3s ease-in-out;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
