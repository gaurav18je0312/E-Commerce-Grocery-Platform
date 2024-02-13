import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create an AuthContext to manage user authentication and data
const AuthContext = createContext();

export default AuthContext;

// AuthProvider component handles user authentication and user data
export const AuthProvider = ({ children }) => {
  // State to store the authentication tokens
  const [AuthToken, setAuthToken] = useState(() => {
    return localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
  });
  // State to store user data and loading status
  const [data, setData] = useState({ user: null, isloading: true });
  const navigate = useNavigate();
  // Function to set authentication tokens upon login
  const loginAuthToken = (token) => {
    console.log(token.access);
    setAuthToken(token);
    updateUser(token);
  };
  // Function to update user data based on authentication tokens
  const updateUser = (token) => {
    setData({user: null, isloading:true})
    try {
      console.log("update user.");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      };
      // Fetch user data from the server
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/profile/`, { headers: headers })
        .then((response) => {
          setData({ user: response.data, isloading: false });
          console.log("user updated.");
        })
        .catch((error) => {
          console.error(error.message);
          setData({ user: null, isloading: false });
          setAuthToken(null);
        });
    } catch (error) {
      console.log(error);
      setData({user: null, isloading: false})
    }
  };
  // Function to log out the user and remove tokens
  const logoutAuthToken = () => {
    console.log("logout.");
    setData({ user: null, isloading: false });
    setAuthToken(null);
    localStorage.removeItem("authTokens");
    navigate("/login/");
  };
  // Function to update the authentication token using the refresh token
  const updateToken = () => {
    console.log("update token.");
    const refresh = AuthToken.refresh;
    const body = {
      refresh: refresh,
    };
    // Request a new access token
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/token/refresh/`, body)
      .then((response) => {
        const newaccess = response.data.access;
        setAuthToken({ access: newaccess, refresh: refresh });
        localStorage.setItem("authTokens", JSON.stringify(AuthToken));
        console.log("token updated.");
        if (data.user===null) {
          console.log("user is null")
          updateUser({ access: newaccess });
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  // Initial effect to check for stored tokens and update if available
  useEffect(() => {
    if (localStorage.getItem("authTokens")) {
      updateToken();
    } else {
      setData({ ...data, isloading: false });
    }
  }, []);
  // Effect to periodically update the token (e.g., every 4 minutes)
  useEffect(() => {
    let interval = setInterval(() => {
      if (AuthToken) {
        updateToken();
      }
    }, 240000);
    return () => {
      clearInterval(interval);
    };
  }, [AuthToken]);
  // Provide authentication data to the context
  let authData = {
    AccessToken: AuthToken ? AuthToken.access : null,
    data: data,
    loginAuthToken: loginAuthToken,
    logoutAuthToken: logoutAuthToken,
    updateUser: updateUser,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
