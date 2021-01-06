import { Message } from "./message";

export interface User {


    notifications? : [
        { 
            senderId?  : String,
            message?  :String ,
            viewProfile? :Boolean  , 
            created? :Date,
            read?  :  Boolean ,
            date?  :String  ,
        }
    ], 
picVersion?:String, 
picId?:String,

images?:[{ 
    imgId? :String 
    imgVersion?: String
}],
    username : String
    email? :String,
    password? :String ,
    posts? : [ 
        { 
            postId? : User[], 
            post? : String 
            created?  : Date
        }
    ],
    following? :[ 
    {
      userFollowed? : User[],
    }
    ],
    followers?: [
        {follower? : User[],}
    ],
    chatList : [

        {
            receiverId :User,
            msgId :Message
        }
    ],
 

    country?: String ,
    city?: String,
    latitude? :String,
    longitude? :String ,

   
message? : String, 
receiverId :User,
msgId :Message,


senderId  : String,

viewProfile? :Boolean  , 

read  :  Boolean ,
date?  :any  ,
imgId? :any 
imgVersion?: any
postId? : User, 
post? : any 
created?  : any
userFollowed? : any,

follower? : User
_id :any , 

   
    
    

}
