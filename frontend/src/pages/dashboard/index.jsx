"use client";
import classes from "../../styles/dashboard.module.css";
import Leftsidebar from "../../components/leftsidebar/Leftsidebar";
import LoadingWait from "../../ui/loadingWait";

const Dashboard = () => {
  return (
    <LoadingWait>
      <div className={classes.dashboard_container}>
        
        <Leftsidebar />
      </div>
    </LoadingWait>
  );
};
export default Dashboard;
