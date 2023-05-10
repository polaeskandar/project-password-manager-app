import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import Password from "../Classes/Password";

export interface PasswordsState {
  passwords: Array<Password>;
}

const initialState: PasswordsState = {
  passwords: [
    {
      id: 1,
      categoryId: 1,
      app: "outlook",
      description:
        "Some meaningful description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      userName: "testuser@mytest.com",
      encryptedPassword: "TXlQYXNzd29yZEAxMjM=",
      userId: 1,
      createdAt: new Date("2023-05-08 12:56:33"),
    },
    {
      id: 2,
      categoryId: 2,
      app: "messenger",
      description:
        "Some meaningful description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      userName: "testuser2@mytest.com",
      encryptedPassword: "TmV3UGFzc3dvcmRAMTIz",
      userId: 1,
      createdAt: new Date("2023-05-01 12:56:33"),
    },
    {
      id: 3,
      categoryId: 3,
      app: "Facebook",
      description:
        "Some meaningful description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      userName: "testuser3@mytest.com",
      encryptedPassword: "TmV3UGFzc3dvcmRAMTIz",
      userId: 2,
      createdAt: new Date("2023-05-01 12:56:33"),
    },
  ],
};

const passwordsSlice = createSlice({
  name: "passwords",
  initialState,
  reducers: {
    changeUserName(state, action: PayloadAction<{ id: number; newUserName: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else password.userName = action.payload.newUserName;
    },
    changePassword(state, action: PayloadAction<{ id: number; newPassword: string }>) {
      const password = state.passwords.find((password) => password.id === action.payload.id);
      if (!password) return;
      else password.encryptedPassword = action.payload.newPassword;
    },
    newPassword(state, action: PayloadAction<Password>) {
      state.passwords.push(action.payload);
    },
  },
});

export const { changeUserName, changePassword, newPassword } = passwordsSlice.actions;
export default passwordsSlice.reducer;
