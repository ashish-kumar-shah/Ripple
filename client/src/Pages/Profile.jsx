import React, { useContext, useEffect, useState } from "react";
import ShowUserDetails from "../Component/Profile/ShowUserDetails";
import UserPost from "../Component/Profile/UserPost";
import UserSaved from "../Component/Profile/UserSaved";
import { useParams } from "react-router-dom";
import UserContext from '../Context/CreateContext/UserContext'
import ServiceContext from '../Context/CreateContext/ServicesContext'




const Profile = () => {
  const {User} = useContext(UserContext)
  const {getUserProfile} = useContext(ServiceContext)
  const {username} = useParams();
 

  const [activeTab, setActiveTab] = useState("posts");
  const [userProfile,setUserProfile]= useState(null)
  

  

     


  // Load saved tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem("activeProfileTab");
    if (savedTab) setActiveTab(savedTab);
  }, []);

   useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getUserProfile(username);
      
      
      setUserProfile(data);
     
      
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  fetchProfile();
   // eslint-disable-next-line 
}, [username, User.user]);

if (userProfile === null) {
  return <div className="w-full h-full flex items-center justify-center text-lg">Loading...</div>;
}


  // Update localStorage when tab changes
  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    localStorage.setItem("activeProfileTab", tabKey);
  };


    const userTabs = [
      {
        key: "posts",
        label: "Posts",
        icon: "gallery_thumbnail",
        content: <UserPost post={userProfile.posts} />,
      },
      // {
      //   key: "saved",
      //   label: "Saved",
      //   icon: "bookmark",
      //   content: <UserSaved />,
      // },
      // Add more tabs below
      // {
      //   key: "tagged",
      //   label: "Tagged",
      //   icon: "person_pin",
      //   content: <TaggedComponent />,
      // },
    ];

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto hide-scrollbar">
      {/* User Info */}
      <div className="box-1 w-full h-fit p-1">
        <ShowUserDetails profile = {userProfile} />
      </div>

      {/* User Tabs */}
      <div className="user-personal-tabs w-full border-t">
        <ul className="flex justify-center gap-8 text-gray-600 text-sm font-medium">
          {userTabs.map((tab) => (
            <li
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 cursor-pointer transition-all duration-200 ${
                activeTab === tab.key
                  ? "text-blue-600 border-t-2 border-blue-600"
                  : "hover:text-blue-600 hover:border-blue-600 border-t-2 border-transparent"
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {userTabs.find((tab) => tab.key === activeTab)?.content || (
          <div>Tab content not found.</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
