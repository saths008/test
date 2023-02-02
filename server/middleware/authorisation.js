const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = async(req,res,next) => {
    try{

        //1) Check if they even have a jwttoken
        const jwtToken = req.header("token");

        if(!jwtToken){
            return res.status(403).json("Not Authorised")
        }

        //2) Check if token is valid
        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        //we set a payload for the jwttoken of user_id, we are now
        //setting this payload to be the user id of the request.
        req.user = payload.user;
    }
    catch(err){
        console.error(err.message);
        return res.status(403).json("Not Authorised")
    }
}