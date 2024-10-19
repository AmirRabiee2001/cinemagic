import styled from "styled-components";
import MovieCard from "./MovieCard"; // Assuming MovieCard is the component you designed
import { Divider } from "../styles/Divider";

const HorizontalScrollContainer = styled.div`
  width: 100%;
  padding: 2rem 0rem;
  background-color: var(--color-header);
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
    display: none;
  }
`;

const HorizontalScroll = ({ movies, label }) => {
  return (
    <HorizontalScrollContainer>
      <Label>{label}</Label>
      <Divider width={"100%"} />
      <MovieList>
        {movies.map((movie) => {
          if (movie.message) return;
          return <MovieCard key={movie.id} id={movie.id} title={movie.title} year={movie.year} image={movie.image} />;
        })}
      </MovieList>
    </HorizontalScrollContainer>
  );
};

export default HorizontalScroll;
