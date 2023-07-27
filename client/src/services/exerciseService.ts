import axios from "axios";

export const getAllExercises = async () => {
	return await axios
		.get<any[]>("http://localhost:4000/exercise")
		.then((res) => res.data);
};
