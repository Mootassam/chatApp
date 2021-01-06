import { User } from "./user";

export interface Conversation {

    participants : [{ 
        senderId? : User[],
      receiverId? : User[],

    }]


}
