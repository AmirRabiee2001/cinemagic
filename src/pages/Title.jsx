import { getMovieRecommendations, getTitle } from "../services/apiMovie";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../UI/Loading";
import toast from "react-hot-toast";
import { IoChevronBack, IoSearch, IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import HorizontalScroll from "../UI/HorizontalCards";
import CircleScore from "../UI/CircleScore";
import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import { getBookmarks } from "../services/apiBookmarks";
import useBookmarks from "../hooks/useBookmark";

// Styles
const TitlePage = styled.div`
  position: relative;
  color: var(--color-text);
`;

const PosterImage = styled.img`
  height: 60vh;
  width: 100vw;
  -webkit-mask-image: linear-gradient(#000, rgba(0, 0, 0, 0));
  mask-image: linear-gradient(#000, rgba(0, 0, 0, 0));
  object-fit: cover;
`;

const GoBackButton = styled.button`
  position: absolute;
  left: 2rem;
  top: 2rem;
  border-radius: 50%;
  display: flex;
  font-size: 2rem;
  z-index: 80;
  border: none;
  color: var(--color-text);
  padding: 2rem;
  background-color: var(--color-background-2);
  cursor: pointer;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  padding: 4rem 2rem;
  top: 10rem;
  width: 100%;

  img {
    width: 17rem;
    border-radius: 1rem;
    box-shadow: var(--shadow-lg);
    @media (min-width: 768px) {
      width: 20rem;
    }
  }

  @media (min-width: 768px) {
    padding: 3rem 5rem;
  }
`;

const TitleText = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const PlotText = styled.p`
  font-size: 1.2rem;
  margin: 2rem 0;
  text-align: center;
  direction: ltr;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DetailsSection = styled.div`
  margin-top: 2rem;
  font-size: 1.1rem;
  line-height: 1.5;
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;

  span {
    font-weight: bold;
  }

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TitleButton = styled.button`
  background-color: var(--color-header);
  border: 2px solid var(--color-text-2);
  border-radius: 1rem;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  @media (min-width: 768px) {
    padding: 2rem 4rem;
    font-size: 1.6rem;
  }
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  gap: 1rem;
`;

function extractTime(timeString) {
  const regex = /(\d+)h\s*(\d+)m/;
  const match = timeString.match(regex);

  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return { hours, minutes };
  } else {
    return null; // or handle the case where the format is not matched
  }
}

const Title = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Check if the movie is bookmarked
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { addBookmark, removeBookmark, isAdding, isRemoving } = useBookmarks();
  const { isLoggedIn, isLoading: isUserLoading } = useUser();

  // Get movie details
  const { data, isLoading, error } = useQuery(["titleInfo", id], () => getTitle(id));
  // Get bookmarks
  const { data: bookmarks } = useQuery(["bookmarks"], () => getBookmarks(), {
    enabled: isLoggedIn,
  });

  // Get recommended movies
  const {
    data: recommendedData,
    isLoading: recommendedLoading,
    error: recommendedError,
  } = useQuery(["recommendations", id], () => getMovieRecommendations(id));

  useEffect(() => {
    // Check if the current movie is bookmarked
    if (bookmarks && data) {
      setIsBookmarked(bookmarks.some((bookmark) => bookmark.imdb_id === id));
    }
  }, [bookmarks, data, id]);

  const handleBookmark = () => {
    if (!isLoggedIn && !isUserLoading) {
      toast.error("ابتدا وارد شوید");
      return;
    }
    if (isBookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
    setIsBookmarked(!isBookmarked);
  };

  const runtime = data && extractTime(data.runtime);

  if (isLoading || recommendedLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error.message);
  }
  if (recommendedError) {
    toast.error(recommendedError.message);
  }

  return (
    data && (
      <TitlePage>
        <GoBackButton onClick={() => navigate(-1)}>
          <IoChevronBack />
        </GoBackButton>
        <PosterImage src={data.images[1]} alt={data.title} />

        <ContentSection>
          <img src={data.image} alt="" />
          <TitleText>{data.title}</TitleText>
          <CircleScore score={data.rating.star} link={data.imdb} />
          <PlotText>{data.plot}</PlotText>
          <DetailsSection>
            <p>
              <span>مدت زمان: </span>
              <span>
                {runtime?.hours} ساعت و {runtime?.minutes} دقیقه
              </span>
            </p>
            -
            <p>
              <span>درجه بندی سنی:</span> {data.contentRating || "درجه بندی نشده"}
            </p>
          </DetailsSection>
          <ButtonSection>
            <TitleButton>
              جستجو لینک <IoSearch />
            </TitleButton>
            <TitleButton onClick={handleBookmark} disabled={isAdding || isRemoving}>
              {isBookmarked ? (
                <>
                  حذف از نشان‌ها <IoBookmark />
                </>
              ) : (
                <>
                  نشان کن <IoBookmarkOutline />
                </>
              )}
            </TitleButton>
          </ButtonSection>
          {recommendedData && <HorizontalScroll movies={recommendedData} label={"پیشنهادی"} />}
        </ContentSection>
      </TitlePage>
    )
  );
};

export default Title;
