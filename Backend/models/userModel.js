const mongoose =require('mongoose'); 
var bcrypt = require('bcryptjs'); 

const userSchema = mongoose.Schema({ 

    username : { type : String}, 
    email : {type : String}, 
    password:{
        type:String,
       
    },  
    notifications : [
        { 
            senderId : { type : mongoose.Schema.Types.ObjectId, ref :'User'},
            message :{type :String },
            viewProfile:{type:Boolean  ,default : false}, 
            created:{type:Date , default: Date.now() },
            read : {type : Boolean , default:false},
            date :{type :String , default:''} ,
        }
    ], 
picVersion:{type:String,default:'user_jkfvwr.png'}, 
picId:{type:String,default:'1609332269'}, 

images:[{ 
    imgId:{type:String,default:''}, 
    imgVersion:{type:String,default:''}
}],
  
    posts : [ 
        { 
            postId : { type :mongoose.Schema.Types.ObjectId , ref : 'Post'}, 
            post : { type :String}, 
            created  :  { type : Date , default : Date.now() }
        }
    ],
    following :[ 
    {
      userFollowed : { 
            type :mongoose.Schema.Types.ObjectId , ref :'User'
        }
    }
    ],
    followers: [
        {follower : {
            type :mongoose.Schema.Types.ObjectId , ref :'User'
        }}
    ],
    chatList : [

        {
            receiverId :{ type : mongoose.Schema.Types.ObjectId, ref :'User'},
            msgId :{ type : mongoose.Schema.Types.ObjectId, ref :'Message'}
        }
    ],
 

country: {type :String , default : ''}, 
city: {type : String,default:''}, 
latitude :{type :String, default :''}, 
longitude :{type : String , default :''}, 

}); 


 
 userSchema.methods.comparePassword= function(candidatePassword,cb){ 
 bcrypt.compare(candidatePassword , this.password, function(err,isMatch){ 
 if(err) return cb(err); 
 cb(null,isMatch); 
     }); 
 }


module.exports = mongoose.model('User',userSchema )