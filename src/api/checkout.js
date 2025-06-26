import axios from "axios";
import config from "../config";

const checkout = async (data) => {
  try {
    const response = await axios.post(`${config.baseUrl}/products/checkout`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export default checkout; 