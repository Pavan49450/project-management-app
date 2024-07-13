import axios from "axios";
import { url } from "../../constant";
import Cookies from "universal-cookie";

const API_URL = url.backendUrl;

export const getProjectsAPI = async () => {
  const cookie = new Cookies();
  const userId = cookie.get("id");

  try {
    const response = await axios.get(`${API_URL}/api/projects/user/${userId}`, {
      headers: {
        "authorization-token": `${cookie.get("auth-token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};
