import { useEffect, useState } from 'react';
import { IoNotifications } from "react-icons/io5";

const NotificationManage = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/notifications', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const unreadNotifications = data.notifications.filter((notification) => !notification.read);
        setUnreadCount(unreadNotifications.length);
      } catch (err) {
        console.error('Error fetching notifications:', err.message);
        setError('Failed to load notifications. Please try again later.');
      }
    };

    fetchNotifications();
  }, []);

  const handleIconClick = () => {
    setUnreadCount(0); // Clear the unread count on icon click
  };

  return (
    <div className="relative inline-block">
      <span
        className="text-yellow-500 hover:text-red-500 cursor-pointer transition-all"
        onClick={handleIconClick}
      >
        <IoNotifications
          className="inline-block mr-2 transition-transform transform hover:scale-110 duration-200 ease-in-out"
          size={28}
        />
      </span>
      {unreadCount > 0 && (
        <span className="absolute bottom-2 right-0 bg-red-600 text-white rounded-full text-xs font-bold px-2 py-1">
          {unreadCount}
        </span>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default NotificationManage;
