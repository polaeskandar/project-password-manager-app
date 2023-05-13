import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Category from "../Classes/Category";

export interface CategoryState {
  categories: Array<Category>;
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addToCategories(state, action: PayloadAction<Array<Category>>) {
      state.categories.push(...action.payload);
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
    // newCategory(state, action: PayloadAction<Category>) {
    //   state.categories.push(action.payload);
    // },
    deleteCategory(state, action: PayloadAction<{ id: string }>) {
      state.categories = state.categories.filter((category) => category.id !== action.payload.id);
    },
  },
});

export const { addToCategories, renameCategory, editCategoryDescription, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
