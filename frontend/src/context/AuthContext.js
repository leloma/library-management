import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:2001/api/token/", {
      method: "POST",
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      navigate("/homepage");
    } else {
      toast.error("Something went Wrong");
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // const updateToken = async () => {
  //   console.log("Update Token called");
  //   const response = await fetch("http://127.0.0.1:2001/api/token/refresh/", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       'refresh': authToken?.refresh,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await response.json();
  //   if (response.status === 200) {
  //     setAuthToken(data);
  //     setUser(jwt_decode(data.access));
  //     localStorage.setItem("authToken", JSON.stringify(data));
  //   } else {
  //     logoutUser();
  //   }
  //   if (loading) {
  //     setLoading(false);
  //   }
  // };

  const contextData = {
    user: user,
    authToken: authToken,
    setAuthToken: setAuthToken,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    // if (loading) {
    //   updateToken();
    // }
    // let fourminutes = 1000 * 60 * 4;
    // let interval = setInterval(() => {
    //   if (authToken) {
    //     updateToken();
    //   }
    // }, fourminutes);
    // return () => clearInterval(interval);

    if (authToken) {
      setUser(jwt_decode(authToken.access))
    }
    setLoading(false)
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
