"use client";
import { useContext, useEffect, useState } from "react";
import classes from "../../styles/leftsidebar.module.css";
import useGetUser from "../../hooks/useGetUser";
import AuthenticationContext from "../../store/AuthenticationContext";
import Image from "next/image";
import Link from "next/link";

export const Buts = [
  {
    name: "Companies",
    route: "/dashboard/companies",
  },
  {
    name: "Students",
    route: "/dashboard/students",
  },
  {
    name: "Shortlist",
    route: "/dashboard/shortlist",
  },
  {
    name: "Settings",
    route: "/dashboard/settings",
  },
];

let data = {};

const Leftsidebar = () => {
  const [email, setemail] = useState("");
  const [button, setButton] = useState({
    Companies: false,
    Students: false,
    Shortlist: false,
    Settings: false,
  });
  const getUser = useGetUser();
  const authenticationCtx = useContext(AuthenticationContext);

  useEffect(() => {
    if (authenticationCtx.details.id === "") return;
    if (authenticationCtx.details.id === data.id) {
      setemail(data.email);
      return;
    }
    async function wow() {
      const set = await getUser(authenticationCtx.details);
      data = { email: set.email, id: authenticationCtx.details.id };
      setemail(set.email);
    }
    wow();
  }, [authenticationCtx.details]);

  function setColor(which) {
    setButton(button => {
      for (const key in button) button[key] = false;
      return { ...button, [which]: true };
    });
  }

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
          />
          {email}
        </p>
        <p className={classes.buttons}>
          {Buts.map((element) => (
            <Link
              className={`${classes.but} ${element.name === "Settings" ? classes.butset : ""} ${button[element.name] ? classes.color : ""}`}
              key={element.name}
              href={element.route}
              onClick={() => setColor(element.name)}
            >
              {element.name}
            </Link>
          ))}
        </p>
      </div>
    </>
  );
};
export default Leftsidebar;
