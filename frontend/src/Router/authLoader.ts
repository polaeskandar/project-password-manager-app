import { redirect } from "react-router-dom";

export const authLoader = async () => {
  console.log(localStorage.getItem("user"));

  if (!localStorage.getItem("user")) {
    return redirect("/");
  }
};
