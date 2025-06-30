import axios from "axios";
import config from "../config";
const ForgotPasswordApi = async (data) => {
    try {
        const response = await axios.post(`${config.baseUrl}/auth/forgot-password`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default ForgotPasswordApi;
