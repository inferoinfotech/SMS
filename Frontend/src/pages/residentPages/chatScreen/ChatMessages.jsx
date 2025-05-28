import React, { useEffect, useRef } from 'react';

function ChatMessages({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  console.log("MSGSSSSSSSSSSSMSGS",messages);

  return (
    <div className="flex grow flex-col gap-4 p-5 h-[calc(100vh-200px)] overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col ${
            message.type === 'sent' ? 'items-end' : 'items-start'
          }`}
        >
          {message.file ? (
            <div className="p-4 rounded-xl bg-indigo-500 bg-opacity-10 text-neutral-800">
              <a href={URL.createObjectURL(message.file)} download={message.content}>
                {message.content}
              </a>
            </div>
          ) : message.image ? (
            <div className="p-4 rounded-xl bg-indigo-500 bg-opacity-10 text-neutral-800">
              <img src={URL.createObjectURL(message.image)} alt={message.content} className='object-cover' style={{ maxWidth: '330px', width: '330px', height: '211.439px' }} />
            </div>
          ) : (
            <div
              className={`p-4 max-w-[64%] break-words rounded-xl ${
                message.type === 'sent'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-indigo-500 bg-opacity-10 text-neutral-800'
              }`}
            >
              {message.content}
            </div>
          )}
          <div className="mt-1.5 text-xs font-medium text-neutral-400">
            {message.time}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;