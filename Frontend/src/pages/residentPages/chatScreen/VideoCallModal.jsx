import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ChatVideoCall from './ChatVideoCall';

function VideoCallModal() {
    const { roomId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (location.state) {
            setShowModal(location.state.showVideoCallModal);
            setSelectedUser(location.state.selectedUser);
        }
    }, [location.state]);

    const handleClose = () => {
        setShowModal(false);
        navigate('/chatScreen'); // Navigate back to /chatScreen
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg relative">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full z-20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <ChatVideoCall selectedUser={selectedUser} roomId={roomId} />
            </div>
        </div>
    );
}

export default VideoCallModal;