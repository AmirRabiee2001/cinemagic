import styled from "styled-components";
import useImageLoader from "../hooks/useImageLoader";
import { ImageWrapper, PlaceholderCard } from "../styles/ImageWrapper";
import { Link } from "react-router-dom";

const StyledMovieCard = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow-md);
  border-radius: 1rem;
  width: 14rem;
  height: 22rem;
  /* position: relative; */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  @media (min-width: 768px) {
    width: 20rem;
    height: 30rem;
  }
`;

const StyledMovieInfo = styled.div`
  margin: 0.5rem 0;
  text-align: center;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0.5rem 0;
  }

  p {
    font-size: 0.85rem;
    color: var(--color-text-2);
    margin: 0;
  }

  @media (min-width: 768px) {
    h3 {
      font-size: 1.4rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const MovieCard = ({ id, title, year, image }) => {
  const { imageLoading, handleImageLoad } = useImageLoader();

  return (
    <Link to={`/title/${id}`}>
      <StyledMovieCard>
        <ImageWrapper height={"80%"} isLoaded={imageLoading[id]}>
          {!imageLoading[id] && <PlaceholderCard />}
          <img src={image} alt={title} onLoad={() => handleImageLoad(id)} />
        </ImageWrapper>
        <StyledMovieInfo>
          <h3>{title}</h3>
          <p>{year}</p>
        </StyledMovieInfo>
      </StyledMovieCard>
    </Link>
  );
};

export default MovieCard;
