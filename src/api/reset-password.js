import axios from "axios";
import config from "./config";

const ResetPasswordApi = async (data) => {
    
    try {
        const response = await axios.post(`${config.baseUrl}/auth/reset-password`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default ResetPasswordApi;
