'use strict';

var config = require('meanio').loadConfig();

module.exports = function (Cart, app, passport, db) {

    // Lets add in our controllers
    var products = require('../controllers/products')(Cart);

    app.route('/api/products/').get(products.allProducts);
    app.route('/api/products/fakeData').get(products.fakeProducts);
    app.route('/api/products/').post(products.createProduct);
    app.route('/api/products/:id').get(products.productById);
    app.route('/api/products/sku/:sku').get(products.productsBySku);
    app.route('/api/products/category/:category').get(products.productsByCategory);
    app.route('/api/products/:id').delete(products.destroyProduct);
    app.route('/api/products/:id').put(products.updateProduct);
};
