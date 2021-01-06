const joi = require('joi'); 
const moment = require('moment'); 
const bcrypt = require('bcryptjs'); 
const User = require('../models/userModel'); 

module.exports =  { 


  async  ChangePassword(req,res){ 
        const user  = await User.findOne({_id : req.user.user._id}); 
        
        return bcrypt.compare(req.body.cpassword, user.password).then(async (result) => { 
            if(!result){ 
                return res.status(500).json({message : "Current Password is Incorrect"})
            }

            const newpassword = await User.EncryptPassword(req.body.newPassword); 
            await User.updateOne({_id : req.user.user._id}, {
                password : newpassword
            }).then(result => { 
                res.status(200).json({message :" the password has been changed"})
            }).catch(err => {res.status(500).json({message : "Error When changing Password "})})
        })
    }, 
    async GetAllUsers(req,res){ 


        await User.find({})
        .populate('posts.postId')
        .populate('following.userFollowed')
        .populate('followers.follower')
        .populate('chatList.receiverId')
        .populate('chatList.msgId')
        .then((result)=> { 
            res.status(200).send({message : "all users ", result}); 

        }).catch(err => { 
            res.status(500).send({message : " Error occured"}); 
        })
    },

    async GetUser(req,res){ 
     
        await User.findOne({ _id : req.params.id })
        .populate('posts.postId')
        .populate('following.userFollowed')
        .populate('followers.follower')
        .populate('chatList.receiverId')
        .populate('chatList.msgId')
        .then((result)=> { 
     res.status(200).send({message : "User By Id", result}); 

        }).catch(err => { 
     res.status(500).send({message : " Error occured"}); 
     
        })
        
    },


    async GetUserName(req,res){ 
     
        await User.findOne({ username : req.params.username })
        .populate('posts.postId')
        .populate('following.userFollowed')
        .populate('followers.follower')
        .populate('chatList.receiverId')
        .populate('chatList.msgId')
        .then((result)=> { 
     res.status(200).send({message : "User By Name", result}); 

        }).catch(err => { 
     res.status(500).send({message : " Error occured"}); 

        })
        
    },
}