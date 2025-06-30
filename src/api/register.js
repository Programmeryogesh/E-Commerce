import axios from "axios";
import config from "../config";
const register = async (data) => {
    try {
        const response = await axios.post(`${config.baseUrl}/auth/register`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default register;
