import styled from "styled-components";
import { Link } from "react-router-dom";

const CategoryCardStyled = styled(Link)`
  h2 {
    background-color: transparent;
    border: 2px solid var(--color-primary);
    color: var(--color-text);
    display: inline-block;
    font-size: 1.4rem;
    padding: 1rem 2rem;
    border-radius: 1rem;
    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const CategoryCard = ({ category, goTo }) => {
  return (
    <CategoryCardStyled to={`${goTo}`}>
      <h2>{category}</h2>
    </CategoryCardStyled>
  );
};
export default CategoryCard;
