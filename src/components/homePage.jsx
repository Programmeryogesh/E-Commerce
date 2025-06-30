import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardProduct from "./producetdatails";
import GetProducts, { searchProductsByName } from "../api/getProducts";

const HomePage = () => {
  const [ProductData, setProductData] = useState();
  const searchQuery = useSelector(state => state.search.query);

  const handleGetProducts = async () => {
    try {
      const response = await GetProducts();
      if (response.status === 200) {
        console.log(response.data, "response");
        setProductData(response.data);
      } else {
        console.error("Failed to fetch products:", response.statusText);
      }
    } catch (error) {
      console.error("Get products failed:", error);
    }
  };

  const handleSearchProducts = async (query) => {
    try {
      const response = await searchProductsByName(query);
      if (response.status === 200) {
        setProductData(response.data);
      } else {
        setProductData([]);
      }
    } catch (error) {
      setProductData([]);
    }
  };

  const handleDeleteProduct = (deletedProductId) => {
    // Remove the deleted product from the local state
    setProductData(prevData => 
      prevData.filter(product => product.id !== deletedProductId)
    );
  };

  useEffect(() => {
    if (!searchQuery) {
      handleGetProducts();
    } else {
      handleSearchProducts(searchQuery);
    }
  }, [searchQuery]);

  return <>{ProductData && <CardProduct ProductData={ProductData} onDelete={handleDeleteProduct} />}</>;
};
export default HomePage;
