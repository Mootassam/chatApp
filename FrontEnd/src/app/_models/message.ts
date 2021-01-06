import { Conversation } from "./conversation";
import { User } from "./user";

export interface Message {
    conversationId? : Conversation[] ,
    sender? :String,
    receiver? : String, 
    message : [
        {
            senderId? : User[], 
            receiverId? : User[], 
            sendername? : String , 
            receivername? : String, 
            body? : String , 
            isRead? :Boolean , 
            createdAt? :Date
        }
    ]



}
