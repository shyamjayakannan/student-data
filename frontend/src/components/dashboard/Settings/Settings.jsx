"use client";

import React, { useContext, useEffect, useState } from "react";
import classes from "../../../styles/dashboard/dashboard.module.css";
import Image from "next/image";
import Modal from "./Modal";
import AuthenticationContext from "../../../store/AuthenticationContext";
import useAuth from "../../../hooks/useAuth";

const Settings = () => {
  const authenticationCtx = useContext(AuthenticationContext);
  const [popup, setPopup] = useState(authenticationCtx.details.firstTime);
  const Auth = useAuth();

  useEffect(() => {
    if (authenticationCtx.details.id === "" || !authenticationCtx.details.firstTime) return;

    authenticationCtx.setFirstTime(false);

    // backend
    (async () => {
      await Auth(
        { id: authenticationCtx.details.id },
        "updateFirstTime"
      );
    })();
  }, [authenticationCtx.details.id]);

  return (
    <div className={classes.main_cont}>
      <Image
        src="/images/settings.png"
        alt="setting"
        height={300}
        width={300}
        priority
      />
      <p>
        Select the category/categories of the companies:
      </p>
      <button className={classes.button} onClick={() => setPopup(true)}>Categories</button>
      <Modal close={() => setPopup(false)} style={{ display: popup ? "flex" : "none" }} />
    </div>
  );
};

export default Settings;
