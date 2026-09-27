import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exercisesReducer from "./exerciseReducer";
import workoutReducer from "./workoutSlice";
import { profileReducer } from "./profileSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  exercises: exercisesReducer,
  workout: workoutReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
