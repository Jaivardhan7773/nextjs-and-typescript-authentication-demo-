import axios , {AxiosInstance} from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if(!API_URL) {
    throw new Error("NEXT_PUBLIC_VITE_URL there is no such thing like that found in .env")
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL:`${API_URL}/api`,
    withCredentials:true,
});

export default axiosInstance;