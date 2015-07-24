/**
 * Cart
 *
 * Author(s):
 * Brock Fredin <brockf12@gmail.com>
 */

var mongoose = require('mongoose'),
    Products = mongoose.model('cart_products'),
    async = require('async'),
    config = require('meanio').loadConfig(),
    crypto = require('crypto'),
    extend = require('util')._extend,
    nodemailer = require('nodemailer'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken');

/**
 *
 * @param Cart
 * @returns {{createProduct: createProduct, fakeProducts: fakeProducts, allProducts: allProducts, productById: productById, productsByCategory: productsByCategory, productsBySku: productsBySku, updateProduct: updateProduct, destroyProduct: destroyProduct}}
 */
module.exports = function (Cart) {

    return {

        /**
         * POST - Create a New Product
         *
         * @param req
         * @param res
         * @param next
         */
        createProduct: function (req, res, next) {

            var body = req.body;

            var productData = {
                sku      : body.sku,
                name     : body.name,
                category : body.category,
                price    : body.price,
                updated  : [new Date()]
            };

            Products.create(productData, function (error, data) {
                var response = {
                    success: 1,
                    brockData   : data
                };

                res.set({'Content-Type': "application/json"});
                res.send(JSON.stringify(response));

            });
        },

        /**
         * GET - fake data
         * @param req
         * @param res
         * @param next
         */
        fakeProducts: function (req, res, next) {

            var productData = {
                "sku": "123",
                "name": "ABC",
                "category": "Whack Cat bro",
                "price": "12.12",
                "updated": "1234"
            };

            Products.create(productData, function (error, data) {
                var response = {
                    success: 1,
                    brockData   : data
                };

                res.set({'Content-Type': "application/json"});
                res.send(JSON.stringify(response));

            });
        },

        /**
         * GET - All Products
         * @param req
         * @param res
         * @param next
         */
        allProducts: function (req, res, next) {
            Products.find({}, function (error, data) {

                if(error) {
                    console.log("error with [allProducts]" + error);
                }

                console.log("fetching all products" + data);

                var response = {
                    success: 1,
                    brockData: data
                };

                res.set({'Content-Type': "application/json"});
                res.send(JSON.stringify(response));
            });
        },

        /**
         * GET - Product By Id
         * @param req
         * @param res
         * @param next
         */
        productById: function (req, res, next) {
            var id = req.param('id');

            Products.find(id, function (error, data) {

                if(error) {
                    console.log("error with [productById]" + error);
                }

                console.log("fetching productById" + data);

                var response = {
                    success: 1,
                    brockData: data
                };

                res.set({'Content-Type': "application/json"});
                res.send(JSON.stringify(response));
            });
        },

        /**
         * GET - Products By Category
         * @param req
         * @param res
         * @param next
         */
        productsByCategory: function (req, res, next) {
            var category = req.param('category');

            Products.find({category : category}, function (error, data) {

                if(error) {
                    console.log("error with [productsByCategory]" + error);
                }

                console.log("fetching productsByCategory" + data);

                var response = {
                    success: 1,
                    brockData: data
                };

                res.set({'Content-Type': "application/json"});
                res.send(JSON.stringify(response));
            });
        },

        /**
         * GET - Products By SKU
         * @param req
         * @param res
         * @param next
         */
        productsBySku: function (req, res, next) {
            var sku = req.param('sku');

            Products.find({sku : sku}, function (error, data) {

                if(error) {
                    console.log("error with [productsBySku]" + error);
                }

                console.log("fetching productsBySku" + data);

                var response = {
                    success: 1,
                    brockData: data
                };

                res.set({'Content-Type': "application/json"});
                res.send(JSON.stringify(response));
            });
        },

        updateProduct: function (req, res, next) {

            var body = req.body;

            var productData = {
                sku      : body.sku,
                name     : body.name,
                category : body.category,
                price    : body.price,
                updated  : [new Date()]
            };

            for (var key in productData) {
                var value = productData[key];

                if (value == undefined) {
                    value = "";
                    console.log(value);
                }
            }

            Products.updateProduct(req.params.id, productData, function (error, data) {

                var response = {
                    success: 1,
                    brockData   : data
                };

                res.set({'Content-Type': "application/json"});
                res.send(JSON.stringify(response));
            });
        },

        /**
         * DELETE - Delete Product
         * @param req
         * @param res
         * @param next
         * *
         */
        destroyProduct: function (req, res, next) {

            var id = req.param('id');

            Products.remove(id, function (error, data) {

                var response = {
                    success: 1,
                    brockData   : data
                };

                res.set({'Content-Type': "application/json"});
                res.send(JSON.stringify(response));

            });
        }
    }
};