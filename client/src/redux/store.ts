import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exercisesReducer from "./exerciseReducer";
import workoutReducer from "./workoutSlice";
import { profileReducer } from "./profileSlice";

const rootReducer = combineReducers({
  exercises: exercisesReducer,
  workout: workoutReducer,
  profile: profileReducer,
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
