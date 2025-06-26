export const setProducts = (products)=>({
    type:"SET_PRODUCTS",
    payload: products,
});



export const handleIncreaseQuantity = (productsId)=>({
    type:"INCREASE_QUANTITY",
    payload: productsId,
});


export const handleDecreaseQuantity = (productsId)=>({
    type:"DECREASE_QUANTITY",
    payload: productsId,
});


export const removeFormCart = (productsId)=>({
    type:"REMOVE_FORM_CART",
    payload: productsId,
});

export const setSearchQuery = (query) => ({
    type: "SET_SEARCH_QUERY",
    payload: query,
});