import axios from "axios";
import { getAuth } from "firebase/auth";

const useAxiosSecure = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  instance.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const user = auth.currentUser();
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return instance;
};

export default useAxiosSecure;
