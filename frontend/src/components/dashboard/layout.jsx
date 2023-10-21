import classes from "../../styles/dashboard/dashboard.module.css";
import Leftsidebar from "../leftsidebar/Leftsidebar";
import LoadingWait from "../../ui/loadingWait";

const Layout = (props) => {
  return (
    // <LoadingWait>
      <div className={classes.dashboard_container}>
        <Leftsidebar />
        <main style={{ width: "100%" }}>{props.children}</main>
      </div>
    // </LoadingWait>
  );
};
export default Layout;
