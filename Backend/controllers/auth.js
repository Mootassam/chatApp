const Joi = require('joi'); 
const User = require('../models/userModel')
const Helpers = require('../Helpers/helpers'); 
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const dbconfig= require('../config/secret'); 

module.exports = { 


    async CreateUser(req, res) { 
        // const schema = Joi.object().keys({ 
        //     username :Joi.string().min(5).max(10).required(),
        //     email: Joi.string()
        //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), 
        //     password :Joi.string().min(5).required()
        // }); 
        // Joi.validate(req.body, schema, (err, value) => {

        //             if (err && err.details) {
        //     return  res.json({msg : err.details})

        //     } 
        //   });
// if(!req.body.email) { 
//     return res.status(500).json({message : "Write your email"}); 
// }
// else { 
//  userEmail = await User.findOne({email :req.body.email},function(req, err) { 
//     return res.status(500).json({message : 'Email already exist'}); 
// }); 
// }
// if(!req.body.username) { 
//     return res.status(500).json({message : "Write your username"})
//  } else { 
// userName = await User.findOne({username : req.body.username } , function(req,err) { 
//     return  res.status(500).json({message : ' username already exist'}); 
// }); 
// }

    var newUSer = User(req.body); 


    return bcrypt.hash(req.body.password, 10, (err,hash)=> {
        if(err){ 
            return res.status(500).json({message :"Error hashing password"}); 
        }
        const body = { 
            username : req.body.username , 
            email : req.body.email, 
            password: hash,
        };

        User.create(body).then((user)=>{         
            const token = jwt.sign({ user:user},dbconfig.secret , {expiresIn :'7h'} );         
            res.cookie('auth',token); 
           res.json({token :(token)});
           console.log(user);
            // res.status(200).json({message : "User created succefully",user})
        }).catch(err => { res.status(500).json({message : "Error Occured"})})
    })
    
    
    },
    async getUser (req, res){ 
       await User.findById(req.user.id, function(err,user){ 
            if(err){ 
                res.status(500).json(err); 
            }
            res.status(200).json(user);  
        })
     },

   async loginUser(req,res){ 
  
        if(!req.body.username ){ 
            return res.status(500).send({ "msg" : "You must set the username "}); 
         }
    
         if( !req.body.password){ 
            return res.status(500).send({ "msg" : "You must set the  password of the user"}); 
         }
    
       await User.findOne({ username : req.body.username}, function(err, user) { 
             if(err){ 
                 res.json(err); 
             }
             if(!user){ 
                 res.status(500).json({msg:"The User was not found"}); 
             }
             user.comparePassword(req.body.password, function(err,isMatch){ 
                 if(isMatch && !err){ 
              const token = jwt.sign({ user:user},dbconfig.secret , {expiresIn :'7h'} );         
              res.cookie('auth',token); 
             res.json({token :(token)});
                 }else{ 
                     res.status(500).json({msg :"The username or password is incorrect"}); 
                 }
  
             })

            
         })
    }

} 