import styled from "styled-components";
import CenteredContent from "../styles/CenteredContent";
import PageNotFoundSVG from "../assets/svg/undraw_page_not_found_re_e9o6.svg";
import { Link } from "react-router-dom";

const Illustration = styled.img`
  margin: 2rem auto;
  max-width: 30rem;
`;

const NotFound = () => {
  return (
    <CenteredContent>
      <Illustration src={PageNotFoundSVG} />
      <h2>صفحه ای پیدا نشد</h2>
      <Link to="/">بازگشت به صفحه اصلی</Link>
    </CenteredContent>
  );
};
export default NotFound;
