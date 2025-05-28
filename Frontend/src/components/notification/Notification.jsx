// Frontend/src/components/notification/Notification.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profile from '../../../static/img/profile.png';
import './style.css';
import images from '../../Images';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getNotification, acceptAnnouncementCashPayment, declineAnnouncementCashPayment, acceptMaintenanceCashPayment, declineMaintenanceCashPayment } from '@/api/AnnouncementApi';
import { io } from "socket.io-client";
export const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"],
  withCredentials: true,
});
const Notification = ( { setShowNotification } ) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await getNotification();
            setNotifications(response);
        } catch (error) {
            toast.error('Failed to fetch notifications');
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle clear all notifications
    const handleClearAll = async () => {
        try {
            const response = await axios.delete('/api/notifications/clear-all', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.data.success) {
                setNotifications([]);
                toast.success('All notifications cleared');
            }
        } catch (error) {
            toast.error('Failed to clear notifications');
            console.error('Error clearing notifications:', error);
        }
    };

    // Format time ago
    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffInMinutes = Math.floor((now - past) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} days ago`;
    };

    const handleAccept = async (notificationId) => {
        const response = await acceptAnnouncementCashPayment(notificationId);
        fetchNotifications();
        setShowNotification(false);
    };

    const handleDecline = async (notificationId) => {
        const response = await declineAnnouncementCashPayment(notificationId);
        fetchNotifications();
        setShowNotification(false);
    };
    useEffect(() => {
        socket.on('connect', () => {
          console.log('Connected to socket server with ID:', socket.id);
        });
      
        socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
          console.log('Connection URL:', import.meta.env.VITE_SERVER_URL);
        });

        socket.on('newNotification', (notification) => {
          console.log('New notification received:', notification);
          setNotifications(prevNotifications => [notification, ...prevNotifications]);
        });
      
        socket.on('error', (error) => {
          console.error('Socket error:', error);
        });
      
        return () => {
          socket.off('connect');
          socket.off('connect_error');
          socket.off('error');
        };
      }, []);

    const renderNotificationActions = (notification) => {
        if (notification.type === 'PAYMENT' && notification.status === 'Pending' ) {
            return (
                <div className="frame-131">
                    <div 
                        className="unfill-yes-fill-no-wrapper un-fill-true component-35"
                        onClick={() => handleAccept(notification._id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="frame-23 component-35-instance">
                            <div className="add component-28">Accept</div>
                        </div>
                    </div>
                    <div 
                        className="unfill-yes-fill-no-wrapper un-fill-false component-29"
                        onClick={() => handleDecline(notification._id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="frame-23 component-35-instance">
                            <div className="add component-28">Decline</div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='element-notification-pop'>
            <div className="frame-123">
                <div className="frame-124">
                    <div className="frame-125">
                        <div className="frame-126">
                            <div className="text-wrapper-68">Notification</div>
                            {notifications?.length > 0 && (
                                <div 
                                    className="text-wrapper-70" 
                                    onClick={handleClearAll}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Clear all
                                </div>
                            )}
                        </div>
                        <img className="line-18" alt="Line" src={images.line18} />
                    </div>
                    
                    {loading ? (
                        <div className="loading">Loading notifications...</div>
                    ) : !Array.isArray(notifications) || notifications.length === 0 ? (
                        <div className="text-center w-full">No notifications available</div>
                    ) : (
                        <div className="frame-124">
                            {notifications?.map((notification) => (
                                <div key={notification._id} className="frame-127">
                                    <img 
                                        className="group-75" 
                                        alt="Profile" 
                                        src={profile}
                                    />
                                    <div className="frame-128">
                                        <div className="frame-129">
                                            <div className="text-24">
                                                {notification.title}
                                            </div>
                                            <div className="text-25">
                                                {notification?.createdAt && new Date(notification.createdAt).toLocaleString('en-US', {
                                                    weekday: 'long',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true
                                                })}
                                            </div>
                                            <p className="text-26">
                                                <span className="text-wrapper-71">{notification?.message}</span>
                                                {notification?.amount && (
                                                    <span className="text-wrapper-72">
                                                        &nbsp;of {notification.amount} rupees
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        
                                        {renderNotificationActions(notification)}
                                        
                                        <div className="frame-132">
                                            <div className="text-27">
                                                {notification?.createdAt && getTimeAgo(notification.createdAt)}
                                            </div>
                                            {notification?.read && (
                                                <svg
                                                    className="done-all-fill1-wght400-grad0-opsz24-1 done-all"
                                                    fill="none"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    width="18"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        className="path"
                                                        d="M5.02656 13.5002L0.789062 9.2627L1.85781 8.2127L5.04531 11.4002L6.09531 12.4502L5.02656 13.5002ZM9.26406 13.5002L5.02656 9.2627L6.07656 8.19395L9.26406 11.3814L16.1641 4.48145L17.2141 5.5502L9.26406 13.5002ZM9.26406 9.2627L8.19531 8.2127L11.9078 4.5002L12.9766 5.5502L9.26406 9.2627Z"
                                                        fill="#5678E9"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;