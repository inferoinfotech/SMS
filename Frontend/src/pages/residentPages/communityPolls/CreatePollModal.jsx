import React, { useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa"; // Import star and trash icons
import { createPoll } from "../../../api/PollApi"; // Import the API function
import CustomButton from "@/components/customButton/CustomButton";

const CreatePollModal = ({ isOpen, onClose, onCreatePoll, pollType }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]); // For both Single Choice and Multiple Choice polls
  const [error, setError] = useState(""); // State for error messages

  // Static options for Numeric and Rating polls
  const numericOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; // Static numeric options (strings)
  const ratingOptions = ["1", "2", "3", "4", "5"]; // Static rating options (strings)

  // Map frontend pollType to backend enum values
  const pollTypeMapping = {
    "Multiple Choice Poll": "Multichoice",
    "Single Choice Poll": "Singlechoice",
    "Rating Poll": "Rating",
    "Numeric Poll": "Numeric",
    "Text Poll": "Text",
  };

  const handleCreatePoll = async () => {
    try {
      // Prepare the poll data to send to the API
      const pollData = {
        pollType: pollTypeMapping[pollType], // Map frontend pollType to backend enum value
        question: question,
        options: [], // Initialize options
        residentId: "someResidentId", // Replace with actual resident ID
      };

      // Set options based on poll type
      if (pollType === "Numeric Poll") {
        pollData.options = numericOptions.map(Number); // Convert numeric options to numbers
      } else if (pollType === "Rating Poll") {
        pollData.options = ratingOptions.map(Number); // Convert rating options to numbers
      } else if (pollType === "Multiple Choice Poll" || pollType === "Single Choice Poll") {
        pollData.options = options.filter((option) => option.trim() !== ""); // Remove empty options
      }

      // Validate at least two options for both Single Choice and Multiple Choice polls
      if (
        (pollType === "Multiple Choice Poll" || pollType === "Single Choice Poll" || pollType === "Numeric Poll" || pollType === "Rating Poll") &&
        pollData.options.length < 2
      ) {
        setError("At least two options are required.");
        return;
      }

      // Call the API to create the poll
      const response = await createPoll(pollData);

      // If successful, notify the parent component and close the modal
      onCreatePoll(response); // Pass the response data to the parent component
      onClose();
    } catch (error) {
      setError("Failed to create poll. Please try again."); // Display error message
    }
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 border-b border-solid border-[#F4F4F4] pb-2">
          Create Poll
        </h2>
        <div className="space-y-4">
          {/* Question Field (Always Present) */}
          <div>
            <label className="block font-medium text-sm mb-1">
              Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border rounded-[10px] px-3 py-2"
              placeholder="Ask a question"
              required
            />
          </div>

          {/* Options Section (Same for Single Choice and Multiple Choice) */}
          {(pollType === "Multiple Choice Poll" || pollType === "Single Choice Poll") && (
            <div
              className={`${
                options.length > 2 ? "max-h-[150px] overflow-y-auto" : ""
              } border border-gray-200 p-2 rounded-md`}
            >
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <label className="block font-medium text-sm mb-1">
                    Option {index + 1} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    className="w-full border rounded-[10px] px-3 py-2"
                    placeholder="Add"
                    required
                  />
                  {options.length > 2 && (
                    <button
                      onClick={() => handleDeleteOption(index)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <CustomButton
                imageType="Add"
                className="mr-0 flex justify-between"
                width="60px"
                onClick={handleAddOption}
              >
                Add an Option
              </CustomButton>
            </div>
          )}

          {/* Numeric Poll Section */}
          {pollType === "Numeric Poll" && (
            <div>
              <label className="block font-medium text-sm mb-1">
                Numbers <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {numericOptions.map((num, index) => (
                  <span key={index} className="border rounded-[10px] px-3 py-2">
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rating Poll Section */}
          {pollType === "Rating Poll" && (
            <div>
              <label className="block font-medium text-sm mb-1">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                {ratingOptions.map((star, index) => (
                  <FaStar key={index} className="text-yellow-500" />
                ))}
              </div>
            </div>
          )}

          {/* Text Poll Section */}
          {pollType === "Text Poll" && (
            <div>
              <label className="block font-medium text-sm mb-1">
                Text <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border rounded-[10px] px-3 py-2"
                placeholder="Enter text"
                required
              />
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex justify-end mt-4 w-full">
          <button
            onClick={onClose}
            className="px-4 py-3 border border-solid border-[#D3D3D3] text-gray-600 rounded-[10px] w-full mr-3"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePoll}
            className="px-4 py-3 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-[10px] w-full"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePollModal;