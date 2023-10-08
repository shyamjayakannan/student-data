"use client";
import React, { useState, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthenticationContext = createContext({
  open: {
    signupOpen: false,
    LogInOpen: true,
    error: "",
  },
  details: {
    email: "",
    id: "",
    token: "",
  },
  isLoggedIn: true,
  show: () => {},
  hide: () => {},
  setDetails: () => {},
  setLoggedIn: () => {},
});

export default AuthenticationContext;

export function AuthenticationContextProvider({ children }) {
  const { fetchPersonalDetails, removePersonalDetails } = useLocalStorage();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [open, setOpen] = useState({
    signupOpen: false,
    LogInOpen: true,
    error: "",
  });
  const [details, setDetails] = useState({
    email: "",
    id: "",
    token: "",
  });

  useEffect(() => {
    const data = fetchPersonalDetails();

    if (!data) {
      setIsLoggedIn(false);
      return;
    }

    (async (data) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/matchToken`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const responsedata = await response.json();
        if (responsedata.type === "Success") setIsLoggedIn(true);
        else {
          removePersonalDetails();
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log(err);
      }
    })(data);
  }, []);

  function showHandler(name) {
    if (name === "signupOpen") {
      setOpen({
        error: "",
        [name]: true,
        LogInOpen: false,
      });
    } else if (name === "LogInOpen") {
      setOpen({
        error: "",
        [name]: true,
        signupOpen: false,
      });
    }
  }

  function hideHandler(name) {
    if (name === "all") {
      setOpen({
        signupOpen: false,
        LogInOpen: false,
        error: "",
      });
    } else {
      setOpen((open) => {
        return { ...open, [name]: false };
      });
    }
  }

  function setNewDetails() {
    const { email, id, token } = fetchPersonalDetails();

    setDetails({
      email,
      id,
      token,
    });
  }

  return (
    <AuthenticationContext.Provider
      value={{
        open,
        show: showHandler,
        hide: hideHandler,
        setDetails: setNewDetails,
        setLoggedIn: setIsLoggedIn,
        isLoggedIn,
        details,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
