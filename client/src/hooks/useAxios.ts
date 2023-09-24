import axios from "axios";

export const useAxios = () => {
	const axiosInstance = axios.create({
		baseURL: "https://localhost:44306/api",
	});

	return axiosInstance;
};
