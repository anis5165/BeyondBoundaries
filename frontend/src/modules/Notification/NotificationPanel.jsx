'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const NotificationPanel = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const { currentMember } = useAuth();

    useEffect(() => {
        if (currentMember) {
            fetchNotifications();
        }
    }, [currentMember]);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/notifications/${currentMember._id}`);
            setNotifications(response.data);
            setUnreadCount(response.data.filter(n => !n.read).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`http://localhost:5000/notifications/${notificationId}/read`);
            setNotifications(notifications.map(n => 
                n._id === notificationId ? { ...n, read: true } : n
            ));
            setUnreadCount(prev => prev - 1);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div className="relative">
            <div className="max-h-96 overflow-y-auto rounded-lg shadow-lg bg-white">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </h3>
                </div>
                
                <div className="divide-y">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            No notifications
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div 
                                key={notification._id}
                                className={`p-4 hover:bg-gray-50 cursor-pointer ${
                                    !notification.read ? 'bg-blue-50' : ''
                                }`}
                                onClick={() => !notification.read && markAsRead(notification._id)}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className={`text-sm ${!notification.read ? 'font-semibold' : ''}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationPanel;