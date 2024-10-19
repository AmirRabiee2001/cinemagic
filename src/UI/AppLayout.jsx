import { Outlet } from "react-router-dom";
import styled from "styled-components";

import NavBar from "./NavBar";
import Header from "../UI/Header";

const Main = styled.main`
  padding-bottom: 17rem;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const AppLayout = ({ setSearchQuery }) => {
  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <NavBar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};
export default AppLayout;
