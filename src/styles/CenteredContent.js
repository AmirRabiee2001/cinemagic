import styled from "styled-components";

const CenteredContent = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: center;
  top: 50%;
  color: var(--color-text);
  right: 50%;
  transform: translate(50%, -50%);
  width: 100%;
`;

export default CenteredContent;
