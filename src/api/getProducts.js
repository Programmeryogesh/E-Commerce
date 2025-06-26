import axios from "axios";

const GetProducts = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/products/getProducts");
        console.log(response, "response");
        return response;
    } catch (error) {
        return error.response;
    }
};

const searchProductsByName = async (query) => {
    try {
        const response = await axios.get("http://localhost:5000/api/products/search", {
            params: { q: query },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export default GetProducts;
export { searchProductsByName };
