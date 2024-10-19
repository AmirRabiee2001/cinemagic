import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { searchTitle } from "../services/apiMovie";
import { Loader } from "../UI/Loading";
import HorizontalScroll from "../UI/HorizontalCards";

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
`;

const ResultNumber = styled.p`
  font-size: 1.5rem;
  margin: 2rem auto;
  text-align: center;
`;

const Search = ({ searchQuery }) => {
  const { data, isLoading, error } = useQuery(["searchResults", searchQuery], () => searchTitle(searchQuery), {
    staleTime: 0,
  });

  const movies = data?.results.filter((title) => title.type === "movie");
  const series = data?.results.filter((title) => title.type === "tvSeries");

  if (isLoading) {
    return (
      <CenteredContent>
        <Loader />
      </CenteredContent>
    );
  }

  if (data.query !== null) {
    return (
      <>
        {data.results.length > 0 ? (
          <ResultNumber>{data.results.length} نتیجه یافت شد</ResultNumber>
        ) : (
          <CenteredContent>نتیجه ای یافت نشد</CenteredContent>
        )}

        {movies?.length > 0 && <HorizontalScroll movies={movies} label={"فیلم"} />}

        {series?.length > 0 && <HorizontalScroll movies={series} label={"سریال"} />}
      </>
    );
  }
  if (data.query === null) {
    return <CenteredContent>نام فیلم یا سریال را جستجو کنید</CenteredContent>;
  }

  if (error) {
    return <CenteredContent>{error.message}</CenteredContent>;
  }
  return;
};
export default Search;
