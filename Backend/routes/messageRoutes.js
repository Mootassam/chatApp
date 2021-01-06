const express = require('express'); 
const router = express.Router(); 
const MessageCtrl = require('../controllers/message'); 
const AuthHelpers = require('../Helpers/AuthHelper'); 


router.post('/chat-messages/:sender_Id/:receiver_Id', AuthHelpers.verifyToken , MessageCtrl.SendMessage); 
router.get('/chat-messages/:sender_Id/:receiver_Id', AuthHelpers.verifyToken , MessageCtrl.GetAllMessages); 



module.exports = router