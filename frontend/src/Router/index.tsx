import { createBrowserRouter } from "react-router-dom";

import Root from "../Layout/Root/Root";
import Error from "../Layout/Error/Error";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Categories from "../Pages/Categories/Categories";
import PasswordDetails from "../Pages/Dashboard/PasswordDetails";
import NewPassword from "../Pages/Dashboard/NewPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          { path: "/password/:id", element: <PasswordDetails /> },
          { path: "/password/new", element: <NewPassword /> },
        ],
      },
      { path: "/categories", element: <Categories /> },
    ],
  },
]);

export default router;
