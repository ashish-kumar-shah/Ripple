import React, { useContext, useEffect } from "react";
import UserContext from "../Context/CreateContext/UserContext";
import ServiceContext from "../Context/CreateContext/ServicesContext"; // ✅ make sure you import this
import TabPanel from "../Component/SideBar/TabPanel";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import Socket from "../Socket";

const Layout = () => {
  const { useIsMobile, User } = useContext(UserContext);
  const { setNotification } = useContext(ServiceContext);
  const IsMobile = useIsMobile();

  useEffect(() => {
    if (!Socket.connected) {
      Socket.connect();
    }

    Socket.once("connect", () => {
     
      Socket.emit("register", User.user._id);
    });

    const handleNotification = (data) => {
    
      setNotification((prev) => [...(prev || []), data]);
    };

    Socket.on("notification", handleNotification);

    return () => {
      Socket.off("notification", handleNotification);
      Socket.off("connect");
    };
  }, [User.user._id, setNotification]);

  return (
    <div className="w-full h-screen flex flex-col">
      {IsMobile && (
        <div className="section1 w-full h-20 border flex">
          <TopBar />
        </div>
      )}
      <div className="section2 w-full h-full border flex">
        {!IsMobile && (
          <div className="box-1 h-full w-20 border flex flex-col">
            <div className="w-full h-20 flex justify-center items-center">
              <span className="text-5xl font-bold text-orange-600 drop-shadow-lg font-serif">
                R
              </span>
            </div>
            <TabPanel />
          </div>
        )}

        <div className="box-2 h-full w-full border flex">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
