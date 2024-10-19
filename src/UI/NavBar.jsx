import styled from "styled-components";
import { IoHome, IoSettingsSharp, IoBookmarksSharp, IoCompassSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const StyledNavBar = styled.nav`
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: 8rem;
  bottom: 0;
  background-color: var(--color-navbar);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 2rem;

  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 2rem;

    @media (min-width: 768px) {
      gap: 1rem;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;
      width: 20%;
      border-radius: 2rem;
      transition: all 0.4s ease;
      color: var(--color-text-2);
      padding: 1.5rem 0;

      &.active {
        background-color: var(--color-primary);
        color: #fff;
        flex: 1;
        span {
          display: inline-block !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
      }

      span {
        font-size: 1.3rem;
        margin-right: 1rem;
        display: none;
      }

      &:hover {
        background-color: var(--color-primary);
        color: #fff;
      }
      svg {
        font-size: 2.4rem;
      }
    }
  }

  @media (min-width: 768px) {
    max-width: 60rem;
    right: 50%;
    transform: translateX(50%);
    bottom: 1rem;
  }
`;

const NavBar = () => {
  return (
    <StyledNavBar>
      <ul>
        <NavLink to="/">
          <IoHome />
          <span>خانه</span>
        </NavLink>
        <NavLink to="/discover">
          <IoCompassSharp />
          <span>دسته بندی</span>
        </NavLink>
        <NavLink to="/bookmarks">
          <IoBookmarksSharp />
          <span>نشان شده</span>
        </NavLink>
        <NavLink to="/settings">
          <IoSettingsSharp />
          <span>تنظیمات</span>
        </NavLink>
      </ul>
    </StyledNavBar>
  );
};

export default NavBar;
