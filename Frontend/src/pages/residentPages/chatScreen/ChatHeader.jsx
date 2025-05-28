import React, { useCallback, useState } from 'react';
import CallPopover from './CallPopover';
import { useLocation, useNavigate } from 'react-router-dom';

function ChatHeader({ selectedUser }) {
  const location = useLocation();
  const currentUrl = location.pathname;
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [showCallPopover, setShowCallPopover] = useState(false);
  const userId = selectedUser ? selectedUser._id : "123456";

  const handleVideoModalNavigate = useCallback(() => {
    navigate(`${currentUrl}/${userId}`, { state: { selectedUser, showVideoCallModal: true } });
  }, [navigate, userId, selectedUser]);

  const handleAudioCall = () => {
    setShowCallPopover(true);
  };

  return (
    <div className="flex flex-wrap gap-5 justify-between px-5 py-5 w-full text-base font-medium bg-white rounded-tr-2xl max-md:max-w-full relative">
      <div className="flex gap-4">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d91373ffe8facbef34460ad2db2768acb601f883355f9d20aef81de11e743a5?placeholderIfAbsent=true&apiKey=d8c5f2c1accc4d81819c9cc495d39210"
          className="object-contain shrink-0 self-start w-12 aspect-square min-h-[48px]"
        />
        <div className="flex flex-col">
          <div className="text-neutral-800">
            {selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName} (${selectedUser.wing}/${selectedUser.unit})` : 'Select a user'}
          </div>
          <div className="self-start mt-1 text-neutral-400">9:00 Pm</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {showSearch ? (
          <input
            type="text"
            placeholder="Search in conversation..."
            className="px-3 py-1 border rounded-md outline-none"
            autoFocus
          />
        ) : (
          <>
            <button 
              onClick={handleVideoModalNavigate}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M23 7l-7 5 7 5V7z"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </button>
            <button 
               onClick={handleAudioCall}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </button>
          </>
        )}
        <button 
          onClick={() => setShowSearch(!showSearch)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </div>
      <CallPopover
        isOpen={showCallPopover} 
        onClose={() => setShowCallPopover(false)} 
      />
    </div>
  );
}

export default ChatHeader;