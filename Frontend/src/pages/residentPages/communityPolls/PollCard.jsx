import React, { useState, useEffect } from "react";
import { PollOption } from "./PollOption";
import { POLL_TYPES } from "./PollTypes";
import images from "@/Images"; // Import your static avatar images
import { submitPoll } from '../../../api/PollApi'; // Import the API function
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

export function PollCard({ poll, readOnly = false }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  // Default values for missing fields
  const defaultPoll = {
    name: "Unknown User",
    pollType: POLL_TYPES.SINGLE_CHOICE,
    votes: {
      icon: images.defaultVoteIcon, // Replace with your default icon path
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

  // Format the timestamp
  const formattedTimestamp = pollData.createdAt
    ? new Date(pollData.createdAt).toLocaleString() // Convert to a readable date-time format
    : "No timestamp available";

  const handleOptionSelect = (option) => {
    if (disabled || readOnly) return; // Prevent further selections if disabled or read-only

    if (pollData.pollType === POLL_TYPES.SINGLE_CHOICE) {
      // Clear all selections and set the clicked option as selected
      setSelectedOptions({ [option]: true });
    } else {
      // Toggle the selection for multi-choice
      setSelectedOptions((prev) => ({
        ...prev,
        [option]: !prev[option],
      }));
    }

    // Set a timer to disable all options after 30 seconds
    if (!timerStarted) {
      setTimerStarted(true);
      setTimeout(() => {
        setDisabled(true);
      }, 60000 * 1 * 5);
    }
  };
  const getImageUrl = (imageName) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080"; // Fallback to localhost if env variable is missing
    return `${baseUrl}/uploads/${imageName}`;
  };
  const isMultiChoice = pollData.pollType === POLL_TYPES.MULTI_CHOICE;

  // Function to handle API call when an option is submitted
  const handleSubmitOption = async (option) => {
    if (readOnly) return; // Prevent submissions in read-only mode
    try {
      // Prepare the poll data to be sent
      const pollData = {
        pollId: poll._id, // Ensure pollId is passed correctly
        selectedOption: option, // The selected option
      };

      // Call the API to submit the poll
      await submitPoll(pollData);

      // Notify the user that the option was submitted successfully
      toast.success("Option submitted successfully!");
    } catch (error) {
      console.error("Error submitting option:", error);
      toast.error(`Failed to submit option: ${error.message || "Unknown error"}. Please try again.`);
    }
  };

  const totalVotes = pollData.optionCounts.reduce((sum, optionCount) => sum + optionCount.count, 0);

  return (
    <div className="flex flex-col justify-center p-4 bg-white rounded-2xl shadow-lg min-w-[240px] w-[370px]">
      <div className="flex flex-col items-center max-w-full w-[340px]">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full max-w-[340px]">
            <div className="flex gap-10 items-start">
              <div className="flex gap-4 items-center">
                <img
                  loading="lazy"
                  src={ getImageUrl(pollData.residentId?.images?.profilePhoto) || images.defaultProfileImage}
                  alt='image'
                  className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square min-h-[48px] rounded-full border-2 border-gray-300"
                />
                <div className="flex flex-col self-stretch my-auto">
                  <div className="text-lg font-semibold text-[#5678E9]">
                    {pollData.residentId?.firstName || "Unknown"} {pollData.residentId?.lastName || "User"}
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
                    src={images.arrowDown}
                    alt="Vote count icon"
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  />
                  <div className="self-stretch my-auto">
                    {pollData.votes.count}
                  </div>
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
              <div className="flex gap-2 items-center self-start mt-1 text-sm text-neutral-600">
                <div className="flex gap-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isMultiChoice ? "bg-orange-500" : "bg-gray-300"
                    }`}
                  />
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isMultiChoice ? "bg-orange-500" : "bg-gray-300"
                    }`}
                  />
                </div>
                <div className="self-stretch my-auto">
                  Select {isMultiChoice ? "one or more" : "one"}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end mt-5 w-full">
              <div className="flex flex-col w-full">
                {/* Render options */}
                {pollData.options.map((option, index) => {
                  // Find the count for this option from optionCounts
                  const optionCount = pollData.optionCounts.find(
                    (count) => count.option === option
                  );

                  return (
                    <PollOption
                      key={index}
                      option={option}
                      count={optionCount ? optionCount.count : 0}
                      totalVotes={totalVotes}
                      onSelect={handleOptionSelect}
                      isMultiChoice={isMultiChoice}
                      disabled={disabled || readOnly} // Disable if read-only
                      selected={selectedOptions[option] || false}
                      onSubmitOption={handleSubmitOption}
                      profilePhotos={optionCount ? optionCount.profilePhotos : []} // Pass profile photos
                      readOnly={readOnly} // Pass read-only flag
                    />
                  );
                })}
              </div>
              <div className="mt-2 text-sm text-right text-neutral-400">
                {formattedTimestamp}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to display toast notifications */}
    </div>
  );
}