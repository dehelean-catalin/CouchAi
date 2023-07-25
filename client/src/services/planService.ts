import axios from "axios";
import { Plan } from "../models/planModels";

export type SectionPlan = {
	title: string;
	data: Plan[];
};

export const getAllPlans = async () => {
	return await axios
		.get<SectionPlan[]>("http://localhost:4000/plan")
		.then((res) => res.data);
};
