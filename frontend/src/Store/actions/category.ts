import axios, { AxiosError } from "axios";

import { CustomThunkAction, CustomThunkDispatch } from "..";
import { addToCategories } from "../category";
import User from "../../Classes/User";
import Category from "../../Classes/Category";

export const getCategories = (user: User): CustomThunkAction => {
  return async (dispatch: CustomThunkDispatch) => {
    const endpoint = `${process.env.REACT_APP_CATEGORIES_ENDPOINT}/${user.id}`;
    if (!endpoint) return;

    try {
      const response = await axios.get(endpoint);
      dispatch(addToCategories(response.data.categories));
    } catch (error: unknown) {
      const errorData = (error as AxiosError).response?.data;
      console.log(errorData);
    }
  };
};

export const createCategory = (category: Category, token: string): CustomThunkAction => {
  return async (dispatch: CustomThunkDispatch) => {
    const endpoint = process.env.REACT_APP_CATEGORIES_ENDPOINT;

    if (!endpoint) return;

    try {
      const response = await axios.post(
        endpoint,
        {
          name: category.name,
          description: category.description,
          user_id: category.userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(addToCategories([response.data.category]));
    } catch (error) {
      const errorData = (error as AxiosError).response?.data;
      console.log(errorData);
    }
  };
};

export const editCategory = (category: Category, token: string): CustomThunkAction => {
  return async () => {
    const endpoint = `${process.env.REACT_APP_CATEGORIES_ENDPOINT}/${category.id}`;

    if (!endpoint) return;

    try {
      await axios.patch(
        endpoint,
        {
          name: category.name,
          description: category.description,
          user_id: category.userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      const errorData = (error as AxiosError).response?.data;
      console.log(errorData);
    }
  };
};

export const deleteCategory = (category: Category, user: User) => {
  return async () => {
    const endpoint = `${process.env.REACT_APP_CATEGORIES_ENDPOINT}/${category.id}`;

    console.log("Deleting", category.id);

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
