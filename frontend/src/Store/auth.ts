import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import User from "../Classes/User";

export interface AuthState {
  user: User | undefined;
}

const initialState: AuthState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = undefined;
      localStorage.removeItem("user");
    },
  },
});

export const { auth, logout } = authSlice.actions;
export default authSlice.reducer;
