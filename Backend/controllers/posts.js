const { json } = require("body-parser");
const Joi = require('joi'); 
const User = require('../models/userModel'); 
const request = require('request'); 
const Post = require('../models/postsModels'); 
module.exports =  { 


    async UpdateComment(req ,res){
console.log("commentId",req.body.commentId);
console.log("postId",req.body.postId);

  await Post.updateOne({ _id : req.body.postId, 'comments._id': req.body.commentId}
  ,{
      $set :{ 
          'comments.$.comment' : req.body.comment
      }
  }).then(()=>{ 
      res.status(200).json({message : "The Comment Has been Updated"})
  }).catch(err => { res.status(500).json({message : "The comment Not updated"})})
     },

    async GetComment(req, res){ 
        const {postId}= req.params
        await Post.findById({_id : postId}).sort({"comments.createdAt" : -1}).then(data => {
            return res.status(200).json({message : "all comment by ID :", data})
         }, err => console.log(err))
    },




    async DeletePost(req,res){
        console.log(req.user._id);
        try {
            const {id} = req.params ; 
            const result = await Post.findByIdAndRemove(id); 
           if(!result){ 
            res.json({message :"you cant delete this Post because we cannot find it "})
           }
           else { 
            await User.update({ _id :user.user._id }, 
                { $pull : { 
               posts : { postId : result._id}
            }
        })
           }
        } catch (error) {
            return res.json({message : error})
        }
      
      
    }, 

  async EditPost(req,res){ 
// console.log(req.body);
console.log(req.body);

const body = ({ 
    post : req.body.post,
    createdAt : new Date()
})
Post.findByIdAndUpdate({ _id  : req.body.id}, body ).then(post => { 
    res.json({message : " the post has been updated"}); 

})
.catch( err => { console.log(err);})

    },
    
    AddPost(req ,res) { 


        // const schema = Joi.object().keys( { 

        // })

        const body = { 
            user : req.user.user._id, 
            username : req.user.user.username, 
            post:req.body.post, 
            created : new Date()
        }; 

        Post.create(body).then(async(post) =>{
            await User.updateOne({_id : req.user.user._id}, {
                $push : { 
                    posts : {
                        postId :post._id , 
                        post :req.body.post,
                        created : new Date()

                    }
                }
            })
            res.json({message : "post created", post})
        })

        .catch(err => { 
            res.json({message : 'Error occured'}); 
        }); 

    },


    async GetAllPosts(req , res){ 

        try{ 
            const posts = await Post.find({})
            .populate('user').sort({createdAt : -1})

            const top = await Post.find({totalLikes : {$gte : 2 }})
            .populate('user').sort({createdAt : -1})


            const user = await User.findOne({_id : req.user.user._id}); 

            if(user.city === '' && user.country === ''){ 
                request('https://geoip-db.com/json/', { 
                    json:true
                }, async(req , res ,body)=> { 
                    await User.updateOne({_id : user._id},{ 
                        city : body.city, 
                        country : body.country_name, 
                        latitude : body.latitude, 
                        longitude : body.longitude,
                    })
                })
            }
            return res.json({message : 'All posts', posts , top})

        }
        catch(err){ 
return res.status(500).json({message : 'Error occured'})

        }
    },


   async addLike(req,res) { 

        const postId = req.body._id
        await Post.updateOne({ 
            _id:postId,  
            'likes.username':{$ne :req.user.user.username}
        } , { 
            $push : { likes : {
                username : req.user.user.username
            }},
            $inc:{ totalLikes :1}
        }).then (()=> { 
            res.json({message : 'You liked the post '})
        }).catch(err => 
            res.json({message : 'Error occured'})
        ); 

    }, 

    
    async addComment(req,res) { 

      
        const postId = req.body.postId

  
        await Post.updateOne({ 
            _id:postId,  
        } , { 
            $push : { comments : {
                userId : req.user.user._id,
                username : req.user.user.username, 
                comment : req.body.comment, 
                createdAt : new Date()

      
            }},
    
        }).then ((data)=> { 
            res.json({message : 'Comment added to post '}); 
        }).catch(err => 
            res.json({message : 'Error occured'})
        ); 

    }


}