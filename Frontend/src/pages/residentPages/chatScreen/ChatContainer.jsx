import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { getAllMembers } from '@/api/communityChatApi';
import axiosInstance, { endpoints } from '@/axios';
import Loader from '@/components/Loader';
import toast from 'react-hot-toast';
import images from '@/Images';

export const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

function ChatContainer() {
  const userId = localStorage.getItem('residentId');

  const [residentMemberList, setResidentMemberList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const messagesEndRef = useRef(null);
  const [filteredResidents, setFilteredResidents] = useState([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axiosInstance.get(endpoints.chatWith.getMessageHistory(userId, receiver._id));
        setMessages(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    if (receiver) {
      fetchChatHistory();
    }
  }, [userId, receiver]);

  useEffect(() => {
    if (receiver) {
      socket.on("message", (messageData) => {
        console.log("messageData", messageData);

        setMessages((prevMessages) => [...prevMessages, messageData]);
      });
    }

    return () => {
      socket.off("message");
    };
  }, [receiver]);

  useEffect(() => {
    const fetchChatMembers = async () => {
      try {
        const members = await getAllMembers();
        setResidentMemberList(members);
        setFilteredResidents(members);
      } catch (error) {
        console.error('Error fetching chat members:', error);
      }
    };

    fetchChatMembers();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinChat = (item) => {
    setReceiver(item);
    socket.emit("join", { userId, receiverId: item._id });
  };

  const handleSendMessageOrMedia = async (event) => {
    event.preventDefault();
    try {
      if (!message.trim() && !media) return;
      // debugger;
      console.log("media", media);


      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("receiverId", receiver._id);

      if (message.trim()) {
        formData.append("message", message);
      }
      if (media) {
        formData.append("file", media);
      }

      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axiosInstance.post(endpoints.chatWith.sendMessage, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("response.data", response.data);

      socket.emit("message", response.data);

      setMessage("");
      setMedia(null);
    } catch (error) {
      // console.error("Error sending message/media:", error);
      // toast.error(error.response?.data?.message || "Failed to send message.");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        toast.error(
          "Microphone access was denied. Please allow access to record audio."
        );
      } else {
        toast.error("An error occurred while accessing the microphone.");
      }
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const sendVoiceMessage = async () => {
    if (!audioBlob) return;
    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("senderId", userId);
    formData.append("receiverId", receiver._id);

    try {
      setLoader(true);
      const response = await axiosInstance.post(endpoints.chatWith.sendMessage, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      socket.emit("message", response.data);
      setAudioBlob(null);
      setRecordingSeconds(0);
      setLoader(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoader(false);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = residentMemberList.filter(
      (resident) =>
        resident.firstName.toLowerCase().includes(searchTerm) ||
        resident.email.toLowerCase().includes(searchTerm)
    );
    setFilteredResidents(filtered);
  };

  return (
    <div className="block sm:flex bg-white h-full rounded-lg">
      <div
        className={`w-[100%] sm:w-[380px] sm:min-h-auto min-h-[86vh] sm:block ${receiver ? "hidden" : "block"
          } p-4 `}
      >
        <h2 className="text-xl font-semibold mb-3">Chat</h2>

        <div className={`items-center relative w-full flex mb-3`}>
          <span className="absolute left-3 text-gray-400">
            <img src="/assets/search-Bordere.svg" alt="" />
          </span>
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search Here"
            className="pl-10 pr-4 py-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        {filteredResidents.map((item, index) => (
          <div
            key={index}
            onClick={() => joinChat(item)}
            className={`flex items-center gap-2 p-2 my-2 ${receiver?._id === item._id && "bg-slate-200"
              } hover:bg-slate-200 overflow-hidden rounded-lg cursor-pointer`}
          >
            <img
              src={item.profilePhoto}
              className="w-10 h-10 rounded-full border"
              alt=""
            />
            <div>
              <h2 className="text-lg leading-[16px] capitalize">
                {item.firstName}
              </h2>
              <h2 className="text-sm text-[#A7A7A7]">{item.email}</h2>
            </div>
          </div>
        ))}
      </div>
      {/* chat room */}
      <div
        className={`w-full sm:block ${!receiver ? "hidden" : "block"
          } bg-[#F4F4F4] min-h-[86vh] relative border  overflow-hidden`}
      >
        {receiver ? (
          <>
            <div className="bg-white flex justify-between p-4 py-2 sticky top-0 shadow">
              <div className="flex gap-3 items-center">
                <img
                  src={receiver.profilePhoto}
                  alt='no Data'
                  className="md:w-12 md:h-12 w-10 h-10 rounded-full border-2"
                />
                <div>
                  <h4 className="font-semibold text-lg capitalize leading-none">
                    {receiver?.firstName}
                  </h4>
                  <p className="text-[#A7A7A7] hidden sm:block">
                    {receiver?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={images.videoCall}
                  alt='no Data'
                  className="md:w-10 md:h-10 w-8 h-8 rounded-full cursor-pointer hover:shadow-md"
                // onClick={handleVideoCallClick}
                />
                <img
                  src={images.audioCall}
                  alt='no Data'
                  className="md:w-10 md:h-10 w-8 h-8 rounded-full cursor-pointer hover:shadow-md"
                />
                <img src={images.optionMenu} alt="Menu" className="md:w-10 md:h-10 w-8 h-8 rounded-full cursor-pointer hover:shadow-md bg-black" />
                {/* <Popover className="relative">
                  <Popover.Button className="text-white outline-none">
                    <img
                      src="/assets/info.svg"
                      alt='no Data'
                      className="md:w-10 md:h-10 w-8 h-8 rounded-full cursor-pointer hover:shadow-md"
                    />
                  </Popover.Button>
                  <Popover.Panel className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-2">
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Copy
                      </button>
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Forward
                      </button>
                    </div>
                  </Popover.Panel>
                </Popover> */}
              </div>
            </div>
            <div className="p-4 mt-3 overflow-auto bg-[#F4F4F4] space-y-4 flex flex-col h-[84vh]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[60%] ${msg.senderId === userId
                    ? "text-right self-end"
                    : "text-left self-start"
                    }`}
                >
                  <div
                    className={`p-2 rounded-lg overflow-hidden ${msg.senderId === userId
                      ? "bg-[#5678E9] text-white text-left"
                      : "bg-[#5678e917] text-left self-start"
                      }`}
                  >
                    {msg.mediaUrl && msg.mediaUrl.endsWith(".webm") && (
                      <audio controls className="!w-[275px] !h-[50px]">
                        <source src={msg.mediaUrl} type="audio/wav" />
                        Your browser does not support the audio tag.
                      </audio>
                    )}

                    {msg.mediaUrl && !msg.mediaUrl.endsWith(".webm") && (
                      <img
                        src={msg.mediaUrl}
                        alt="media"
                        className="w-[470px] h-[278px] object-cover rounded-lg"
                      />
                    )}

                    {msg.message && (
                      <p className="break-words">{msg.message}</p>
                    )}
                  </div>
                  <p className="text-[12px] text-[#A7A7A7]">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      : "Right now"}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="bg-white ">
              <form
                onSubmit={handleSendMessageOrMedia}
                className="px-4 py-3 border-t border-gray-200 flex items-center space-x-4"
              >
                <div className={`items-center relative w-full flex`}>
                  {media && (
                    <>
                      <div className="w-14 mb-3 h-14 rounded-lg top-[-68px] ms-4 absolute overflow-hidden border">
                        <img
                          src={URL.createObjectURL(media)}
                          alt="IMG"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* <div
                        onClick={() => setMedia(null)}
                        className="cursor-pointer"
                      >
                        <img
                          src="/assets/cross.svg"
                          className="top-[-68px] ms-4 absolute bg-white p-1 rounded-full w-4 curser-pointer"
                          alt="close"
                        />
                      </div> */}
                    </>
                  )}
                  {/* {loader && (
                      <div className="bg-[#5555557c] p-2 rounded-lg absolute top-[-60px] left-[25px] z-30">
                        {loader && <Loader />}
                      </div>
                    )} */}
                  {/* type text */}
                  <input
                    type="text"
                    className={`pr-10 pl-4 py-2 w-full shadow border rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    placeholder="Type a message..."
                    value={message}
                    // disabled={loader}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  {/* type media */}
                  <span className="absolute right-11 text-gray-400 cursor-pointer mr-2">
                    <label htmlFor="inputFile" className="cursor-pointer">
                      <img src={images.mediaAttache} alt="" />
                      {/* SET_IMG */}
                    </label>

                    <input
                      ref={fileInputRef}
                      id="inputFile"
                      type="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          console.log("Selected file:", e.target.files[0]); // Debugging
                          setMedia(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </span>
                  <button
                    className="absolute right-3 text-gray-400 cursor-pointer"
                    disabled={message === ""}
                    // disabled={message === "" && media === null}
                    onClick={handleSendMessageOrMedia}
                  >
                    <div className="cursor-pointer ">
                      {/* send */}
                      <img src={images.sendIcon} alt="" />
                    </div>
                  </button>
                </div>

                {/* for audio */}
                <div
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-2 cursor-pointer flex items-center overflow-visible ${isRecording ? "bg-red-500" : "bg-[#5678E9]"
                    } text-white rounded-full`}
                >
                  <img
                    src={images.microPhone}
                    className="m-auto"
                    alt="microphone"
                  />

                  {isRecording && (
                    <div className="text-md text-white text-nowrap">
                      {formatTime(recordingSeconds)} &nbsp;&nbsp;&nbsp;
                    </div>
                  )}
                </div>

                {audioBlob && (
                  <div
                    onClick={sendVoiceMessage}
                    className="px-4 py-2 flex items-center bg-[#FE512E] text-white rounded-full cursor-pointer"
                  >
                    {loader ? (
                      <Loader />
                    ) : (
                      <>
                        {formatTime(recordingSeconds)}
                        <img
                          src={images.sendIcon}
                          className="mr-[-12px] ml-2 invert"
                          alt="Send"
                        />
                        &nbsp;&nbsp;&nbsp;
                      </>
                    )}
                  </div>
                )}
              </form>
            </div>
            {/* form */}
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[86vh] text-lg text-gray-400 select-none">
            Select Chat to Start Chatting..!
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatContainer;