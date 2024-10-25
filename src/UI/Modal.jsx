import Backdrop from "./Backdrop";
import styled from "styled-components";
import { IoCloseCircleOutline } from "react-icons/io5";

const ModalContainer = styled.div`
  background-color: var(--color-background);
  border-radius: 1rem;
  min-height: 20rem;
  min-width: 30rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 2rem;
  .close {
    font-size: 3rem;
    cursor: pointer;
    &:hover {
      color: var(--color-primary);
    }
  }
`;

const Modal = ({ children, onClose }) => {
  return (
    <Backdrop>
      <ModalContainer>
        <IoCloseCircleOutline className="close" onClick={onClose} />
        {children}
      </ModalContainer>
    </Backdrop>
  );
};
export default Modal;
