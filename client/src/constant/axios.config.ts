import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://192.168.1.6:8090/api",
});

export default axiosInstance;
