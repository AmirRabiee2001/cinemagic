import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getDiscover } from "../services/apiMovie";
import MovieCard from "../UI/MovieCard";
import { Loader } from "../UI/Loading";
import toast from "react-hot-toast";

// Styled components for layout
const OptionsContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Dropdown = styled.select`
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 2px solid #ccc;
  background-color: var(--color-background);
  color: var(--color-text);
  appearance: none; /* Hides the default dropdown arrow */
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    padding: 1rem 1rem 1rem 5rem;
    border: 3px solid #ccc;
  }
  /* Add a custom arrow icon for the dropdown */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%23999' d='M12 15l-7-7h14z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 1rem center;

  &:hover {
    border-color: var(--color-primary);
  }

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(226, 74, 74, 0.3);
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #aaa;
    cursor: not-allowed;
  }
`;

export const DiscoverResults = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  height: 100%;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const Discover = () => {
  // Component state for filters
  const [type, setType] = useState("movie"); // movie or series
  const [genre, setGenre] = useState("28"); // genre ID
  const [yearStart, setYearStart] = useState("2000"); // start year
  const [yearEnd, setYearEnd] = useState("2024"); // end year
  const [page, setPage] = useState("1"); // end year

  // React Query to fetch results
  const { data, isLoading, error } = useQuery(
    ["discover", type, genre, yearStart, yearEnd, page],
    () => getDiscover(type, genre, yearStart, yearEnd, page),
    {
      // enabled: !!genre && !!yearStart && !!yearEnd, // only fetch if filters are selected
    }
  );

  // Handle dropdown changes
  const handleTypeChange = (e) => setType(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleYearStartChange = (e) => setYearStart(e.target.value);
  const handleYearEndChange = (e) => setYearEnd(e.target.value);
  const handlePageChange = (e) => setPage(e.target.value);

  // Log the results to console
  if (data && !isLoading && !error) {
    console.log("Discover Results:", data);
  }

  return (
    <>
      <OptionsContainer>
        {/* Dropdown for Movie/Series */}
        <Dropdown value={type} onChange={handleTypeChange}>
          <option value="movie">فیلم</option>
          <option value="tv">سریال</option>
        </Dropdown>

        {/* Dropdown for Genres */}
        <Dropdown value={genre} onChange={handleGenreChange}>
          <option value="28">اکشن</option>
          <option value="35">کمدی</option>
          <option value="18">درام</option>
          <option value="878">علمی تخیلی</option>
          {/* Add more genres as needed */}
        </Dropdown>

        {/* Dropdown for Year Start */}
        <Dropdown value={yearStart} onChange={handleYearStartChange}>
          {Array.from({ length: 125 }, (_, i) => 2024 - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Dropdown>

        {/* Dropdown for Year End */}
        <Dropdown value={yearEnd} onChange={handleYearEndChange}>
          {Array.from({ length: 125 }, (_, i) => 2024 - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Dropdown>

        {/* Loading and Error States */}
        {/* {isLoading && <p>Loading...</p>} */}
        {error && toast.error(error.message)}
      </OptionsContainer>
      <DiscoverResults>
        {data &&
          data.map((title) => {
            if (title.message) return;
            return <MovieCard key={title.id} id={title.id} title={title.title} year={title.year} image={title.image} />;
          })}
        {isLoading && <Loader />}
      </DiscoverResults>
    </>
  );
};

export default Discover;
