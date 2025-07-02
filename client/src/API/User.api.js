import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "/api/user/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Sign Up request handler
export const handleSignUp = async (data) => {
  try {
    const response = await API.post("/register", data);
    return response.data.user;
  } catch (error) {
    console.error("Sign Up Error:", error?.response || error);
    throw error;
  }
};

// Login request handler
export const handleLogin = async (data) => {
  try {
    const response = await API.post("/login", data);
    return response.data.user;
  } catch (error) {
    console.error("Login Error:", error?.response || error);
    throw error;
  }
};

// Check Auth handler
export const handleAuthenticate = async () => {
  try {
    const response = await API.get("/authenticate");
    
    
    return response.data.user;
  } catch (error) {
    console.error("Authenticate Error:", error?.response || error);
    throw error;
  }
};

// Logout handler
export const handleLogout = async () => {
  try {
    const response = await API.get("/logout");
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error?.response || error);
    throw error;
  }
};
