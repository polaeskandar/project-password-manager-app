import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Outlet } from "react-router-dom";

import classes from "./Home.module.css";
import { RootState } from "../../Store";
import User from "../../Classes/User";
import Auth from "./Auth";
import PasswordsList from "./PasswordsList";
import { getPasswords } from "../../Store/passwords";
import { getCategories } from "../../Store/category";

let firstLoad = true;

const Home = () => {
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const user: User | undefined = useSelector((state: RootState) => state.auth.user);
  const classList: string = `${classes.home} ${!user ? classes["auth"] : ""}`;

  useEffect(() => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }

    if (!user) return;

    dispatch(getCategories(user));
    dispatch(getPasswords(user));
  }, [user, dispatch]);

  return (
    <div className={classList}>
      {!user && <Auth />}
      {user && <PasswordsList />}
      {user && <Outlet />}
    </div>
  );
};

export default Home;
