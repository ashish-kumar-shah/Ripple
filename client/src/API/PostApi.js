import axios from "axios";


const API = axios.create({
  baseURL: '/api/user/post',
  withCredentials: true,
});

export const uploadPost = async (formData, onProgress) => {
  try {
    const response = await API.post("/createpost", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: function (progressEvent) {
        const total = progressEvent.total;
        const current = progressEvent.loaded;

        if (total) {
          const percentCompleted = Math.round((current * 100) / total);
           // 🔍 Check if this logs
          if (onProgress) onProgress(percentCompleted);
        }

      },
    

    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPosts = async (page) => {
  try {
    const response = await API.get(`/getposts/${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleLikePost = async (postId) => {
  try {
    const response = await API.post("/likepost", { postId });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchLikePostByUser = async () => {
  try {
    const response = await API.get("/liked");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const handleCreateCommnet = async (data)=>{
  try {
    const response = await API.post('/createcommnet',data);
    return response.data
  } catch (error) {
    console.log('Commnet error ',error);
    throw error
  }
}


export const getCommnet = async (postId)=>{
  try {
    const response = await API.get(`/comment/${postId}`,);
    return response.data
  } catch (error) {
    console.log('Commnet error ',error);
    throw error
  }
}