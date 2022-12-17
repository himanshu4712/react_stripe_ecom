// price_1MDZA4FkWdN0kgYvMfWAbDMF

// price_1MDZBnFkWdN0kgYvh8RIlW31

// price_1MDZCXFkWdN0kgYvMu3fRFM0


const productsArray = [
    {
        id: "price_1MDZA4FkWdN0kgYvMfWAbDMF",
        title: "Coffee",
        price: "4.99"
    },
    {
        id: "price_1MDZBnFkWdN0kgYvh8RIlW31",
        title: "Sunglasses",
        price: "9.99"
    },
    {
        id: "price_1MDZCXFkWdN0kgYvMu3fRFM0",
        title: "Camera",
        price: "38.99"
    },
]

function getProductData(id) {
    let productData = productsArray.find((product) => product.id === id);

    if (productData === undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }
    return productData;
}

export { productsArray, getProductData };