import axios from "axios";
import config from "../config";

const GetProducts = async () => {
    try {
        const response = await axios.get(`${config.baseUrl}/products/getProducts`);
        console.log(response, "response");
        return response;
    } catch (error) {
        return error.response;
    }
};

const searchProductsByName = async (query) => {
    try {
        const response = await axios.get(`${config.baseUrl}/api/products/search`, {
            params: { q: query },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export default GetProducts;
export { searchProductsByName };
