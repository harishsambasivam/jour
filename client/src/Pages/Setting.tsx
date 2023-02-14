import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Settings = () => {
  const { setAuthenticated } = useContext(AuthContext);

  const handleClick = () => {
    setAuthenticated(false);
  };
  return <button onClick={handleClick}>logout</button>;
};

export default Settings;
