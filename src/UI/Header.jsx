import styled from "styled-components";
import SearchBar from "./SearchBar";
import { IoMoon, IoLogIn, IoSunny, IoLogOut } from "react-icons/io5";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import useLogout from "../hooks/useLogout";
import Loading from "./Loading";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 7rem;
  background-color: var(--color-header);
  box-shadow: var(--shadow-md);
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 768px) {
    justify-content: right;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  font-size: 2.5rem;
  justify-content: center;
  align-items: center;
  min-height: 4rem;
  min-width: 4rem;
  transition: all 0.2s ease;
  cursor: pointer;
  span {
    font-size: 1.2rem;
    margin-left: 1rem;
    display: none;
    @media (min-width: 768px) {
      display: inline-block;
    }
  }
  &:hover {
    filter: brightness(0.8);
    color: var(--color-primary);
  }
`;

const Header = ({ setSearchQuery }) => {
  const { isLoggedIn } = useUser();
  const [theme, setTheme] = useDarkMode();
  const { logout, isLoading } = useLogout();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyledHeader>
      <SearchBar setSearchQuery={setSearchQuery} />
      {isLoggedIn ? (
        <IconWrapper onClick={logout}>
          <span>خروج</span>
          <IoLogOut />
        </IconWrapper>
      ) : (
        <Link to="/login">
          <IconWrapper>
            <span>ورود به حساب</span>
            <IoLogIn />
          </IconWrapper>
        </Link>
      )}
      <IconWrapper onClick={setTheme}>{theme === "light" ? <IoMoon /> : <IoSunny />}</IconWrapper>
    </StyledHeader>
  );
};
export default Header;
