"use client";
import React, { useState, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { googleLogout } from "@react-oauth/google";

const AuthenticationContext = createContext({
  open: {
    signupOpen: Boolean,
    LogInOpen: Boolean,
    error: String,
    logoutButton: Boolean,
  },
  details: {
    id: String,
    firstTime: Boolean,
  },
  isLoggedIn: Boolean,
  show: () => { },
  hide: () => { },
  setDetails: () => { },
  setLoggedIn: () => { },
  setLogoutButton: () => { },
  setFirstTime: () => { },
});

export default AuthenticationContext;

export function AuthenticationContextProvider({ children }) {
  const { fetchPersonalDetails, removePersonalDetails } = useLocalStorage();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [open, setOpen] = useState({
    logoutButton: false,
    signupOpen: false,
    LogInOpen: true,
    error: "",
  });
  const [details, setDetails] = useState({
    id: "",
    firstTime: false,
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
        if (responsedata.type === "Success") {
          setIsLoggedIn(true);
          setDetails({ id: responsedata.id, firstTime: responsedata.firstTime });
        }
        else {
          removePersonalDetails();
          setIsLoggedIn(false);
          googleLogout();
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

  function setNewDetails(id) {
    setDetails(details => {
      return { ...details, id };
    });
  }

  function setFirstTime(firstTime) {
    setDetails(details => {
      return { ...details, firstTime };
    });
  }

  function logoutButtonHandler(state) {
    setOpen(open => {
      return { ...open, logoutButton: state };
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
        setLogoutButton: logoutButtonHandler,
        setFirstTime,
        isLoggedIn,
        details,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
