import React from "react";
import Card from "./Card";

const UserPost = ({ post }) => {
  return (
    <div className="w-full h-full p-4 flex items-center justify-between">
      <div className="flex flex-wrap gap-1 w-full items-center justify-center ">
        {post.map((p) => {
          return (
            <Card
              key={p._id}
              url={p.content[0].url}
              type={p.content[0].type}
              id={p._id}
            />
          );
        })}
        {
          post.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <p className="text-gray-500 text-xl">Create New Post</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default UserPost;
