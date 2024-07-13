import axios from "axios";
import { url } from "../../constant";
import Cookies from "universal-cookie";
const API_URL = url.backendUrl;
export const createProject = async (body) => {
  const cookie = new Cookies();

  try {
    const response = await axios.post(
      `${API_URL}/api/projects`,

      body,
      {
        headers: {
          "authorization-token": `${cookie.get("auth-token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};
