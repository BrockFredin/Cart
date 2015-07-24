/**
 * Cart
 *
 * Author(s):
 * Brock Fredin
 */


var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    config = require('meanio').loadConfig(),
    http = require('http'),
    async = require('async');


module.exports = function (passport, Cart, db) {

    // Serialize the user id to push into the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id: id
        }, '-salt -hashed_password', function (err, user) {
            done(err, user);
        });
    });

    passport.use('cartFacebook', new LocalStrategy(function (username, password, done) {

            https.get({
                host: 'graph.facebook.com',
                path: '/me?fields=id&access_token=' + password
            }, function (response) {

                if ( typeof response.client == 'undefined' && !response.client.authorized) {
                    // if it sucks ...
                    return done(null, false, {
                        message: 'Invalid facebook token'
                    });
                }
                // if it's good..
                // create or find user from facebook id
                async.parallel([
                    function (callback) {
                        cust.findOrCreateByFacebookId(profile.id, profile, callback);
                        cart.findCreateByFacebookId(response.id, callback);
                    }
                ], function (err, results) {
                    if (typeof results == 'object' && results.length > 0) {
                        var customer = results[0];
                        console.log('Logging in Customer via FB [' + customer.FirstName + " " + customer.LastName + '] [' + customer._id + ']');
                        done(null, {
                            id          : customer._id,
                            name        : customer.FirstName + " " + customer.LastName,
                            firstName   : customer.FirstName,
                            lastName    : customer.LastName,
                            username    : customer.credentials.username,
                            email       : customer.Email,
                            facebookid  : profile.id,
                            accessToken : accessToken,
                            refreshToken: refreshToken,
                            isCustomer  : true,
                            isPro       : false
                        });
                    } else {
                        console.log('Internal Server error!  Unable to assume, create or append profile for facebook');
                        done(null, false, { message: 'Incorrect username or password.' });
                    }
                });
            });
        }
    ));

    return passport;
};
