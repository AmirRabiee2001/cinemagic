import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { searchTitle } from "../services/apiMovie";
import { Loader } from "../UI/Loading";
import HorizontalCards from "../UI/HorizontalCards";
import CenteredContent from "../styles/CenteredContent";
import SearchSVG from "../assets/svg/undraw_search.svg";
import NotFoundSVG from "../assets/svg/undraw_not_found_re_bh2e.svg";

const ResultNumber = styled.p`
  font-size: 1.5rem;
  margin: 2rem auto;
  text-align: center;
`;

const Illustration = styled.img`
  margin: 2rem auto;
  max-width: 30rem;
`;

const Search = ({ searchQuery }) => {
  const { data, isLoading, error } = useQuery(["searchResults", searchQuery], () => searchTitle(searchQuery));

  const movies = data?.filter((title) => title.type === "movie");
  const series = data?.filter((title) => title.type === "tvSeries");

  if (isLoading) {
    return (
      <CenteredContent>
        <Loader />
      </CenteredContent>
    );
  }

  if (searchQuery === "") {
    return (
      <CenteredContent>
        <Illustration src={SearchSVG} alt="" />
        <p>نام فیلم یا سریال را جستجو کنید</p>
      </CenteredContent>
    );
  }

  if (error) {
    return <CenteredContent>{error.message}</CenteredContent>;
  }

  if (data?.length > 0) {
    return (
      <>
        <ResultNumber>{data.length} نتیجه یافت شد</ResultNumber>
        {movies?.length > 0 && <HorizontalCards movies={movies} label={"فیلم"} />}
        {series?.length > 0 && <HorizontalCards movies={series} label={"سریال"} />}
      </>
    );
  }

  return (
    <CenteredContent>
      <Illustration src={NotFoundSVG} />
      <p>نتیجه ای یافت نشد</p>
    </CenteredContent>
  );
};

export default Search;
