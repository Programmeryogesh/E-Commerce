import axios from "axios";
import config from "../config";
const DeleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${config.baseUrl}/products/deleteProduct`,{params: { id: productId }});
        return response;
    } catch (error) {
        return error.response;
    }
};

export default DeleteProduct;
