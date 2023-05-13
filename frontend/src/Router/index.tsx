import { createBrowserRouter } from "react-router-dom";

import Root from "../Layout/Root/Root";
import Error from "../Layout/Error/Error";
import Home from "../Pages/Home/Home";
import Categories from "../Pages/Categories/Categories";
import PasswordDetails from "../Pages/Home/PasswordDetails";
import NewPassword from "../Pages/Home/NewPassword";
import Uncategorized from "../Pages/Categories/Uncategorized";
import NewCategory from "../Pages/Categories/NewCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          { path: "/password/:id", element: <PasswordDetails /> },
          { path: "/password/new", element: <NewPassword /> },
        ],
      },
      { path: "/categories", element: <Categories />, children: [{ path: "/categories/new", element: <NewCategory /> }] },
      { path: "/uncategorized", element: <Uncategorized /> },
    ],
  },
]);

export default router;
