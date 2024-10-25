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
import { getIMDBInfo, getRecommendations, getSeriesEpisodes } from "../services/apiMovie"; // Updated import
import { Divider } from "../styles/Divider";
import { Dropdown } from "./Discover";

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
  font-weight: bold;
  margin: 1rem 0;

  @media (min-width: 768px) {
    font-size: 3rem;
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

const CenterSection = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem auto;
  gap: 1rem;
  span {
    font-size: 1.2rem;
  }
`;

const CenterText = styled.div`
  font-size: 1.3rem;
  text-align: center;
  direction: ltr;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Cast = styled.div`
  width: 100%;
  gap: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const EpisodeList = styled.div`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const EpisodeItem = styled.div`
  display: flex;
  cursor: pointer;
  gap: 1rem;
  width: 100%;
  height: 10rem;
  border: 1px solid var(--color-background-3);
  border-radius: 0.5rem;
  padding: 1rem;
  direction: ltr;

  @media (min-width: 768px) {
    max-width: 600px;
  }
  &:hover {
    background-color: var(--color-background-3);
  }
  .image-container {
    overflow: hidden;
    width: 12rem;
    position: relative;

    &::before {
      content: "قسمت ${(props) => props.number}";
      position: absolute;
      bottom: 0;
      right: -2px;
      background-color: var(--color-background-2);
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  }

  .info {
    margin: 0 1rem;
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }

  .episode-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .episode-plot {
    font-size: 1.2rem;
    color: var(--color-text-2);
  }
`;

const FeatureText = styled.p`
  font-size: 1.3rem;
  background-color: #8989892b;
  text-align: center;
  padding: 0.5rem 2rem;
  border-radius: 2rem;
  &:hover {
    background-color: #8989896a;
  }
`;

const Title = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Check if the movie is bookmarked
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1); // Season selector state

  const { addBookmark, removeBookmark, isAdding, isRemoving } = useBookmarks();
  const { isLoggedIn, isLoading: isUserLoading } = useUser();

  // Get movie details
  const { data, isLoading, error } = useQuery(["titleInfo", id], () => getIMDBInfo(id));

  // Get series episodes based on selected season
  const {
    data: episodesData,
    isLoading: episodesLoading,
    error: episodesError,
  } = useQuery(["seriesEpisodes", id, selectedSeason], () => getSeriesEpisodes(id, selectedSeason), {
    enabled: !!data?.isSeries, // Only fetch episodes if it's a series
  });

  // Get bookmarks
  const { data: bookmarks } = useQuery(["bookmarks"], () => getBookmarks(), {
    enabled: isLoggedIn,
  });

  // Get recommended titles
  const {
    data: recommendedData,
    isLoading: recommendedLoading,
    error: recommendedError,
  } = useQuery(["recommendations", id], () => getRecommendations(id, data.isSeries ? "tv" : "movie"), {
    enabled: !!data,
  });

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

  if (isLoading || recommendedLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error.message);
  }
  if (recommendedError) {
    toast.error(recommendedError.message);
  }
  if (episodesError) {
    toast.error(episodesError.message);
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
          <CenterSection>
            <p>
              <span>مدت زمان: </span>
              <span>{data.runtime}</span>
            </p>
            -
            <p>
              <span>درجه بندی سنی: {data.contentRating || "درجه بندی نشده"}</span>
            </p>
          </CenterSection>
          <CenterText>{data.plot}</CenterText>
          <CenterSection>
            {data.genre.map((item) => (
              <FeatureText key={item}>{item}</FeatureText>
            ))}
          </CenterSection>
          <Divider width="80%" />

          {data.directors.length > 0 && (
            <CenterSection>
              <p>کارگردان</p>
              <Cast>
                {data.directors.map((item) => (
                  <FeatureText key={item}>{item}</FeatureText>
                ))}
              </Cast>
            </CenterSection>
          )}

          {data.actors.length > 0 && (
            <CenterSection>
              <p>بازیگران</p>
              <Cast>
                {data.actors.map((item) => (
                  <FeatureText key={item}>{item}</FeatureText>
                ))}
              </Cast>
            </CenterSection>
          )}

          {data.writers.length > 0 && (
            <CenterSection>
              <p>نویسندگان</p>
              <Cast>
                {data.writers.map((item) => (
                  <FeatureText key={item}>{item}</FeatureText>
                ))}
              </Cast>
            </CenterSection>
          )}
          <Divider width="80%" />
          <CenterSection>
            {!data.isSeries && (
              <TitleButton>
                جستجو لینک <IoSearch />
              </TitleButton>
            )}
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
          </CenterSection>

          {data.isSeries && (
            <>
              <Dropdown value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
                {data.all_seasons.map((season) => (
                  <option key={season.id} value={season.id}>
                    فصل {season.id}
                  </option>
                ))}
              </Dropdown>

              {episodesLoading && <Loading />}
              {episodesData && (
                <EpisodeList>
                  {episodesData.episodes.map((episode) => (
                    <EpisodeItem number={episode.no} key={episode.no}>
                      <div className="image-container">
                        <img src={episode.image} alt={episode.title} />
                      </div>
                      <div className="info">
                        <h2 className="episode-title">{episode.title}</h2>
                        <p className="episode-plot">{episode.plot}</p>
                      </div>
                    </EpisodeItem>
                  ))}
                </EpisodeList>
              )}
            </>
          )}

          {recommendedData && <HorizontalScroll movies={recommendedData} label={"پیشنهادی"} />}
        </ContentSection>
      </TitlePage>
    )
  );
};

export default Title;
