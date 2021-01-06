var express = require ('express'); 
const router = express.Router(); 
const PostCtrl = require('../controllers/posts'); 
const AuthHelper = require('../Helpers/AuthHelper'); 

router.post('/post/add-post',AuthHelper.verifyToken , PostCtrl.AddPost); 
router.get('/posts', AuthHelper.verifyToken, PostCtrl.GetAllPosts);
router.post ('/post/add-like', AuthHelper.verifyToken,PostCtrl.addLike );
router.post('/post/add-comment', AuthHelper.verifyToken,PostCtrl.addComment );
router.put('/post/edit-post',AuthHelper.verifyToken ,PostCtrl.EditPost);
router.delete('/post/delete-post/:id',AuthHelper.verifyToken, PostCtrl.DeletePost)
router.get('/get-comments/:postId',AuthHelper.verifyToken, PostCtrl.GetComment); 

router.put('/comment-update/',AuthHelper.verifyToken,PostCtrl.UpdateComment)

module.exports = router  ; 
