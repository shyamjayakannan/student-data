"use client";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import classes from "../../styles/leftsidebar.module.css";
import useGetUser from "../../hooks/useGetUser";
import AuthenticationContext from "../../store/AuthenticationContext";
import Image from "next/image";
const Leftsidebar = () => {
  const [email, setemail] = useState("");
  const getUser = useGetUser();
  const authenticationCtx = useContext(AuthenticationContext);

  useEffect(() => {
    if (authenticationCtx.details.id === "") return;
    async function wow() {
      const set = await getUser(authenticationCtx.details);
      setemail(set.email);
      // console.log(await getUser(authenticationCtx.details))
    }
    wow();
  }, [authenticationCtx.details]);

  return (
    <>
      <div className={classes.main_section}>
        <br />
        <p className={classes.user}>
          <Image
            src="/images/avatar1.svg"
            alt="avatar"
            width={50}
            height={50}
            className={classes.avatar}
          />{" "}
          {email}
        </p>
        <p className={classes.buttons}>
          <button className={classes.but}>Companies</button>
          <button className={classes.but}>Students</button>
          <button className={classes.but}>Shortlist</button>
          <button className={classes.butset}>Settings</button>
        </p>
      </div>
    </>
  );
};
export default Leftsidebar;
