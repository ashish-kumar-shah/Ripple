import React, { useState, useContext } from 'react';
import PostContext from '../../../Context/CreateContext/PostContext';
import UserContext from '../../../Context/CreateContext/UserContext';

const CommentInput = ({ postId }) => {
  const { User } = useContext(UserContext);
  const { handleCreateCommnet, commnets, setComment } = useContext(PostContext);
  const [comment, setCommentInput] = useState('');

  const handleSubmit = () => {
    if (comment.trim() === '') return;

    const data = { post: postId, comment };

    handleCreateCommnet(data)
      .then((res) => {
        const newComment = {
          comment,
          post: postId,
          user: {
            username: User.user.username,
            avtar: User.user.avtar,
          },
        };
        commnets === null
          ? setComment([newComment])
          : setComment((prev) => [newComment, ...prev]); // prepend for newest first
      })
      .catch((err) => {
        console.log(err);
      });

    setCommentInput('');
  };

  return (
    <div className="w-full p-2 bg-white flex items-center gap-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setCommentInput(e.target.value)}
        className="flex-1 h-10 px-4 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
        placeholder="Write a comment..."
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full transition"
      >
        Send
      </button>
    </div>
  );
};

export default CommentInput;
