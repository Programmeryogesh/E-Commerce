import axios from "axios";
import config from "../config";
const GetProductById = async (productId) => {
    try {
        const response = await axios.get(`${config.baseUrl}/products/getProductById/${productId}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default GetProductById;
