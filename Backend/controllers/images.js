const cloudinary = require('cloudinary');
const userModel = require('../models/userModel');
const User = require('../models/userModel');

cloudinary.config({
      cloud_name: 'dxi9g49hn',
      api_key: '817262322543594',
      api_secret: 'vM6euTFtLXR1adcjWC0APltzUag'
    });

module.exports=  {

      UploadImage(req ,res) {

          cloudinary.uploader.upload(req.body.image , async result => {
                await User.update({_id : req.user.user._id},{ $push : {
                  images : {
                        'imgId' : result.public_id,
                        'imgVersion' : result.version
                  }
                }})
                .then(() => {
                      res.status(200).json({message : "Image Uploaded Successfully"})
              }).catch( err => res.status(400).json({message : "Error Uploading Image"}))

          })
      },


     async SetDefaultImage(req, res){

            const {imgId,imgVersion} = req.params
            await User.updateOne({_id : req.user._id},
      {
            'picVersion' : imgVersion,
            'picId' : imgId
      }).then(data => {
            res.status(200).json({message : "Profile image success modified" ,data})
      }).catch(err => console.log(err))


       }

}