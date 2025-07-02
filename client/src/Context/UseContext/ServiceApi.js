import React, { useState } from "react";
import ServiceContext from "../CreateContext/ServicesContext";
import {
  getUserProfile,
  searchUserByQuery,
  friendRequest,
  getFriendLists,
  getUnreadNotification,
  markNotificationRead, getPostById,updateAvtar,updateFields
} from "../../API/Services.api";

const ServiceApi = ({ children }) => {
  const [openCommnet, setCommnet] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleCommentForum = (postId) => {
    // Toggle for same post, else open new
    if (openCommnet && activePostId === postId) {
      setCommnet(false);
      setActivePostId(null);
    } else {
      setCommnet(true);
      setActivePostId(postId);
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        getUserProfile,
        openCommnet,
        activePostId,
        handleCommentForum,
        searchUserByQuery,
        friendRequest,
        getFriendLists,
        notification,
        setNotification,
        getUnreadNotification,
        markNotificationRead,
        getPostById,updateAvtar,updateFields
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceApi;
