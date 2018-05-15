var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var routes = function (app) {

    var adminRouter = express.Router();
    adminRouter.use('/', function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('topSecret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    if (!decoded.IsAdmin) {
                        return res.json({ success: false, message: 'Access denied. Only Admins here...' });
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        //console.log('----decoded----', decoded);
                        next();
                    }
                }
            });

        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    return adminRouter;
};

module.exports = routes;