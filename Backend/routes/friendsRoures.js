const express = require('express'); 
const router = express.Router(); 
const FriendCtrl = require('../controllers/friends'); 
const AuthHelpers = require('../Helpers/AuthHelper'); 


router.post('/follow-user', AuthHelpers.verifyToken , FriendCtrl.FollowUser); 
router.post('/unfollow-user', AuthHelpers.verifyToken , FriendCtrl.UnFollowUser); 
router.post('/mark/:id', AuthHelpers.verifyToken, FriendCtrl.MarkNotifications)
router.post('/mark-all', AuthHelpers.verifyToken, FriendCtrl.MarkAllNotifications)

module.exports = router