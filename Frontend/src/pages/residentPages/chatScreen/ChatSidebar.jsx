import React, { useEffect, useState } from 'react';
import UserAvatar from './UserAvatar';
import { getAllMembers } from "../../../api/communityChatApi";

function ChatSidebar({ onSelectUser }) {
  const [chatWithMemberList, setChatList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeUserId, setActiveUserId] = useState(null);

  useEffect(() => {
    const fetchChatMembers = async () => {
      try {
        const members = await getAllMembers();
        setChatList(members);
      } catch (error) {
        console.error('Error fetching chat members:', error);
      }
    };
    
    fetchChatMembers();
  }, []);

  const handleUserClick = (userId) => {
    setActiveUserId(userId);
    const selectedUser = chatWithMemberList.find(member => member._id === userId);
    onSelectUser && onSelectUser(selectedUser);
  };

  return (
    <div className="flex flex-col w-[21%] h-full max-md:ml-0 max-md:w-full">
      <div className="flex flex-col pt-5 pb-5 mx-auto h-full w-full bg-white rounded-2xl rounded-r-none border-r border-solid border-r-zinc-100 max-md:pb-24">
        <div className="flex flex-col px-5 w-full">
          <div className="self-start text-xl font-semibold text-neutral-800">
            Chat
          </div>
          <div className="flex flex-col justify-center px-4 py-3 mt-2.5 w-full text-base rounded-xl border border-white border-solid bg-slate-50 text-neutral-400">
            <div className="flex gap-4 items-center w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0cfbe01f55a332e68e43bf1414688d655076baacd0bb6664ecf79a9e0098c9e?placeholderIfAbsent=true&apiKey=d8c5f2c1accc4d81819c9cc495d39210"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              <input
                type="text"
                placeholder="Search Here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>
          
          <div className="mt-3.5 h-[760px] overflow-y-scroll">
            {chatWithMemberList.map((member) => (
              <div 
                key={member._id} 
                onClick={() => handleUserClick(member._id)}
                className={`flex gap-4 p-3 cursor-pointer transition-colors rounded-lg duration-200 ${
                  activeUserId === member._id ? 'bg-indigo-500 bg-opacity-10' : 'hover:bg-gray-50'
                }`}
              >
                <UserAvatar isOnline={member.isOnline} />
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between">
                    <div className="text-base text-neutral-600">{`${member.firstName} ${member.lastName}`}</div>
                    <div className="text-xs text-neutral-400">{member.time}</div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-xs text-neutral-400">{member.lastMessage}</div>
                    {member.unread > 0 && (
                      <div className="px-1.5 w-5 h-5 text-sm text-center text-white bg-indigo-500 rounded-full">
                        {member.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;