import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Category from "../Classes/Category";

export interface CategoryState {
  categories: Array<Category>;
}

const initialState: CategoryState = {
  categories: [
    new Category(1, "work", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 1),
    new Category(2, "school", "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", 1),
    new Category(3, "social media", "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", 2),
    new Category(4, "malicious", "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", 2),
  ],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    renameCategory(state, action: PayloadAction<{ id: number; newName: string }>) {
      const category = state.categories.find((category) => category.id === action.payload.id);
      if (!category) return;
      else category.name = action.payload.newName;
    },
    editCategoryDescription(state, action: PayloadAction<{ id: number; newDescription: string }>) {
      const category = state.categories.find((category) => category.id === action.payload.id);
      if (!category) return;
      else category.description = action.payload.newDescription;
    },
    newCategory(state, action: PayloadAction<Category>) {
      state.categories.push(action.payload);
    },
    deleteCategory(state, action: PayloadAction<{ id: number }>) {
      state.categories = state.categories.filter((category) => category.id !== action.payload.id);
    },
  },
});

export const { renameCategory, editCategoryDescription, newCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
