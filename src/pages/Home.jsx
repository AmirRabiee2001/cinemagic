import { useQuery } from "@tanstack/react-query";
import SlideShow from "../features/SlideShow";
import HorizontalScroll from "../UI/HorizontalCards";
import { getTopMovies } from "../services/apiMovie";
import CategoryCard from "../UI/CategoryCard";
import styled from "styled-components";
import toast from "react-hot-toast";

const Categories = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  max-width: 90vw;
  margin: 3rem auto;
`;

const Home = () => {
  const { data, error } = useQuery(["topMovies"], getTopMovies);

  if (error) {
    toast.error(error.message);
  }
  return (
    <>
      <SlideShow />
      <Categories>
        <CategoryCard category={"اکشن"} goTo={"/discover+action"} />
        <CategoryCard category={"علمی تخیلی"} goTo={"/discover+action"} />
        <CategoryCard category={"جنایی"} goTo={"/discover+action"} />
        <CategoryCard category={"جنایی"} goTo={"/discover+action"} />
        <CategoryCard category={"جنایی"} goTo={"/discover+action"} />
      </Categories>
      {data && <HorizontalScroll movies={data} label={"فیلم های برتر"} />}
    </>
  );
};

export default Home;
