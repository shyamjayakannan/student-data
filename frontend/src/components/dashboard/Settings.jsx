import React from "react";
import classes from "../../styles/dashboard/companies.module.css";
import Image from 'next/image'

const Settings = () => {
  return (
    <div className={classes.main_cont}>
      <Image
        src="/images/settings.png"
        alt="setting"
        height={500}
        width={500}
      />
    </div>
  );
};

export default Settings;
