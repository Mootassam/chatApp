const express = require('express'); 
const router = express.Router(); 
const UserCtrl = require('../controllers/users'); 
const AuthHelpers = require('../Helpers/AuthHelper'); 


router.get('/users', AuthHelpers.verifyToken , UserCtrl.GetAllUsers); 
router.get('/users/:id', AuthHelpers.verifyToken , UserCtrl.GetUser); 
 router.get('/users/name/:username', AuthHelpers.verifyToken , UserCtrl.GetUserName); 
router.post('/change-password',AuthHelpers.verifyToken, UserCtrl.ChangePassword)


module.exports = router