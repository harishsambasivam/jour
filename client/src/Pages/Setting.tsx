import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router";

const Settings = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const [, , removeAccessToken] = useLocalStorage("accessToken", "");
  const [, , removeRefreshToken] = useLocalStorage("refreshToken", "");
  const handleClick = () => {
    setAuthenticated(false);
    removeRefreshToken();
    removeAccessToken();
    navigate("/");
  };
  return <button onClick={handleClick}>logout</button>;
};

export default Settings;
