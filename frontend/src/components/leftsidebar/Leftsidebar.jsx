"use client";
import { useContext, useEffect, useState } from "react";
import classes from "../../styles/leftsidebar.module.css";
import useGetUser from "../../hooks/useGetUser";
import AuthenticationContext from "../../store/AuthenticationContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

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
    name: "Chat Bot",
    route: "/chat/new",
  },
  {
    name: "Settings",
    route: "/dashboard/settings",
  },
];

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
  const router = useRouter();

  useEffect(() => {
    if (authenticationCtx.details.id === "") return;

    async function wow() {
      const set = await getUser(authenticationCtx.details);
      setemail(set.email);
    }
    wow();
  }, [authenticationCtx.details.id]);

  useEffect(() => {
    switch (router.query.id) {
      case "settings":
        setColor("Settings");
        break;
      case "students":
        setColor("Students");
        break;
      case "shortlist":
        setColor("Shortlist");
        break;
      case "companies":
        setColor("Companies");
        break;
      default: setButton(button => {
        for (const key in button) button[key] = false;
        return { ...button };
      });
    }
  }, [router.query.id]);

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
        <div className={classes.user}>
          <Image
            src="/images/avatar1.svg"
            alt="avatar"
            width={50}
            height={50}
            className={classes.avatar}
          />
          <h3>{email}</h3>
        </div>
        <p className={classes.buttons}>
          {Buts.map((element) => (
            <Link
              className={`${classes.but} ${element.name === "Settings" ? classes.butset : ""} ${button[element.name] ? classes.color : ""}`}
              key={element.name}
              href={element.route}
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
