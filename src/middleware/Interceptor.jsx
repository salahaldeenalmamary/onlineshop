import axios from "axios";

const getToken = () => {
	return localStorage.getItem("token");
};

export function Interceptor() {
	//Request interceptor
	axios.interceptors.request.use(
		(config) => {
			const token = getToken();
			if (token) {
				config.headers["Authorization"] = "Bearer " + token;
			}
			config.headers["Content-Type"] = "application/json";
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);

	//Response interceptor
	axios.interceptors.response.use(
		(response) => {
		
			return response;
		},
		function (error) {
		
			const originalRequest = error.config;

			if (
				error.response.status === 401 &&
				originalRequest.url === "http://dummydomain.com/auth/token"
			) {
				
				return Promise.reject(error);
			}

			if (error.response.status === 401 && !originalRequest._retry) {
				// Code inside this block will refresh the auth token
				originalRequest._retry = true;
				const refreshToken = "xxxxxxx";
				return axios
					.post("/auth/token", {
						refresh_token: refreshToken,
					})
					.then((res) => {
						if (res.status === 201) {
							sessionStorage.setItem("token", res.data);
							axios.defaults.headers.common["Authorization"] =
								"Bearer " + sessionStorage.getItem("token");
							return axios(originalRequest);
						}
					});
			}
			return Promise.reject(error);
		}
	);
}
