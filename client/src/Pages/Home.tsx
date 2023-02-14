import { useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "../context/AuthContext";
import BottomNav from "../components/BottomNav/BottomNav";

const Home = () => {
  const { authenticated } = useContext(AuthContext);
  console.log(authenticated);
  return (
    <div>{authenticated ? "Home" : <Navigate to="/signin" replace />}</div>
  );
};

export default Home;
