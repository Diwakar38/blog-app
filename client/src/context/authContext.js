import axios from "axios";
import { createContext, useEffect, useState } from "react";
import URL from "../Back.js";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    }
    const res = await axios.post(`${URL}/api/auth/login`, inputs, config, {
      withCredentials: true
    })
    if(res) setCurrentUser(res.data);
};

const logout = async (inputs) => {
  await axios.post(`${URL}/api/auth/logout`, {
      withCredentials: truehttp://localhost:3000/
  });
  setCurrentUser(null);
};

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
