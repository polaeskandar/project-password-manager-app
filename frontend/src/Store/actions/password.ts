import axios, { AxiosError } from "axios";

import { CustomThunkAction, CustomThunkDispatch } from "..";
import { addToPasswords } from "../password";
import User from "../../Classes/User";

export const getPasswords = (user: User): CustomThunkAction => {
  return async (dispatch: CustomThunkDispatch): Promise<void> => {
    const endpoint = process.env.REACT_APP_GET_USER_PASSWORDS_ENDPOINT;
    if (!endpoint) return;

    try {
      const response = await axios.get(`${endpoint}/${user.id}`);
      dispatch(addToPasswords(response.data.passwords));
    } catch (error: unknown) {
      const errorData = (error as AxiosError).response?.data;
      console.log(errorData);
    }
  };
};
