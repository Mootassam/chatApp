
const Message = require('../models/messageModels'); 
const Conversation = require('../models/conversionModels'); 
const User = require('../models/userModel'); 
const Helpers = require('../Helpers/helpers'); 
module.exports ={ 
    SendMessage(req,res) { 
        const { sender_Id,receiver_Id} = req.params ; 

        Conversation.find(
            {
            $or: [
                {
                    participants: {
                        $elemMatch :{senderId : sender_Id , receiverId : receiver_Id}
                    }
                },
                {
                    participants : { 
                        $elemMatch : { senderId : receiver_Id, receiverId : sender_Id }
                    }
                }
            ]
        },
        async (err, result)=> { 
            console.log(result.length);
            if(result.length > 0 ){ 
                const msg = await Message.findOne({conversationId : result[0]._id}); 
                Helpers.updateChatlite(req , msg) 
                await Message.updateOne({
                    conversationId :result[0]._id
                },{
                    $push : { 
                            message : { 
                                senderId : req.user.user._id,
                                receiverId : req.params.receiver_Id,
                                sendername : req.user.user.username,
                                receivername : req.body.receiverName,
                                body : req.body.message
                            }
                    }
                }).then(()=> { 
                    res.json({message : 'Message added success'})
                }).catch(err => { 
                    res.json({message : 'Error Ocurred'})
                })
            }
            else { 
                const newConversation = new Conversation(); 
                newConversation.participants.push({ 
                    senderId : req.user.user._id, 
                    receiverId : req.params.receiver_Id
                }); 
                const saveConversation = await newConversation.save(); 
    
                const newMessage = new Message(); 
                newMessage.conversationId = saveConversation._id
                newMessage.sender = req.user.user.username
                newMessage.receiver = req.body.receiverName
                newMessage.message.push({

                    senderId : req.user.user._id,
                    receiverId : req.params.receiver_Id,
                    sendername : req.user.user.username,
                    receivername : req.body.receiverName,
                    body : req.body.message

                }); 
                await User.updateOne({ _id:req.user.user._id}, { 
                    $push : { 
                        chatList :{ 
                            $each :[
                                {
                                    receiverId : req.params.receiver_Id,
                                    msgId : newMessage._id
                                }
                            ],
                            $position : 0 

                        }
                    }
                })



                await User.updateOne({ _id:req.params.receiver_Id}, { 
                    $push : { 
                        chatList :{ 
                            $each :[
                                {
                                    receiverId : req.user.user.id,
                                    msgId : newMessage._id
                                }
                            ],
                            $position : 0 

                        }
                    }
                })




                await newMessage.save().then(()=> { 
                    res.json({message : 'Message Sent'})
                }).catch(err => { 
                    res.json({message : 'Error Ocurred'})
                })
            }
        } 
        
        
        
        )



     },



     async GetAllMessages(req ,res){ 
   
        const {sender_Id , receiver_Id}= req.params
        const conversation = await Conversation.findOne({
            $or : [
                {
                    $and :[
                        {'participants.senderId' : sender_Id} 
                      , {'participants.receiverId' : receiver_Id}
                    ]
                },
                {
                    $and :[
                        {'participants.senderId' : receiver_Id } 
                      , {'participants.receiverId' : sender_Id}
                    ]
                }
               
            ]
        }).select('_id')
        console.log('conversation:', conversation)
     
        if(conversation){ 
         
            const messages = await Message.findOne({conversationId : conversation._id});
          
            res.json({message : 'Messages returned', messages})
        }
        else { 
            return res.json({message : "null"})
            console.log("null");
        }
     }







}