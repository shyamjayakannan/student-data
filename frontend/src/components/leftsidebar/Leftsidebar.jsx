"use client";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import classes from "../../styles/leftsidebar.module.css";
import useGetUser from "../../hooks/useGetUser";
import AuthenticationContext from "../../store/AuthenticationContext";
import Image from "next/image";

import Dpage from "../dashboard/Dpage";
import Settings from "../dashboard/Settings";
import { useRouter } from "next/router";

import Link from "next/link";
import Companies from "../dashboard/Companies";
import Students from "../dashboard/Students";
import Shortlist from "../dashboard/Shortlist";

export const Buts = [
  {
    name: "Companies",
    display: false,
    class: classes.but,
    comp: <Companies />,
  },
  {
    name: "Students",
    display: false,
    class: classes.but,
    comp: <Students />,
  },
  {
    name: "Shortlist",
    display: false,
    class: classes.but,
    comp: <Shortlist />,
  },
  {
    name: "Settings",
    display: false,
    class: classes.butset,
    comp: <Settings />,
  },
];

const Leftsidebar = (props) => {
  const router = useRouter();
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

  const handleclick = (e) => {
    e.preventDefault();
    // console.log(e.target.value);

    props.disp(e.target.value);
    // x.display =!x.display;
    // console.log(Buts.find((e)=>e.display==true).name);
  };

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
            <button
              className={element.class}
              key={element.name}
              value={element.name}
              // href={`/dashboard/${element.name.toLocaleLowerCase()}`}
              onClick={handleclick}
            >
              {element.name}
            </button>
          ))}
        </p>
      </div>
    </>
  );
};
export default Leftsidebar;
