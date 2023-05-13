import axios, { AxiosError } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import type { AnyAction, Dispatch, PayloadAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";

import Password from "../Classes/Password";
import User from "../Classes/User";
import { AppDispatch } from ".";

export interface PasswordsState {
  passwords: Array<Password>;
}

const initialState: PasswordsState = {
  passwords: [
    {
      id: "1",
      categoryId: "1",
      application: "outlook",
      description:
        "Some meaningful description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      userName: "testuser@mytest.com",
      encryptedPassword: "TXlQYXNzd29yZEAxMjM=",
      userId: "1",
      createdAt: new Date("2023-05-08 12:56:33"),
    },
    {
      id: "2",
      categoryId: "2",
      application: "messenger",
      description:
        "Some meaningful description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      userName: "testuser2@mytest.com",
      encryptedPassword: "TmV3UGFzc3dvcmRAMTIz",
      userId: "1",
      createdAt: new Date("2023-05-01 12:56:33"),
    },
    {
      id: "3",
      categoryId: "3",
      application: "Facebook",
      description:
        "Some meaningful description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      userName: "testuser3@mytest.com",
      encryptedPassword: "TmV3UGFzc3dvcmRAMTIz",
      userId: "2",
      createdAt: new Date("2023-05-01 12:56:33"),
    },
    {
      id: "4",
      categoryId: "4",
      application: "Twitter",
      description:
        "Some meaningful description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      userName: "testuser3@mytest.com",
      encryptedPassword: "TmV3UGFzc3dvcmRAMTIz",
      userId: "2",
      createdAt: new Date("2023-05-01 12:56:33"),
    },
  ],
};

const passwordsSlice = createSlice({
  name: "passwords",
  initialState,
  reducers: {
    setPasswords(state, action: PayloadAction<Array<Password>>) {
      state.passwords = action.payload;
    },
    changeUserName(state, action: PayloadAction<{ id: string; newUserName: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else password.userName = action.payload.newUserName;
    },
    changePassword(state, action: PayloadAction<{ id: string; newPassword: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else password.encryptedPassword = action.payload.newPassword;
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
    deletePassword(state, action: PayloadAction<{ id: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else state.passwords = state.passwords.filter((passwordItem) => passwordItem.id !== password.id);
    },
    newPassword(state, action: PayloadAction<Password>) {
      state.passwords.push(action.payload);
    },
  },
});

export const getPasswords =
  (user: User): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const endpoint = process.env.REACT_APP_GET_USER_PASSWORDS_ENDPOINT;
    if (!endpoint) return;

    try {
      const response = await axios.get(`${endpoint}/${user.id}`);
      dispatch(passwordsSlice.actions.setPasswords(response.data.passwords));
      console.log(response.data.passwords);
    } catch (error: unknown) {
      const errorData = (error as AxiosError).response?.data;
      console.log(errorData);
    }
  };

export const { changeUserName, changePassword, changeApplication, changeCategory, changeDescription, deletePassword, newPassword } = passwordsSlice.actions;
export default passwordsSlice.reducer;
