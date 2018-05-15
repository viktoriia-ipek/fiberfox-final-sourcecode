var baseController = require('./baseController');
var jwt = require('jsonwebtoken');

var userCtrl = function (app) {
    var post = function (req, res) {
        // TODO SQL INj
        var query = `select * from Users where Email='${req.body.email}' and Password='${req.body.password}' `;
        baseController.executeQuery(query)
            .then(result => {
                if (result && result.length == 1) {
                    if(!result[0].IsApproved){
                        res.json({
                            success: false,
                            message: 'User not approved yet!'
                        });
                    }
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(result[0], app.get('topSecret'), {});
                    //{ expiresInMinutes: 1440 // expires in 24 hours }

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        user: result[0]
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'User not found!'
                    });
                }
            }).catch(err => {
                console.log("Connection error" + err);
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            })
    }

    return {
        post: post
    };
};

module.exports = userCtrl;