import axios from "axios";

const ForgotPasswordApi = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/forgot-password", data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default ForgotPasswordApi;
