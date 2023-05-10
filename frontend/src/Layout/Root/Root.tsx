import { Outlet } from "react-router-dom";

import MainNavigation from "../MainNavigation/MainNavigation";

const Root = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default Root;
