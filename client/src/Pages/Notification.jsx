import React, { useContext, useEffect } from 'react';
import ServiceContext from '../Context/CreateContext/ServicesContext';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const { notification, getUnreadNotification, setNotification } = useContext(ServiceContext);
const navigate = useNavigate()
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getUnreadNotification();
        if (res && res.notifications) {
          setNotification(res.notifications);
        }
      } catch (err) {
        console.error('❌ Failed to fetch notifications:', err);
      }
    };

    fetchNotifications();
  }, [getUnreadNotification, setNotification]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-3 overflow-y-auto hide-scrollbar">
      <h2 className="text-lg font-semibold mb-2">🔔 Notifications</h2>

      {notification && notification.length > 0 ? (
        notification.map((e) => (
          <div
          onClick = {()=>{
            navigate(`/post/${e.post}`);
          }}
            key={e._id || e.id}
            className="w-full border border-gray-200 bg-white shadow rounded-lg px-4 py-3 text-sm text-gray-800 hover:shadow-md transition "
          >
            <div className="flex justify-between items-center">
              <span>{e.message}</span>
              {e.isRead ? (
                <span className="text-xs text-green-500">Read</span>
              ) : (
                <span className="text-xs text-red-500">Unread</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-sm">No notifications yet!</div>
      )}
    </div>
  );
};

export default Notification;
