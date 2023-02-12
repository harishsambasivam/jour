import { useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { authenticated } = useContext(AuthContext);
  return (
    <div>{authenticated ? "Home" : <Navigate to="/signin" replace />}</div>
  );
};

export default Home;
