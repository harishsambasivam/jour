import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { createContext } from "react";
import SignUp from "./Pages/Signup";
import SignIn from "./Pages/Signin";

export const UserContext = createContext({});

function App() {
  return (
    <UserContext.Provider value="">
      <div className="container w-screen h-screen mx-auto p-4 flex flex-col justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
