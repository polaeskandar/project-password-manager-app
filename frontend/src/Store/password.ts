import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import Password from "../Classes/Password";

export interface PasswordsState {
  passwords: Array<Password>;
}

const initialState: PasswordsState = {
  passwords: [],
};

const passwordsSlice = createSlice({
  name: "passwords",
  initialState,
  reducers: {
    addToPasswords(state, action: PayloadAction<Array<Password>>) {
      state.passwords.push(...action.payload);
    },
    changeUserName(state, action: PayloadAction<{ id: string; newUserName: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else password.username = action.payload.newUserName;
    },
    changePassword(state, action: PayloadAction<{ id: string; newPassword: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else password.password = action.payload.newPassword;
    },
    changeApplication(state, action: PayloadAction<{ id: string; newApplication: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else password.application = action.payload.newApplication;
    },
    changeCategory(state, action: PayloadAction<{ id: string; newCategory: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else password.categoryId = action.payload.newCategory;
    },
    changeDescription(state, action: PayloadAction<{ id: string; newDescription: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else password.description = action.payload.newDescription;
    },
    removePassword(state, action: PayloadAction<{ id: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else state.passwords = state.passwords.filter((passwordItem) => passwordItem.id !== password.id);
    },
  },
});

export const { addToPasswords, changeUserName, changePassword, changeApplication, changeCategory, changeDescription, removePassword } = passwordsSlice.actions;
export default passwordsSlice.reducer;
