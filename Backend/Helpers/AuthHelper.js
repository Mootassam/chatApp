 const jwt = require('jsonwebtoken'); 
 const dbconfig = require('../config/secret'); 

 module.exports = { 

    verifyToken : (req, res ,next) =>  { 

        if(!req.headers.authorization){ 
            return res.json({message :  " No Authorization"}); 
        }


        const token = req.cookies.auth || req.headers.authorization.split(' ')[1] ; 
        // console.log(token)
        
        if(!token) { 
            return res.json({ msg :" No token provided"}); 
        }

        return jwt.verify(token,dbconfig.secret, (err, decoded) =>  { 
            if(err){ 
                if(err.expiredAt < new Date()) { 
                    return res.json({msg : "Token has expired .Please login again", token:null }); 
                }
                next();  
            }
            req.user = decoded; 
            next(); 
        }); 
    }
 }; 