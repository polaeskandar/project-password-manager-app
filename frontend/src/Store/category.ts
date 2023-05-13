import axios, { AxiosError } from "axios";
import { AnyAction, PayloadAction, ThunkAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";

import Category from "../Classes/Category";
import User from "../Classes/User";

export interface CategoryState {
  categories: Array<Category>;
}

const initialState: CategoryState = {
  categories: [
    new Category("1", "work", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "1", new Date()),
    new Category("2", "school", "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "1", new Date()),
    new Category("3", "social media", "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", "2", new Date()),
    new Category("4", "malicious", "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", "2", new Date()),
  ],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Array<Category>>) {
      state.categories = action.payload;
    },
    renameCategory(state, action: PayloadAction<{ id: string; newName: string }>) {
      const category = state.categories.find((category) => category.id === action.payload.id);
      if (!category) return;
      else category.name = action.payload.newName;
    },
    editCategoryDescription(state, action: PayloadAction<{ id: string; newDescription: string }>) {
      const category = state.categories.find((category) => category.id === action.payload.id);
      if (!category) return;
      else category.description = action.payload.newDescription;
    },
    newCategory(state, action: PayloadAction<Category>) {
      state.categories.push(action.payload);
    },
    deleteCategory(state, action: PayloadAction<{ id: string }>) {
      state.categories = state.categories.filter((category) => category.id !== action.payload.id);
    },
  },
});

export const getCategories =
  (user: User): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const endpoint = process.env.REACT_APP_GET_USER_CATEGORIES_ENDPOINT;
    if (!endpoint) return;

    try {
      const response = await axios.get(`${endpoint}/${user.id}`);
      dispatch(categorySlice.actions.setCategories(response.data.categories));
      console.log(response.data.categories);
    } catch (error: unknown) {
      const errorData = (error as AxiosError).response?.data;
      console.log(errorData);
    }
  };

export const { renameCategory, editCategoryDescription, newCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
