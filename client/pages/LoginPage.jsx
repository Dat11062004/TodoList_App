import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const LoginPage = () => {
  const { signup } = useContext(AuthContext);
  const [login, setLogin] = useState("Sign Up"); // hoặc "Login"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleLogin = () => {
    setLogin(login === "Sign Up" ? "Login" : "Sign Up");
    // reset input khi đổi form
    setName("");
    setEmail("");
    setPassword("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(login === "Sign Up" ? "signup" : "login", {
      name,
      email,
      password,
    });
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-[#153667] to-[#4e085f]">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 w-full max-w-md flex flex-col gap-6 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-blue-400 text-center">
          {login === "Sign Up" ? "Sign Up" : "Login"}
        </h2>

        {login === "Sign Up" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
          minLength={6}
        />

        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 transition-colors text-white font-semibold rounded-md py-3"
        >
          {login === "Sign Up" ? "Sign Up" : "Login"}
        </button>

        <p className="text-blue-600 text-center">
          {login === "Sign Up"
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            type="button"
            onClick={toggleLogin}
            className="underline hover:text-purple-300 font-medium"
          >
            {login === "Sign Up" ? "Login here" : "Sign up here"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
