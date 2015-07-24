'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    sku: {
        type: Number,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    updated: {
        type: Array
    }
});

/**
 * Validations
 */
ProductSchema.path('sku').validate(function (sku) {
    return !!sku;
}, 'sku cannot be blank');

ProductSchema.path('name').validate(function (name) {
    return !!name;
}, 'name cannot be blank');

ProductSchema.path('category').validate(function (category) {
    return !!category;
}, 'category cannot be blank');

ProductSchema.path('price').validate(function (price) {
    return !!price;
}, 'price cannot be blank');

mongoose.model('cart_products', ProductSchema);