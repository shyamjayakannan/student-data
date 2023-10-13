import React from "react";
import classes from "../../styles/dashboard.module.css";
import Image from "next/image";
const Dpage = () => {
  return (
    <div className={classes.main_cont}>
      <Image src="/images/dpage.png" priority alt="dpage" width={500} height={500}/>
    </div>
  );
};

export default Dpage;
