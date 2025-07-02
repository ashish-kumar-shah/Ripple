import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ url, type ,id}) => {
  const navigate = useNavigate();
  return (
    <div className="w-80 h-80 overflow-hidden rounded-md  " onClick={()=>{
navigate(`/post/${id}`);
    }} >
      {type === "video" ? (
        <video
          src={url}
          preload="metadata"
        
          className=" top-0 left-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className=" top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${url})` }}
        />
      )}
    </div>
  );
};

export default Card;
