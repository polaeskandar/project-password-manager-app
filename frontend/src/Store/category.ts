import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
