import {
  Action,
  AnyAction,
  Store,
  ThunkAction,
  ThunkDispatch,
  configureStore,
} from "@reduxjs/toolkit";
import {levelReducer} from "./levelSlice";

export const store = configureStore({
  reducer: {
    level: levelReducer,
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
