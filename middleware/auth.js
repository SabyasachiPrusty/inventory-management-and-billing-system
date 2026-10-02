const jwt = require("jsonwebtoken");

const SECRET = "inventory_secret_key";

function verifyToken(req,res,next){

const token = req.headers["authorization"];

if(!token){
return res.status(403).json({message:"No token provided"});
}

jwt.verify(token,SECRET,(err,decoded)=>{

if(err){
return res.status(401).json({message:"Invalid Token"});
}

req.user = decoded;

next();

});

}

module.exports = verifyToken;