import React from "react";
import TextPollInput from "./TextPollInput";
import images from "@/Images";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const TextPollCard = ({ poll, readOnly = false }) => {
  // Default values for missing fields
  const defaultPoll = {
    avatar: images.defaultAvatar, // Replace with your default avatar path
    name: "Unknown User",
    pollType: "Text",
    votes: {
      icon: images.defaultVoteIcon, // Replace with your default vote icon path
      count: 0,
    },
    question: "No question available",
    timestamp: "No timestamp available",
  };

  // Merge the poll data with default values
  const pollData = {
    ...defaultPoll,
    ...poll,
    votes: {
      ...defaultPoll.votes,
      ...poll.votes,
    },
  };

  // Extract firstName, lastName, and profilePhoto from residentId
  const { firstName, lastName } = pollData.residentId || {};
  const profilePhoto = pollData.residentId?.images?.profilePhoto; // Extract profile photo URL

  // Format the timestamp to include date (dd/mm/yyyy) and time (AM/PM)
  const formattedTimestamp = pollData.createdAt
    ? new Date(pollData.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "No timestamp available";

  // Ensure pollId is available
  const pollId = pollData._id || "defaultPollId"; // Provide a fallback if _id is missing

  // Helper function to generate the full image URL
  const getImageUrl = (imageName) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080"; // Fallback to localhost if env variable is missing
    return `${baseUrl}/uploads/${imageName}`;
  };

  return (
    <div className="flex flex-col justify-center p-4 bg-white rounded-2xl shadow-lg min-w-[240px] w-[370px] h-[350px]">
      <div className="flex flex-col items-center max-w-full w-[340px]">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full max-w-[340px]">
            <div className="flex gap-10 items-start">
              <div className="flex gap-4 items-center">
                {/* Conditionally render profile photo or default avatar */}
                {profilePhoto ? (
                  <img
                    loading="lazy"
                    src={getImageUrl(profilePhoto)}
                    alt={`${firstName} ${lastName}'s avatar`}
                    className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square min-h-[48px] rounded-full"
                  />
                ) : (
                  <img
                    loading="lazy"
                    src={images.defaultAvatar}
                    alt={`${firstName} ${lastName}'s avatar`}
                    className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square min-h-[48px]"
                  />
                )}
                <div className="flex flex-col self-stretch">
                  <div className="text-lg font-semibold text-[#5678E9]">
                    {firstName} {lastName}
                  </div>
                  <div className="text-sm text-neutral-800">
                    {pollData.pollType}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center px-2.5 py-1.5 text-sm text-white whitespace-nowrap bg-[#5678E9] rounded-[30px]">
                <div className="flex gap-1 items-center">
                  <img
                    loading="lazy"
                    src={getImageUrl(pollData.votes.icon) || images.defaultVoteIcon}
                    alt="Vote count icon"
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  />
                  <div className="self-stretch my-auto">{pollData.votes.count}</div>
                </div>
              </div>
            </div>
            <div className="mt-4 w-full border border-solid bg-zinc-100 border-zinc-100 min-h-[1px]" />
          </div>
          <div className="flex flex-col mt-4 w-full">
            <div className="flex flex-col max-w-full w-[292px]">
              <div className="text-base font-medium text-neutral-800">
                {pollData.question}
              </div>
            </div>
            <div className="flex flex-col mt-5 w-full">
              <TextPollInput
                pollId={pollId} // Pass the pollId to TextPollInput
                onSend={(response) => {
                  // Handle the response after the poll is sent
                  toast.success("Poll response submitted successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                }}
                readOnly={readOnly} // Pass read-only flag
              />
            </div>
          </div>
        </div>
      </div>
      {/* Date and Time Inside the Card */}
      <div className="mt-4 text-sm text-neutral-400 w-full text-center">
        {formattedTimestamp}
      </div>
    </div>
  );
};

export default TextPollCard;