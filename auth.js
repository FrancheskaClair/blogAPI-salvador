const jwt = require("jsonwebtoken");

const secret = "BlogAPI";


//[SECTION] Token Creation
module.exports.createAccessToken = (user) => {
    const data = {
        id : user._id,
        email : user.email,
        username : user.username,
        isAdmin : user.isAdmin
    };
    return jwt.sign(data, secret, {});		
};


//[SECTION] Token Verification
module.exports.verify = (req, res, next) => {

    let token = req.headers.authorization;


    if(typeof token === "undefined"){
        return res.send({auth: "Failed. No Token"});
    } else {

        token = token.slice(7, token.length);

        jwt.verify(token, secret, function(err, decodedToken){
            if(err){
                return res.send({
                    auth: "Failed",
                    message: err.message
                });
            } else {

                req.user = decodedToken
                next();
            }
        })
    }
};


//[SECTION] Verify Admin

module.exports.verifyAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({
            auth: "Failed",
            message: "Action Forbidden"
        })
    }
};


// [SECTION] Error Handler
module.exports.errorHandler = (err, req, res, next) => {
    
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message: errorMessage,
            errorCode: err.code || 'SERVER_ERROR',
            details: err.details
        }
    });
};