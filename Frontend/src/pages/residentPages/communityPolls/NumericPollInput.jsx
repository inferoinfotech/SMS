import React from "react";
import images from "@/Images"; // Import your static avatar images
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NumericPollInput = ({
  options,
  optionCounts,
  onValueChange,
  selectedValue,
  onSubmitValue,
  responses, // Pass the responses to display profile photos
  disabled, // Pass the disabled state
}) => {
  const handleValueChange = (value) => {
    if (disabled) return; // Prevent further selections if disabled
    onValueChange(value); // Notify the parent component about the selected value
    onSubmitValue(value); // Trigger the API call after the user selects a value
    toast.success("Numeric value submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Split options into two groups: 1-5 and 6-10
  const firstHalf = options.slice(0, 5);
  const secondHalf = options.slice(5, 10);

  // Extract profile photos from responses
  const getProfilePhotosForOption = (option) => {
    const optionResponses = responses.filter(
      (response) => response.selectedOption === option
    );
    return optionResponses.map((response) => response.residentId?.images?.profilePhoto);
  };

  // Helper function to generate the full image URL
  const getImageUrl = (imageName) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080"; // Fallback to localhost if env variable is missing
    return `${baseUrl}/uploads/${imageName}`;
  };

  return (
    <div className="flex flex-col w-full">
      <label className="block text-sm font-medium mb-2">
        Numeric Value <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col md:flex-row gap-4">
        {/* First Half: 1-5 */}
        <div className="flex flex-col space-y-2 w-full md:w-1/2">
          {firstHalf.map((option) => {
            const optionCount = optionCounts.find(
              (count) => count.option === option
            );

            // Get profile photos for this option
            const displayedAvatars = getProfilePhotosForOption(option);

            return (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer bg-gray-100 p-3 rounded-lg"
              >
                <input
                  type="radio"
                  name="numericValue"
                  value={option}
                  checked={selectedValue === option}
                  onChange={() => handleValueChange(option)}
                  className="form-radio text-blue-500 h-4 w-4"
                  disabled={disabled} // Disable the input if readOnly or disabled
                />
                <span className="text-sm">{option}</span>
                <span className="text-xs text-neutral-600">
                  ({optionCount ? optionCount.count : 0})
                </span>

                {/* Display avatars based on the count */}
                {displayedAvatars.length > 0 && (
                  <div className="flex -space-x-2 ml-2">
                    {displayedAvatars.map((avatar, index) => (
                      <img
                        key={index}
                        src={getImageUrl(avatar) || images.defaultAvatar}
                        alt="User avatar"
                        className="w-6 h-6 rounded-full border-2 border-white"
                      />
                    ))}
                    {/* Show a "+X" badge if there are more votes than avatars */}
                    {optionCount && optionCount.count > displayedAvatars.length && (
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
                        +{optionCount.count - displayedAvatars.length}
                      </div>
                    )}
                  </div>
                )}
              </label>
            );
          })}
        </div>

        {/* Second Half: 6-10 */}
        <div className="flex flex-col space-y-2 w-full md:w-1/2">
          {secondHalf.map((option) => {
            const optionCount = optionCounts.find(
              (count) => count.option === option
            );

            // Get profile photos for this option
            const displayedAvatars = getProfilePhotosForOption(option);

            return (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer bg-gray-100 p-3 rounded-lg"
              >
                <input
                  type="radio"
                  name="numericValue"
                  value={option}
                  checked={selectedValue === option}
                  onChange={() => handleValueChange(option)}
                  className="form-radio text-blue-500 h-4 w-4"
                  disabled={disabled} // Disable the input if readOnly or disabled
                />
                <span className="text-sm">{option}</span>
                <span className="text-xs text-neutral-600">
                  ({optionCount ? optionCount.count : 0})
                </span>

                {/* Display avatars based on the count */}
                {displayedAvatars.length > 0 && (
                  <div className="flex -space-x-2 ml-2">
                    {displayedAvatars.map((avatar, index) => (
                      <img
                        key={index}
                        src={getImageUrl(avatar) || images.defaultAvatar}
                        alt="User avatar"
                        className="w-6 h-6 rounded-full border-2 border-white"
                      />
                    ))}
                    {/* Show a "+X" badge if there are more votes than avatars */}
                    {optionCount && optionCount.count > displayedAvatars.length && (
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
                        +{optionCount.count - displayedAvatars.length}
                      </div>
                    )}
                  </div>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default NumericPollInput;