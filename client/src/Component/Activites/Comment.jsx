import React, { useContext } from "react";
import ServiceContext from "../../Context/CreateContext/ServicesContext";

const Comment = ({ postid }) => {
  const { handleCommentForum } = useContext(ServiceContext);
  return (
    <span
      className="material-symbols-outlined cursor-pointer"
      onClick={() => handleCommentForum(postid)}
    >
      chat_add_on
    </span>
  );
};

export default Comment;
