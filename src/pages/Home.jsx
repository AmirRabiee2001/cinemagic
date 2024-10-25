import { useQuery } from "@tanstack/react-query";
import SlideShow from "../features/SlideShow";
import { getLists } from "../services/apiMovie";
import HorizontalCards from "../UI/HorizontalCards";
import Loading from "../UI/Loading";

const Home = () => {
  const { data: topMovies, isLoading: isLoadingTopMovies } = useQuery(["topMovies"], () =>
    getLists("movie", "1", "top_rated")
  );
  const { data: topSeries, isLoading: isLoadingTopSeries } = useQuery(["topSeries"], () =>
    getLists("tv", "1", "top_rated")
  );
  const { data: popularMovies, isLoadingPopularMovies } = useQuery(["popularMovies"], () =>
    getLists("movie", "1", "popular")
  );
  const { data: popularSeries, isLoadingPopularSeries } = useQuery(["popularSeries"], () =>
    getLists("tv", "1", "popular")
  );

  if (isLoadingPopularMovies || isLoadingTopMovies || isLoadingTopSeries || isLoadingPopularSeries) {
    return <Loading />;
  }
  return (
    <>
      <SlideShow data={popularMovies} />
      {topMovies && <HorizontalCards movies={topMovies} label={"فیلم های برتر"} />}
      {topSeries && <HorizontalCards movies={topSeries} label={"سریال های برتر"} />}
      {popularSeries && <HorizontalCards movies={popularSeries} label={"سریال های محبوب"} />}
    </>
  );
};

export default Home;
