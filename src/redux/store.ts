import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./slices/cryptoSlice";
import weatherReducer from "./slices/weatherSlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    weather: weatherReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

