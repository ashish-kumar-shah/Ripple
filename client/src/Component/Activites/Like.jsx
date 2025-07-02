import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/CreateContext/UserContext";
import PostContext from "../../Context/CreateContext/PostContext";

const Like = ({ postid }) => {
  const { User } = useContext(UserContext);
  const { fetchLikePostByUser, handleLikePost } = useContext(PostContext);

  const [isLiked, setLiked] = useState(false);

  useEffect(() => {
    fetchLikePostByUser()
      .then((res) => {
        const likedPost = res.likedPost || [];
        const found = likedPost.some(
          (like) => like.post === postid && like.user === User.user._id
        );
        setLiked(found);
      })
      .catch((err) => console.log(err));
  }, [postid, User.user._id, fetchLikePostByUser]);

  const handleLikeContent = () => {
    handleLikePost(postid)
      .then((res) => {
        setLiked(res.liked);
      })
      .catch((err) => console.log(err));
  };

  return (
    <span
      onClick={handleLikeContent}
      className="material-symbols-outlined cursor-pointer"
      style={{
        color: isLiked ? "red" : "black",
        fontVariationSettings: isLiked
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48"
          : undefined,
      }}
    >
      favorite
    </span>
  );
};

export default Like;
