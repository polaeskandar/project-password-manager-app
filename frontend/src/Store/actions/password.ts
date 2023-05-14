import axios, { AxiosError } from "axios";

import { CustomThunkAction, CustomThunkDispatch } from "..";
import { addToPasswords } from "../password";
import User from "../../Classes/User";
import Password from "../../Classes/Password";

export const getPasswords = (user: User): CustomThunkAction => {
  return async (dispatch: CustomThunkDispatch): Promise<void> => {
    const endpoint = process.env.REACT_APP_PASSWORDS_ENDPOINT;
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

export const createPassword = (password: Password, token: string): CustomThunkAction => {
  return async (dispatch: CustomThunkDispatch) => {
    const endpoint = process.env.REACT_APP_PASSWORDS_ENDPOINT;

    if (!endpoint) return;

    try {
      const response = await axios.post(
        endpoint,
        {
          user_id: password.userId,
          application: password.application,
          username: password.username,
          password: password.password,
          description: password.description,
          category_id: password.categoryId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(addToPasswords([response.data.password]));
    } catch (error) {
      const errorData = (error as AxiosError).response?.data;
      console.log(errorData);
    }
  };
};

export const editPassword = (password: Password, token: string): CustomThunkAction => {
  return async () => {
    const endpoint = `${process.env.REACT_APP_PASSWORDS_ENDPOINT}/${password.id}`;

    if (!endpoint) return;

    try {
      await axios.patch(
        endpoint,
        {
          user_id: password.userId,
          application: password.application,
          username: password.username,
          password: password.password,
          description: password.description,
          category_id: password.categoryId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      const errorData = (error as AxiosError).response?.data;
      console.log(errorData);
    }
  };
};

export const deletePassword = (password: Password, user: User) => {
  return async () => {
    const endpoint = `${process.env.REACT_APP_PASSWORDS_ENDPOINT}/${password.id}`;

    if (!endpoint) return;

    try {
      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "x-user-id": user.id,
        },
      });
    } catch (error) {
      const errorData = (error as AxiosError).response?.data;
      console.log(errorData);
    }
  };
};
