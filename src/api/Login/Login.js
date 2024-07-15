import axios from "axios";
import { url } from "../../constant";

const API_URL = url.backendUrl;

export const loginAPI = async (email, password, isAdmin) => {
  let response;
  try {
    response = await axios.post(
      `${API_URL}/api/${isAdmin ? "admins" : "users"}/login`,
      {
        email,
        password,
      }
    );
    if (response.status === 200 || response.status === 201) {
      return {
        apiReturned: true,
        result: response.data,
      };
    } else {
      return {
        apiReturned: false,
        errorMsg: response.data?.response.msg || "An error occurred",
      };
    }
  } catch (error) {
    console.log(response);
    console.error(error.response.data.msg);
    return {
      apiReturned: false,
      errorMsg: error.response?.data.msg || "An error occurred",
    };
  }
};
