import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../Store";
import User from "../../Classes/User";
import classes from "./Dashboard.module.css";
import PasswordsList from "./PasswordsList";
import Auth from "./Auth";

const Dashboard = () => {
  const user: User | undefined = useSelector((state: RootState) => state.auth.user);

  return (
    <div className={`${classes.dashboard} ${!user ? classes["dashboard-auth"] : ""}`}>
      {user && <PasswordsList />}
      {user && <Outlet />}
      {!user && <Auth />}
    </div>
  );
};

export default Dashboard;
