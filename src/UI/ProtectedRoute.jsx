import { useEffect } from "react";
import useUser from "../hooks/useUser";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // load auth
  const { isLoggedIn, isLoading } = useUser();

  //no auth => login
  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      toast.error("ابتدا وارد شوید");
      navigate("/login");
    }
  }, [isLoading, isLoggedIn, navigate]);

  // show spinner
  if (isLoading) return <Loading />;

  //auth => show route
  if (isLoggedIn) return children;
};
export default ProtectedRoute;
