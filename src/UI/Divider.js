import styled from "styled-components";

const Separator = styled.div`
  width: ${(props) => (props.width ? props.width : "80%")};
  height: 1px;
  background-color: var(--color-text-2);
  margin: 1rem auto;
`;

export default Separator;
