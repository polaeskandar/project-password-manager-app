import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import classes from "./Home.module.css";
import User from "../../Classes/User";
import Auth from "./Auth";
import PasswordsList from "./PasswordsList";
import { RootState } from "../../Store";

const Home = () => {
  const user: User | undefined = useSelector((state: RootState) => state.auth.user);
  const classList: string = `${classes.home} ${!user ? classes["auth"] : ""}`;

  return (
    <div className={classList}>
      {!user && <Auth />}
      {user && <PasswordsList />}
      {user && <Outlet />}
    </div>
  );
};

export default Home;
