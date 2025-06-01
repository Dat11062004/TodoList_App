import { Children, useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [list, setList] = useState([]);

  const signup = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/user/${state}`, credentials);
      if (data.success) {
        axios.defaults.headers.common["token"] = data.token;
        setToken(data.token);
        localStorage.setItem("token", data.token);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const logout = async () => {
    setToken("");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["token"];
  };
  const getList = async () => {
    try {
      const { data } = await axios.get("/api/user/list");
      if (data.success) {
        setList(data.tasks);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const addTask = async (task) => {
    try {
      const { data } = await axios.post("/api/user/add", { input: task });
      if (data.success) {
        toast.success(data.message);
        getList();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const updateTask = async (id) => {
    try {
      const { data } = await axios.post(`/api/user/update/${id}`);
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`/api/user/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        getList();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["token"] = storedToken;
    }
  }, []);
  const value = {
    signup,
    setToken,
    token,
    logout,
    list,
    setList,
    getList,
    addTask,
    updateTask,
    deleteTask,
    name,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
