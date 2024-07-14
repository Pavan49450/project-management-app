import axios from "axios";
import { url } from "../../constant";
import Cookies from "universal-cookie";

const API_URL = url.backendUrl;

export const getProjectsWithAdminId = async () => {
  const cookie = new Cookies();
  const adminId = cookie.get("id");

  try {
    const response = await axios.get(
      `${API_URL}/api/projects/admin/${adminId}`,
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
