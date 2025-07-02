import React,{useContext} from "react";
import UserName from "../Basic/UserName";
import Avtar from "../Basic/Avtar";
import FollowButton from "../Basic/FollowButton";
import UserContext from "../../Context/CreateContext/UserContext";
const ShowUserDetails = ({profile}) => {
  const {User}  = useContext(UserContext)
 
  




  const stats = [
    { name: "Posts", count: profile?.postCount || 0 },
    { name: "Followers", count:  profile?.followerCount || 0 },
    { name: "Following", count:  profile?.followingCount || 0 },
  ];


  return (
    <div className="w-full flex items-center gap-6 p-4 justify-center">
      {/* Avatar */}
      <div className="w-24 h-24 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gray-200 overflow-hidden aspect-square shrink-0 border">
        <Avtar value={profile?.avatar} />
      </div>

      {/* User Info */}
      <div className="flex flex-col justify-between h-full gap-2 ">
        {/* Username */}
        <div className="w-full h-full flex justify-between items-center">
          <UserName value={profile.username} />

          {User?.user?._id !== profile._id && <FollowButton following={profile._id} />}
          
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-center ">
          {stats.map((item, index) => (
            <div
              key={index}
              className=" w-fit p-0.5 flex  justify-center items-center gap-1 flex-col sm:flex-row"
            >
              <p className="font-bold text-lg relative -top-[2px] ">
                {item.count}
              </p>
              <p className="text-sm text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>

        {/* Name & Bio */}
        <div>
          <p className="font-medium">{profile.name}</p>
          <p className="text-sm text-gray-500">
            {
              profile.bio
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowUserDetails;
