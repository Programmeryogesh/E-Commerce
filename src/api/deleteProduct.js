import axios from "axios";

const DeleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/products/deleteProduct`,{params: { id: productId }});
        return response;
    } catch (error) {
        return error.response;
    }
};

export default DeleteProduct;
