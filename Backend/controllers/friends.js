const User = require('../models/userModel')
module.exports = { 
    
   async FollowUser(req,res){
        const followUser = async() => {
            await User.updateOne(
            {
                _id : req.user.user._id,
                "following.userFollowed" : {$ne : req.body.userFollowed}
            }, 
            {
               $push : { 
        following : { 
                        userFollowed : req.body.userFollowed
                    }
                }
            }
            ); 

            await User.updateOne({
                _id : req.body.userFollowed ,
                "following.follower" : {$ne : req.user.user._id}
            }, {
                $push : { 
                    followers : { 
                        follower : req.user.user._id
                    },
                    notifications : {
                            senderId: req.user.user._id,
                            message: `${req.user.user.username} is now following you` ,
                            viewProfile:  false,
                            created: new Date(),
                    }
                }
            })

            
        }
        followUser().then(() => {
            res.json({message : 'Following user now'})
        })
        .catch(err => { 
            res.json({message :'Error occured '}); 
         }); 

     },

     async UnFollowUser(req,res){
         console.log(req.body.userFollowed);
         console.log(req.user.user._id);
     const UnfollowUser = async() => {
        await User.updateOne(
        {
            _id : req.user.user._id,
        }, 
        {
           $pull : { 
    following : { 
                    userFollowed : req.body.userFollowed
                }
            }
        }
        ); 

        await User.updateOne({
            _id : req.body.userFollowed ,
        }, {
            $pull : { 
                followers : { 
                    follower : req.user.user._id
                }
            }
        })
        UnfollowUser().then(() => {
            res.status(200).json({message : 'Following user now'})
        })
        .catch(err => { 
            res.status(500).json({message :'Error occured '}); 
         }); 


        
    }
 
     }, 


     async MarkNotifications(req,res){ 
       
         if(!req.body.deleteVal){ 
            await User.updateOne({
                _id :req.user.user._id, 
                'notifications._id' : req.body.id
            },{
                $set:{'notifications.$.read': true}
            }).then(()=>{ 
                res.status(200).json({message : "Marked as Read"})
            }).catch(err => { res.status(500).json({message : "Error Occured"})
        })
         }else { 
             await User.updateOne({_id : req.user.user._id,
                'notifications._id' : req.body.id }, 
                {
                    $pull : { 
                        notifications : {_id :req.body.id}
                    }
                }).then(()=>{ 
                    res.status(200).json({message : "Deleted Succefully"}); 
                }).catch(err => { res.status(500).json({message : "Error Occured"}); 
         })
         
     }




 }, 




 async MarkAllNotifications(req,res){ 
    await User.updateOne({ _id : req.user.user._id}
       ,{
            $set : {'notifications.$[elem].read' : true}
        }, 
        {
            arrayFilters :[{'elem.read' : false}], multi : true
        }
    ).then(()=> { 
        res.status(200).json({message : "Marked all successfully"})
    }).catch(err => { 
        res.status(500).json({message : "Error Occured"}); 
    }); 
 }

}