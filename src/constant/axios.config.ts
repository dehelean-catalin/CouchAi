import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://192.168.1.2:8090/api",
});

export default axiosInstance;
