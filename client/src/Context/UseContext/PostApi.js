import React, { useReducer,useState } from 'react'
import PostContext from '../CreateContext/PostContext'
import postReducer from "../../Hooks/Reducer/postReducer";
import {uploadPost,getPosts,handleLikePost,fetchLikePostByUser,handleCreateCommnet,getCommnet} from "../../API/PostApi";
const PostApi = ({children}) => {
  
    const intialPost ={
        post:null,
        loading:true,
        error:null
    }
    const [commnets,setComment] = useState(null)

    const [post, postDispatch] = useReducer(postReducer, intialPost);

  return (
    <PostContext.Provider value={{commnets,setComment, post, postDispatch ,uploadPost,getPosts,handleLikePost,fetchLikePostByUser,getCommnet ,handleCreateCommnet}}>
      {children}
    </PostContext.Provider>
  );
}

export default PostApi