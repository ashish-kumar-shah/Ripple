const getFriendLists = require("../Controller/Services/getFriendList");
const getPostById = require("../Controller/Services/getPostById");
const handleFriend = require("../Controller/Services/HandleFriends");
const { getUnreadNotifications, markNotificationRead } = require("../Controller/Services/Notifications");
const searchUser = require("../Controller/Services/SearchQuery");
const handleUserProfile = require("../Controller/Services/UserProfile");
const uploadProfileAvatar = require("../Controller/User/UpdateAvtar");
const { verifyToken } = require("../Utility/JWT");
const upload = require("../Middleware/Upload");
const handleUpdateField = require("../Controller/Services/HandleUpdateField.");

const router = require("express").Router();



router.get('/profile/:username',verifyToken,handleUserProfile)
router.get('/searchuser',verifyToken,searchUser);
router.post('/createfriend',verifyToken,handleFriend)
router.get('/friendlist',verifyToken,getFriendLists);


// 
router.get('/notifications',verifyToken,getUnreadNotifications);
router.get('/mark/:id',verifyToken,markNotificationRead)

router.get('/getpostbyid/:postId',verifyToken,getPostById)

router.patch('/updateavtar',verifyToken,upload.single('file'),uploadProfileAvatar)
router.patch('/updatefields',verifyToken,handleUpdateField)


module.exports = router