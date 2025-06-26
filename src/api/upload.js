import axios from "axios";

const Upload = async (data) => {
    // Add user ID to the form data for notification purposes
    const userId = localStorage.getItem("userId");
    if (userId) {
        data.append("userId", userId);
    }
    
    try {
        const response = await axios.post(`http://localhost:5000/api/products/upload`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default Upload;
