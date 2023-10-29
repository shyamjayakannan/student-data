"use client";

import React, { useState } from "react";
import classes from "../../../styles/dashboard/dashboard.module.css";
import Image from "next/image";
import Modal from "./Modal";

const Settings = () => {
  const [popup, setPopup] = useState(false);

  return (
    <div className={classes.main_cont}>
      <Image
        src="/images/settings.png"
        alt="setting"
        height={300}
        width={300}
      />
      <p>
        Select the category/categories of the companies:
      </p>
      <button className={classes.button} onClick={() => setPopup(true)}>Categories</button>
      <Modal close={() => setPopup(false)} style={{display: popup ? "flex" : "none"}} />
    </div>
  );
};

export default Settings;
