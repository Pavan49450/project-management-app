import axios from "axios";
import { url } from "../../constant";
import Cookies from "universal-cookie";
const API_URL = url.backendUrl;
export const editProjectWithUserId = async (projectId, body) => {
  const cookie = new Cookies();

  try {
    const response = await axios.put(
      `${API_URL}/api/projects/${projectId}`,

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
