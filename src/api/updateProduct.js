import axios from "axios";
import config from "../config";
const UpdateProducts = async (productId, data) => {
    console.log(data , "check data here");
    
    // Add user ID to the form data for notification purposes
    const userId = localStorage.getItem("userId");
    if (userId) {
        data.append("userId", userId);
    }
    
  try {
    const response = await axios.put(
      `${config.baseUrl}/products/updateProduct/${productId}`, // Use the correct URL
      data // Send data properly
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export default UpdateProducts;
