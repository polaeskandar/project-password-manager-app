import axios, { AxiosError } from "axios";

import { CustomThunkAction, CustomThunkDispatch } from "..";
import User from "../../Classes/User";
import { auth } from "../auth";

export const authAction = (user: User, mode: string): CustomThunkAction => {
  return async (dispatch: CustomThunkDispatch) => {
    const endpoint = `${process.env.REACT_APP_AUTH_ENDPOINT}/${mode}`;

    if (!endpoint) return;

    try {
      const response = await axios.post(endpoint, {
        username: user.username,
        password: user.password,
      });

      const data = response.data;
      dispatch(auth({ id: data.user.id, username: data.user.username, token: data.token }));
    } catch (error) {
      const errorData = (error as AxiosError).response?.data;
      console.log(errorData);
    }
  };
};
