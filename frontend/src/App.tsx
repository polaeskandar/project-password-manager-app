import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CustomThunkDispatch, RootState } from "./Store";
import { getPasswords } from "./Store/actions/password";
import { getCategories } from "./Store/actions/category";
import User from "./Classes/User";
import router from "./Router";

let initial = true;

function App() {
  const dispatch: CustomThunkDispatch = useDispatch();
  const user: User | undefined = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }

    if (!user) return;
    dispatch(getCategories(user));
    dispatch(getPasswords(user));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
