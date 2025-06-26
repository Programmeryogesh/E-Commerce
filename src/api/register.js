import axios from "axios";

const register = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/api/register", data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default register;
