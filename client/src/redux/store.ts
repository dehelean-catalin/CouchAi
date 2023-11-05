import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import activeWorkoutSession from "./activeWorkoutSessionReducer";
import exerciseReducer from "./exerciseReducer";
import scheduleReducer from "./scheduleReducer";
import workoutFormReducer from "./workoutFormReducer";
import workoutPlanReducer from "./workoutPlanReducer";

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	blacklist: ["workoutForm"],
};

const rootReducer = combineReducers({
	exercise: exerciseReducer,
	workoutPlan: workoutPlanReducer,
	workoutForm: workoutFormReducer,
	schedule: scheduleReducer,
	activeWorkoutSession: activeWorkoutSession,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
