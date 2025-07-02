import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../Context/CreateContext/UserContext";
import ServiceContext from "../../Context/CreateContext/ServicesContext";

const TabPanel = () => {
  const { User } = useContext(UserContext);
  const { notification } = useContext(ServiceContext);
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "Home", icon: "home", url: "/" },
    {
      name: "Profile",
      icon: "person",
      url: `/profile/${User?.user?.username}`,
    },
    { name: "Search", icon: "search", url: "/search" },
    { name: "Notific...", icon: "notifications", url: "/notification" },
    { name: "Feed", icon: "animated_images", url: "/feed" },
    { name: "Create", icon: "add_circle", url: "/createpost" },
    { name: "Setting", icon: "settings", url: "/setting" },
  ];

  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.url;

        return (
          <div
            key={tab.name}
            onClick={() => navigate(tab.url)}
            className={`
              cursor-pointer px-3 py-2 rounded flex flex-col items-center
              transition-all duration-200 ease-in-out
              ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}
            `}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "30px", fontWeight: 500 }}
            >
              {tab.icon}
            </span>
            {/*  */}
            {tab.icon === "notifications" &&
              notification !== null &&
              notification.length >
                0(
                  <div className="  absolute -translate-x-4 -translate-y-1.5 font-bold   bg-red-600 text-center w-4 h-4 rounded-full flex justify-center items-center text-white text-xs">
                    {notification.length}
                  </div>
                )}

            {/*  */}
            <span className="text-sm font-medium">{tab.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TabPanel;
