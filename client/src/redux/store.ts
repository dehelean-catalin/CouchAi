import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./exerciseReducer";
import workoutReducer from "./workoutSlice";

const rootReducer = combineReducers({
  exercise: exerciseReducer,
  workout: workoutReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
