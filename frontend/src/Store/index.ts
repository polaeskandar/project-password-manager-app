import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import passwordsSlice from "./passwords";
import categorySlice from "./category";

const store = configureStore({
  reducer: {
    auth: authSlice,
    passwords: passwordsSlice,
    categories: categorySlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
