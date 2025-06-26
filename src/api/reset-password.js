import axios from "axios";

const ResetPasswordApi = async (data) => {
    
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/reset-password`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default ResetPasswordApi;
