import axios from "axios";

const GetProductById = async (productId) => {
    try {
        const response = await axios.get("http://localhost:5000/api/products/getProductById/" + productId);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default GetProductById;
