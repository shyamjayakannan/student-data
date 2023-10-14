import React from "react";
import classes from "../../../styles/dashboard.module.css";
import Image from 'next/image'
import Layout from "../../../components/dashboard/layout";
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

Settings.getLayout = (page) => <Layout>{page}</Layout>;

export default Settings;
