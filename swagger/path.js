module.exports = {
    // ==================================
    //  ======= Products APIs ==========
    // ==================================
    "/product": require('./api/product/create-list.json'),
    "/product/{id}": require('./api/product/get-one-update-delete.json'),
    
};