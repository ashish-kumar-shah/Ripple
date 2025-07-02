const Like = require('../../Models/Likes');


const getLikeOnPostbyUser = async(req,res)=>{
try {
    const user = req.userId;
    const postLikedbyuser  = await Like.find({user:user});
    if(!postLikedbyuser) return res.status(200).json({likedPost:[]})
     return   res.status(200).json({likedPost:postLikedbyuser})

} catch (error) {
    return res.status(500).json(error)
}
}


module.exports = getLikeOnPostbyUser