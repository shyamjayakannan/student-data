import React from "react";
import classes from "../../styles/dashboard/dashboard.module.css";
import Image from "next/image";
const Dpage = () => {
  return (
    <div className={classes.main_cont}>
      <h1 className={classes.h1}>Welcome to the Dashboard</h1>
      <Image src="/images/dpage.png" priority alt="dpage" width={500} height={500}/>
    </div>
  );
};

export default Dpage;
