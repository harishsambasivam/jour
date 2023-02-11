import { useContext } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router";

const Home = () => {
  const user = useContext(UserContext);
  return <div>{user ? "Home" : <Navigate to="/signin" replace />}</div>;
};

export default Home;
