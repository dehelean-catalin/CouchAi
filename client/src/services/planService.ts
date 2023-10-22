import axiosInstance from "../hooks/useAxios";
import { FindAllByCategoryResponse } from "../models/workoutModel";

export const findAllPlansByCategory = () =>
	axiosInstance.get<FindAllByCategoryResponse>("/schedules/categories");
