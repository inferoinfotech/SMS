import React, { useState } from "react";
import UserAvatar from "../chatScreen/UserAvatar";

const CoomunitiesChatSidebar = ({ searchTerm, setSearchTerm, onSelectUser }) => {
  const [activeUserId, setActiveUserId] = useState(null);
  const chatList = [
    {
      id: 1,
      name: "Michael John",
      lastMessage: "Hii, John! how are you doing?",
      time: "10:27",
      unread: 0,
      isOnline: true,
    },
    {
      id: 2,
      name: "Elizabeth Sarah",
      lastMessage: "Thank you for your order!",
      time: "9:20",
      unread: 0,
      isOnline: false,
    },
    {
      id: 3,
      name: "Jenny Wilson",
      lastMessage: "Hello, Jenny",
      time: "7:00",
      unread: 7,
      isOnline: true,
    },
    {
      id: 4,
      name: "Arlene McCoy",
      lastMessage: "Typing....",
      time: "9:20",
      unread: 0,
      isOnline: true,
    },
    {
      id: 5,
      name: "Esther Howard",
      lastMessage: "Hello, Esther",
      time: "10:27",
      unread: 0,
      isOnline: false,
    },
    {
      id: 6,
      name: "Cody Fisher",
      lastMessage: "Thank you for your order!",
      time: "7:00",
      unread: 0,
      isOnline: false,
    },
    {
      id: 11,
      name: "Michaelet John",
      lastMessage: "Hii, John! how are you doing?",
      time: "10:27",
      unread: 0,
      isOnline: true,
    },
    {
      id: 12,
      name: "Elizabwereth Sarah",
      lastMessage: "Thank you for your order!",
      time: "9:20",
      unread: 0,
      isOnline: false,
    },
    {
      id: 13,
      name: "Jennwery Wilson",
      lastMessage: "Hello, Jenny",
      time: "7:00",
      unread: 7,
      isOnline: true,
    },
    {
      id: 14,
      name: "Arlenwre McCoy",
      lastMessage: "Typing....",
      time: "9:20",
      unread: 0,
      isOnline: true,
    },
    {
      id: 15,
      name: "Estherer Howard",
      lastMessage: "Hello, Esther",
      time: "10:27",
      unread: 0,
      isOnline: false,
    },
    {
      id: 16,
      name: "wrwr dfFisher",
      lastMessage: "Thank you for your order!",
      time: "7:00",
      unread: 0,
      isOnline: false,
    },
    {
      id: 21,
      name: "Micwerhaewel John",
      lastMessage: "Hii, John! how are you doing?",
      time: "10:27",
      unread: 0,
      isOnline: true,
    },
    {
      id: 22,
      name: "Elizwrabeth Sarah",
      lastMessage: "Thank you for your order!",
      time: "9:20",
      unread: 0,
      isOnline: false,
    },
    {
      id: 23,
      name: "Jenerwny Wilson",
      lastMessage: "Hello, Jenny",
      time: "7:00",
      unread: 7,
      isOnline: true,
    },
    {
      id: 24,
      name: "Arlasene McCoy",
      lastMessage: "Typing....",
      time: "9:20",
      unread: 0,
      isOnline: true,
    },
    {
      id: 25,
      name: "Esthwerer Howard",
      lastMessage: "Hello, Esther",
      time: "10:27",
      unread: 0,
      isOnline: false,
    },
    {
      id: 26,
      name: "Codewry Fisher",
      lastMessage: "Thank you for your order!",
      time: "7:00",
      unread: 0,
      isOnline: false,
    },
  ];

  const filteredChats = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (userId) => {
    setActiveUserId(userId);
    onSelectUser && onSelectUser(userId);
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
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleUserClick(chat.id)}
                className={`flex gap-4 p-3 cursor-pointer transition-colors rounded-lg duration-200 ${
                  activeUserId === chat.id
                    ? "bg-indigo-500 bg-opacity-10"
                    : "hover:bg-gray-50"
                }`}
              >
                <UserAvatar isOnline={chat.isOnline} />
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between">
                    <div className="text-base text-neutral-600">
                      {chat.name}
                    </div>
                    <div className="text-xs text-neutral-400">{chat.time}</div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-xs text-neutral-400">
                      {chat.lastMessage}
                    </div>
                    {chat.unread > 0 && (
                      <div className="px-1.5 w-5 h-5 text-sm text-center text-white bg-indigo-500 rounded-full">
                        {chat.unread}
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
};

export default CoomunitiesChatSidebar;
