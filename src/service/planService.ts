import axiosInstance from "@/constant/axios.config";
import { WorkoutPlan } from "@/model/workoutModel";

export const findAllPlansByCategory = () =>
	axiosInstance.get<WorkoutPlan[]>("/schedules");
