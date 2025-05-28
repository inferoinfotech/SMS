import images from "@/Images";
import React from "react";

const CoomunitiesChatMessages = ({
  messages,
  setShowChatMessages,
  setShowChatInput,
}) => {
  return (
    <div className="flex grow flex-col gap-4 p-5 h-[calc(100vh-200px)] overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col ${
            message.type === "sent" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`flex ${
              message.type === "sent"
                ? "justify-end w-full"
                : "justify-start w-full"
            }`}
          >
            <div className="bg-[rgba(86,120,233,0.05)] p-3 rounded-lg w-full">
              {/* <div className="font-semibold">{message.sender}</div> */}
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div
                    className={`text-sm font-normal mr-5 inline-flex ${
                      message.votecount > 0
                        ? "text-[#39973D]"
                        : "text-[#A7A7A7]"
                    }`}
                  >
                    <span className="mr-1">{message.votecount}</span> votes
                  </div>
                  <div className="text-base font-medium text-[#4F4F4F]">
                    {message.question}
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-white py-1 px-2 rounded-[30px] w-[61px] h-[31px] flex items-center justify-center"
                  onClick={() => {
                    setShowChatMessages(true);
                    setShowChatInput(false);
                  }}
                >
                  <img src={images.smallEye} alt="" className="mr-1" />
                  <span className="whitespace-nowrap text-sm font-normal text-[#4F4F4F]">
                    20
                  </span>
                </button>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div
                    className={`text-sm font-normal inline-flex mr-5 ${
                      message.answercount > 0
                        ? "text-[#5678E9]"
                        : "text-[#A7A7A7]"
                    }`}
                  >
                    <span className="mr-1">{message.answercount}</span> answers
                  </div>
                  <div className="font-light text-base text-[#A7A7A7] max-w-[928px] break-words">
                    {message.content}
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-white py-1 px-2 rounded-[30px] w-[61px] h-[31px] flex items-center justify-center mt-3"
                  onClick={() => {
                    setShowChatMessages(true);
                    setShowChatInput(true);
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="#4F4F4F"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </button>
              </div>

              {/* <div className="text-sm text-gray-600">{message.time}</div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoomunitiesChatMessages;
