import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "/api/user/services",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserProfile = async (username) => {
  try {
    const response = await API.get(`/profile/${username}`);
    // console.log(response);

    return response.data.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const searchUserByQuery = async (query) => {
  if (!query) return [];

  try {
    const response = await API.get(
      `/searchuser?q=${encodeURIComponent(query)}`
    );
    if (response.data.success) {
      return response.data.data; // list of matching users
    } else {
      console.error("Search failed:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

export const friendRequest = async (following) => {
  try {
    const response = await API.post("/createfriend", { following });

    // Optional: check response status (if not handled by axios interceptor)
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data?.message || "Something went wrong");
    }

    return response.data; // { success: true, message: 'Followed successfully.' }
  } catch (error) {
    console.error("Friend request failed:", error);

    // Handle axios error shape properly
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Request failed");
    }

    throw error; // fallback
  }
};

export const getFriendLists = async () => {
  try {
    const response = await API.get("/friendlist");
    return response.data; // { success: true, followers: [...], following: [...] }
  } catch (error) {
    console.error("Error fetching friend list:", error);
    throw error;
  }
};

export const getUnreadNotification = async () => {
  try {
    const response = await API.get("/notifications");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markNotificationRead = async (id) => {
  try {
    const response = await API.get(`/mark/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await API.get(`/getpostbyid/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};




export const updateAvtar = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await API.patch("/updateavtar", formData,{
       headers: { "Content-Type": "multipart/form-data" },
    }); // ✅ No manual Content-Type!

    return response.data;
  } catch (error) {
    console.log('Error while uploading avatar:', error);
    throw error;
  }
};



export const updateFields = async (data)=>{
try {
  const response = await API.patch("/updatefields", data);
  return response.data;
} catch (error) {
  console.log('error while upload', error);
  
}
}