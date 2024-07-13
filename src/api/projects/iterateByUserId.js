import axios from "axios";
import Cookies from "universal-cookie";
import { url } from "../../constant";

const iterateByUserId = async () => {
  const cookie = new Cookies();
  const userId = cookie.get("id");
  try {
    const response = await axios.get(
      `${url.backendUrl}/api/projects/iterate/${userId}`,

      {
        headers: {
          "authorization-token": `${cookie.get("auth-token")}`,
        },
      }
    );
    return response.data; // Assuming your API returns the created project data
  } catch (error) {
    console.error("Error creating project:", error);
    throw error; // You can handle this error in your React component
  }
};

export default iterateByUserId;
