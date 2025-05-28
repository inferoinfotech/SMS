import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import DocumentModal from "./DocumentModal";
import ImageModal from "./ImageModal";

function ChatInput({ onSendMessage, onSendFiles, onSendImages }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setShowDocumentModal(true);
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setSelectedImages(images);
    setShowImageModal(true);
  };

  const handleConfirmDocument = () => {
    onSendFiles(selectedFiles);
    setSelectedFiles([]);
    setShowDocumentModal(false);
  };

  const handleCancelDocument = () => {
    setSelectedFiles([]);
    setShowDocumentModal(false);
  };

  const handleConfirmImage = () => {
    onSendImages(selectedImages);
    setSelectedImages([]);
    setShowImageModal(false);
  };

  const handleCancelImage = () => {
    setSelectedImages([]);
    setShowImageModal(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (event, emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="flex flex-wrap gap-2.5 px-4 py-5 mt-3.5 bg-white rounded-br-2xl justify-self-end relative">
      <div className="flex flex-wrap flex-auto gap-10 px-3.5 py-2.5 bg-white rounded-[60px] shadow-[0px_7px_15px_rgba(0,0,0,0.05)] max-md:max-w-full">
        <div className="flex gap-4 text-sm text-neutral-600 flex-1">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-label="Emoji picker"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d7d1ac102584098b8784ce821c75ead7219856b4f9fc9fb7a8ca19c2f9612f5?placeholderIfAbsent=true&apiKey=d8c5f2c1accc4d81819c9cc495d39210"
              className="object-contain shrink-0 w-8 aspect-square"
            />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="my-auto basis-auto flex-1 outline-none"
          />
        </div>
        <div className="flex gap-4 my-auto justify-end">
          <label htmlFor="file-input" aria-label="Attach file">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e729f7bd072b63ab5ac1265378a493ee9f72c76f880104423f335a9593966caa?placeholderIfAbsent=true&apiKey=d8c5f2c1accc4d81819c9cc495d39210"
              className="object-contain shrink-0 w-6 aspect-square cursor-pointer"
            />
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
          </label>
          <label htmlFor="camera-input" aria-label="Attach camera">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/282a6fb9e58d0e1e7f8ea24ed60ffa3818d11e8a8aabff109865e70675908b74?placeholderIfAbsent=true&apiKey=d8c5f2c1accc4d81819c9cc495d39210"
              className="object-contain shrink-0 w-6 aspect-square cursor-pointer"
            />
            <input
              id="camera-input"
              type="file"
              accept="image/*"
              capture="camera"
              onChange={handleImageChange}
              multiple
              className="hidden"
            />
          </label>
        </div>
      </div>
      <button
        onClick={handleSend}
        className="shrink-0 rounded-full bg-indigo-500 hover:bg-indigo-600 p-3 aspect-square w-[50px] flex items-center justify-center"
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
      {showEmojiPicker && (
        <div className="absolute bottom-24 left-4">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      {showDocumentModal && (
        <DocumentModal
          files={selectedFiles}
          onConfirm={handleConfirmDocument}
          onCancel={handleCancelDocument}
        />
      )}
      {showImageModal && (
        <ImageModal
          images={selectedImages}
          onConfirm={handleConfirmImage}
          onCancel={handleCancelImage}
        />
      )}
    </div>
  );
}
export default ChatInput;