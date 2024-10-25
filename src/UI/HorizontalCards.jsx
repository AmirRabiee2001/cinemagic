import styled from "styled-components";
import MovieCard from "./MovieCard"; // Assuming MovieCard is the component you designed
import { Divider } from "../styles/Divider";

const HorizontalScrollContainer = styled.div`
  width: 100%;
  padding: 2rem 0rem;
`;

const Label = styled.h3`
  margin-right: 2rem;
`;

const MovieList = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
  padding: 2rem 2rem;
  width: 100%;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    background-color: var(--color-background-3);
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-primary);
    border-radius: 1rem;
    cursor: pointer;
  }
`;

const HorizontalCards = ({ movies, label }) => {
  return (
    <HorizontalScrollContainer>
      <Label>{label}</Label>
      <Divider width={"100%"} />
      <MovieList>
        {movies.map((movie) => {
          return <MovieCard key={movie.id} id={movie.id} title={movie.title} year={movie.year} image={movie.image} />;
        })}
      </MovieList>
    </HorizontalScrollContainer>
  );
};

export default HorizontalCards;
