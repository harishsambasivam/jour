import { createContext } from "react";

const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: (auth: boolean) => {},
});

export default AuthContext;
