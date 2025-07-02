const handleCreateComment = require("../Controller/Post/CreateCommnet");
const createPost = require("../Controller/Post/CreatePost");
const handleGetCommentsByPostId = require("../Controller/Post/fetchCommnets");
const getLikeOnPostbyUser = require("../Controller/Post/getLikeOnPost");
const getPost = require("../Controller/Post/GetPost");
const handleLikePost = require("../Controller/Post/handleLikePost");
const upload = require("../Middleware/Upload");
const { verifyToken } = require("../Utility/JWT");

const router = require("express").Router();




router.post('/createpost',upload.array('files',10),verifyToken,createPost)
router.get('/getposts/:page',verifyToken,getPost)
router.post('/likepost',verifyToken,handleLikePost)
router.get('/liked',verifyToken,getLikeOnPostbyUser)
router.post('/createcommnet',verifyToken,handleCreateComment)
router.get('/comment/:postId',verifyToken,handleGetCommentsByPostId)



module.exports = router;