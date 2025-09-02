import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";

import { taskSlice } from "@redux-slices";

export const store = configureStore({
  reducer: {
    task: taskSlice,
  },
});

export type IAppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IRootState,
  unknown,
  Action<string>
>;
