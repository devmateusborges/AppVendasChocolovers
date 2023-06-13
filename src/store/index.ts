import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import utilReducer from "./utilStore";
export const store = configureStore({
  reducer: {
    util: utilReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
