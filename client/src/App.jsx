import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const App = () => {
  const { token } = useContext(AuthContext);
  return (
    <div>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={token ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!token ? <LoginPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
