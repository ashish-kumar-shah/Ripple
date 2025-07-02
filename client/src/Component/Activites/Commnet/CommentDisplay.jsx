import React,{useContext,useEffect} from 'react';
import Avtar from '../../Basic/Avtar';
import PostContext from '../../../Context/CreateContext/PostContext';
import { Link } from 'react-router-dom';

const CommentDisplay = ({postId}) => {
const {getCommnet,commnets,setComment} = useContext(PostContext)


useEffect(() => {
 getCommnet(postId).then((res)=>{
 
  
  setComment(res.comments)
 }).catch(err=>{
  setComment(null)
 })
}, [postId])





  return (
    <div className="w-full p-2 border-b flex flex-col items-start gap-3 bg-white overflow-y-auto hide-scrollbar">
    
{
  commnets &&  commnets.map(e=>{
    return (
      <div className="w-full h-fit flex gap-2 border-b p-1  pb-3">
        <Avtar
          value={e.user.avtar}
          piccss="w-8 h-8 rounded-full border object-cover aspect-sqaure"
          design={"w-8 h-8 aspect-square"}
        />

        {/* Text content */}
        <div className="flex flex-col">
          <Link to={`/profile/${e.user.username}`}>
            <span className="text-sm font-semibold text-gray-800">
              {e.user.username}
            </span>
          </Link>

          <p className="text-sm text-gray-700">{e.comment}</p>
        </div>
      </div>
    );
  })
}


    
    
    </div>
  );
};

export default CommentDisplay;
