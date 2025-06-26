import axios from "axios";

const checkout = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/api/products/checkout", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export default checkout; 