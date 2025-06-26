import axios from "axios";
import config from "../config";

const Upload = async (data) => {
    // Add user ID to the form data for notification purposes
    const userId = localStorage.getItem("userId");
    if (userId) {
        data.append("userId", userId);
    }
    
    try {
        const response = await axios.post(`${config.baseUrl}/products/upload`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default Upload;
