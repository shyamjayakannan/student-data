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
    class: classes.but,
    route: "/dashboard/companies",
  },
  {
    name: "Students",
    class: classes.but,
    route: "/dashboard/students",
  },
  {
    name: "Shortlist",
    class: classes.but,
    route: "/dashboard/shortlist",
  },
  {
    name: "Settings",
    class: classes.butset,
    route: "/dashboard/settings",
  },
];

const Leftsidebar = () => {
  const [email, setemail] = useState("");
  const getUser = useGetUser();

  const authenticationCtx = useContext(AuthenticationContext);
  useEffect(() => {
    if (authenticationCtx.details.id === "") return;
    async function wow() {
      const set = await getUser(authenticationCtx.details);
      setemail(set.email);
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
          />
          {email}
        </p>
        <p className={classes.buttons}>
          {Buts.map((element) => (
            <Link
              className={element.class}
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
