import { getBookmarks } from "../services/apiBookmarks";
import { useQuery } from "@tanstack/react-query";
import useUser from "../hooks/useUser";
import { getBookmarkedTitles } from "../services/apiMovie";
import Loading from "../UI/Loading";
import MovieCard from "../UI/MovieCard";
import styled from "styled-components";

const Results = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  padding: 2rem;
  height: 100%;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const Bookmarks = () => {
  const { isLoggedIn } = useUser();
  const { data: bookmarks, isLoading: isBookmarksLoading } = useQuery(["bookmarks"], () => getBookmarks(), {
    enabled: isLoggedIn,
  });
  const { data: titles, isLoading: isTitlesLoading } = useQuery(["titles"], () => getBookmarkedTitles(bookmarks), {
    enabled: !!bookmarks,
  });

  if (isBookmarksLoading || isTitlesLoading) {
    return <Loading />;
  }
  return (
    <Results>
      {titles &&
        titles.map((title) => (
          <MovieCard id={title.id} title={title.title} key={title.id} image={title.image} year={title.year} />
        ))}
    </Results>
  );
};
export default Bookmarks;
