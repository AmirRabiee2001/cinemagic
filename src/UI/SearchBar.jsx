import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCallback, useRef } from "react";

const SearchBarContainer = styled.div`
  color: var(--color-input-text);
  display: flex;
  flex: 1;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.3rem;
  }
  label {
    cursor: pointer;
    &:hover {
      color: var(--color-primary);
      filter: brightness(0.8);
    }
  }
`;

const StyledSearchBar = styled.input`
  width: 1rem;
  border: none;
  background-color: var(--color-input-background);
  border-radius: 5px;
  padding: 2rem;
  color: var(--color-text);
  height: 3rem;
  transition: all 0.3s ease-in-out;
  max-width: 40rem;
  &:focus {
    width: 100%;
    padding: 2rem 4rem;
  }
`;

const SearchBar = ({ placeholder = "جستجو کنید... ", setSearchQuery }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null); // Ref to store the timeout

  // Throttled search functionality
  const handleSearchQuery = useCallback(
    (e) => {
      const value = e.target.value;

      // Clear the existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        setSearchQuery(value); // Call the function after some
      }, 500);
    },
    [setSearchQuery]
  );

  return (
    <SearchBarContainer onFocus={() => navigate("/search")}>
      <label htmlFor="search">
        <IoSearch />
      </label>
      <StyledSearchBar id="search" type="text" placeholder={placeholder} onChange={handleSearchQuery} />
    </SearchBarContainer>
  );
};
export default SearchBar;
