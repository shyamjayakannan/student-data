"use client";
import classes from "../../styles/dashboard.module.css";
import Leftsidebar from "../../components/leftsidebar/Leftsidebar";
import LoadingWait from "../../ui/loadingWait";
import Dpage from "../../components/dashboard/Dpage";
import Settings from "../../components/dashboard/Settings";
import { useState } from "react";
import Companies from "../../components/dashboard/Companies";
import Students from "../../components/dashboard/Students";
import Shortlist from "../../components/dashboard/Shortlist";
const Buts = [
  {
    name: "Companies",

    class: classes.but,
    comp: <Companies />,
  },
  {
    name: "Students",

    class: classes.but,
    comp: <Students />,
  },
  {
    name: "Shortlist",

    class: classes.but,
    comp: <Shortlist />,
  },
  {
    name: "Settings",

    class: classes.butset,
    comp: <Settings />,
  },
];
const Dashboard = () => {
  const [disp, setdisp] = useState({
    Companies: false,
    Settings: false,
    Shortlist: false,
    Students: false,
  });

  // console.log(disp);
  function handleDisp(name) {
    setdisp((disp) => {
      for (let key in disp) {
        disp[key] = false;
      }
      // console.log(name);
      return { ...disp, [name]: !disp[name] };
    });
    // console.log(disp)
  }

  return (
    <LoadingWait>
      <div className={classes.dashboard_container}>
        <Leftsidebar disp={handleDisp} />
        <main>
          {!(
            disp.Companies ||
            disp.Shortlist ||
            disp.Settings ||
            disp.Students
          ) && <Dpage />}

          {disp.Students && <Students />}
          {disp.Companies && <Companies />}
          {disp.Settings && <Settings />}
          {disp.Shortlist && <Shortlist />}
          {/* <Settings/> */}
        </main>
      </div>
    </LoadingWait>
  );
};
export default Dashboard;
