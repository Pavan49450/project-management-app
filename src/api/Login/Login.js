import axios from "axios";
import { url } from "../../constant";

const API_URL = url.backendUrl;

export const loginAPI = async (email, password, isAdmin) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/${isAdmin ? "admins" : "users"}/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};
