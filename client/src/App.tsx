import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { createContext, useEffect, useMemo, useState } from "react";
import SignUp from "./Pages/Signup";
import SignIn from "./Pages/Signin";
import AuthContext from "./context/AuthContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

function getInitialAuthState(refreshToken: string | null) {
  return refreshToken ? true : false;
}

function App() {
  const [refreshToken] = useLocalStorage("refreshToken", null);
  const [authenticated, setAuthenticated] = useState(
    getInitialAuthState(refreshToken) || false
  );

  const AuthState = useMemo(
    () => ({
      authenticated,
      setAuthenticated,
    }),
    [authenticated, setAuthenticated]
  );

  return (
    <AuthContext.Provider value={AuthState}>
      <div className="container w-screen h-screen mx-auto p-4 flex flex-col justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
