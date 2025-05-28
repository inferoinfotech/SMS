import React, { useState } from "react";
import RatingPollInput from "./RatingPollInput";
import images from "@/Images"; // Import your images
import { submitPoll } from '../../../api/PollApi'; // Import the API function
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const RatingPollCard = ({ poll, readOnly = false }) => {
  // Default values for missing fields
  const defaultPoll = {
    avatar: images.defaultAvatar, // Replace with your default avatar path
    name: "Unknown User",
    votes: {
      icon: images.defaultVoteIcon, // Replace with your default vote icon path
      count: 0,
    },
    question: "No question available",
    options: [], // Default empty options array
    optionCounts: [], // Default empty optionCounts array
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

  // State to manage selected rating
  const [selectedRating, setSelectedRating] = useState(null);

  // Handle rating selection
  const handleRatingChange = (value) => {
    if (readOnly) return; // Prevent changes in read-only mode
    setSelectedRating(value);
  };

  // Function to handle API call when rating is submitted
  const handleSubmitRating = async (rating) => {
    if (readOnly) return; // Prevent submissions in read-only mode
    try {
      // Prepare the poll data to be sent
      const pollData = {
        pollId: poll._id, // Ensure pollId is passed correctly
        selectedOption: rating, // The selected rating
      };

      // Call the API to submit the poll
      await submitPoll(pollData);

      // Notify the user that the rating was submitted successfully
      toast.success("Rating submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

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
            <div className="flex flex-col items-end mt-5 w-full">
              <div className="flex flex-col w-full">
                <RatingPollInput
                  options={pollData.options}
                  optionCounts={pollData.optionCounts}
                  onRatingChange={handleRatingChange}
                  selectedRating={selectedRating}
                  onSubmitRating={handleSubmitRating} // Pass the API handler
                  responses={poll.responses} // Pass the responses to display profile photos
                  readOnly={readOnly} // Pass read-only flag
                />
              </div>
              <div className="mt-2 text-sm text-right text-neutral-400">
                {formattedTimestamp}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPollCard;