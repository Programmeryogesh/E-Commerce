import axios from "axios";
import { handleFCMTokenUpdate } from "./update-fcm-token";

const login = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", data);
        // if (response?.status === 200) {
        //     await handleFCMTokenUpdate(response.data.user.id);
        // }
        
        return response;
    } catch (error) {
        return error.response;
    }
};

export default login;
