import { AxiosInstance } from "axios";
import { Exercise } from "../models/exerciseModel";

export const getAllExercises = (axios: AxiosInstance) =>
	axios.get<Exercise[]>("/Exercise").then((res) => res.data);
