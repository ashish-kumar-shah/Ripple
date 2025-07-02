import React, { useContext } from "react";
import ServiceContext from "../../Context/CreateContext/ServicesContext";
import CommentDisplay from "./Commnet/CommentDisplay";
import CommentInput from "./Commnet/CommentInput";

const CommnetField = ({ postid }) => {
  const { openCommnet, activePostId ,handleCommentForum } = useContext(ServiceContext);

  return (
    openCommnet && activePostId === postid && (
      <div className="w-full border flex flex-col absolute transition-transform duration-300 ease-linear transform -translate-y-80 bg-white rounded-t-lg h-80 z-30">
          {/* heading and close button */}

          <div className="w-full h-10  rounded-t-lg flex justify-center items-center border-b">
            <div className="heading w-full h-full  text-center">
                <p className="h-full w-full pt-1 font-semibold text-xl">Commnets</p>
            </div>
            <div className="h-full w-fit p-1  pt-1.5 cursor-pointer" onClick={  ()=> handleCommentForum(postid)} >
                <span className="material-symbols-outlined">
                    close
                </span>
            </div>
          </div>



          {/* comments display */}
          <div className="w-full h-full bg-gray-200 flex">
            <CommentDisplay postId={postid}/>
          </div>

          {/* add commnet */}
          <div className="w-full h-16 bg-white ">
            <CommentInput postId={postid}/>
          </div>
      </div>
    )
  );
};

export default CommnetField;
