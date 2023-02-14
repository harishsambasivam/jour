import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { createContext, useEffect, useMemo, useState } from "react";
import SignUp from "./Pages/Signup";
import SignIn from "./Pages/Signin";
import AuthContext from "./context/AuthContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import BottomNav from "./components/BottomNav/BottomNav";
import FullLayout from "./components/FullLayout/FullLayout";
import Settings from "./Pages/Setting";

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
      <Routes>
        <Route element={<FullLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route element={<BottomNav />}>
          <Route path="/" element={<Home />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
