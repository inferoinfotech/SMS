import React, { useState, useEffect } from "react";
import { POLL_TYPES } from "./PollTypes";
import NumericPollInput from "./NumericPollInput";
import images from "@/Images"; // Import your images
import { submitPoll } from '../../../api/PollApi'; // Import the API function

const NumberPollCard = ({ poll, readOnly }) => {
  // Default values for missing fields
  const defaultPoll = {
    avatar: images.defaultAvatar, // Replace with your default avatar path
    name: "Unknown User",
    pollType: POLL_TYPES.SINGLE_CHOICE, // Default poll type
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

  const isMultiChoice = pollData.pollType === POLL_TYPES.MULTI_CHOICE;

  // State to manage selected numeric value
  const [selectedNumericValue, setSelectedNumericValue] = useState(null);

  // State to manage disabled status
  const [disabled, setDisabled] = useState(readOnly);

  // Timer to disable the numeric input after 30 seconds
  useEffect(() => {
    if (!readOnly) {
      const timer = setTimeout(() => {
        setDisabled(true);
      },  60000 * 1 * 5);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [readOnly]);

  // Handle numeric value selection
  const handleNumericValueChange = (value) => {
    if (disabled) return; // Prevent further selections if disabled
    setSelectedNumericValue(value);
  };

  // Format the name from the API response
  const formattedName = `${pollData.residentId.firstName} ${pollData.residentId.lastName}`;

  // Format the timestamp
  const formatDate = (dateString) => {
    if (!dateString) return "No timestamp available";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Convert to 12-hour format with AM/PM
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert 0 to 12

    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${period}`;
  };

  const formattedTimestamp = formatDate(pollData.createdAt);

  // Function to handle API call when numeric value is submitted
  const handleSubmitValue = async (value) => {
    if (disabled) return; // Prevent submissions if disabled

    try {
      // Prepare the poll data to be sent
      const pollData = {
        pollId: poll._id, // Ensure pollId is passed correctly
        selectedOption: value, // The selected numeric value
      };

      // Call the API to submit the poll
      await submitPoll(pollData);

      // Notify the user that the numeric value was submitted successfully
      alert("Numeric value submitted successfully!");
    } catch (error) {
      console.error("Error submitting numeric value:", error);
      alert("Failed to submit numeric value. Please try again.");
    }
  };

  // Helper function to generate the full image URL
  const getImageUrl = (imageName) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080"; // Fallback to localhost if env variable is missing
    return `${baseUrl}/uploads/${imageName}`;
  };

  return (
    <div className="flex flex-col justify-center p-4 bg-white rounded-2xl shadow-lg w-[370px] h-auto overflow-hidden">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <div className="flex gap-10 items-start">
              <div className="flex gap-4 items-center">
                <img
                  loading="lazy"
                  src={getImageUrl(pollData.residentId?.images?.profilePhoto) || images.defaultAvatar}
                  alt={`${formattedName}'s avatar`}
                  className="object-contain w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="text-lg font-semibold text-[#5678E9]">
                    {formattedName}
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
                    className="object-contain w-5 h-5"
                  />
                  <div>{pollData.votes.count}</div>
                </div>
              </div>
            </div>
            <div className="mt-4 w-full border border-solid bg-zinc-100 border-zinc-100 min-h-[1px]" />
          </div>
          <div className="flex flex-col mt-4 w-full">
            <div className="flex flex-col w-full">
              <div className="text-base font-medium text-neutral-800">
                {pollData.question}
              </div>
              <div className="flex gap-2 items-center mt-1 text-sm text-neutral-600">
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
                <div>
                  Select {isMultiChoice ? "one or more" : "one"}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end mt-5 w-full">
              <div className="flex flex-col w-full">
                <NumericPollInput
                  options={pollData.options}
                  optionCounts={pollData.optionCounts}
                  onValueChange={handleNumericValueChange}
                  selectedValue={selectedNumericValue}
                  onSubmitValue={handleSubmitValue} // Pass the API handler
                  responses={poll.responses} // Pass the responses to display profile photos
                  disabled={disabled || readOnly} // Pass the disabled state
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

export default NumberPollCard;