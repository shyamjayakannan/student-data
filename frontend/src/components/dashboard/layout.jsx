import classes from "../../styles/dashboard.module.css";
import Leftsidebar from "../leftsidebar/Leftsidebar";
import LoadingWait from "../../ui/loadingWait";

const Layout = (props) => {
  return (
    <LoadingWait>
      <div className={classes.dashboard_container}>
        <Leftsidebar />
        <main>{props.children}</main>
      </div>
    </LoadingWait>
  );
};
export default Layout;
