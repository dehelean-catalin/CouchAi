import axiosInstance from "../hooks/useAxios";
import { WorkoutPlan } from "../models/workoutModel";

export const findAllPlansByCategory = () =>
	axiosInstance.get<WorkoutPlan[]>("/schedules");
