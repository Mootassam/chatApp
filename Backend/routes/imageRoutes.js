const express = require('express'); 
const router = express.Router(); 
const ImageCtrl = require('../controllers/images'); 
const AuthHelpers = require('../Helpers/AuthHelper'); 

router.get('/set-default-image/:imgId/:imgVersion', AuthHelpers.verifyToken, ImageCtrl.SetDefaultImage)

router.post('/upload-image', AuthHelpers.verifyToken , ImageCtrl.UploadImage); 


module.exports = router