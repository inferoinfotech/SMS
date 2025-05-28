import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; // Import the star icon from FontAwesome
import images from "@/Images"; // Import your static avatar images
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const RatingPollInput = ({
  options,
  optionCounts,
  onRatingChange,
  selectedRating,
  onSubmitRating,
  responses, // Pass the responses to display profile photos
  readOnly, // Pass read-only flag
}) => {
  const [isDisabled, setIsDisabled] = useState(false); // State to disable rating selection

  // Disable rating selection after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(true);
    },  60000 * 1 * 5);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const handleRatingChange = (value) => {
    if (readOnly || isDisabled) return; // Prevent changes if read-only or disabled
    onRatingChange(value);
    onSubmitRating(value); // Trigger the API call when the rating is selected
    toast.success("Rating submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

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
    <div>
      <label className="block font-medium text-sm mb-1">
        Rating <span className="text-red-500">*</span>
      </label>
      <div className="flex justify-between items-center space-x-2">
        {options.map((option) => {
          // Find the count for this option from optionCounts
          const optionCount = optionCounts.find(
            (count) => count.option === option
          );

          // Get profile photos for this option
          const displayedAvatars = getProfilePhotosForOption(option);

          return (
            <div key={option} className="flex flex-col items-center">
              <button
                onClick={() => handleRatingChange(option)}
                className={`text-2xl ${
                  selectedRating >= option ? "text-yellow-500" : "text-gray-300"
                } ${readOnly || isDisabled ? "cursor-not-allowed" : ""}`}
                disabled={readOnly || isDisabled} // Disable button if read-only or disabled
              >
                <FaStar />
              </button>
              <span className="text-sm text-neutral-600 mt-1">
                ({optionCount ? optionCount.count : 0})
              </span>

              {/* Display avatars based on the count */}
              {displayedAvatars.length > 0 && (
                <div className="flex -space-x-2 mt-2">
                  {displayedAvatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={getImageUrl(avatar) || images.defaultAvatar}
                      alt="User avatar"
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                  ))}
                  {/* Show a "+X" badge if there are more votes than avatars */}
                  {optionCount.count > displayedAvatars.length && (
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
                      +{optionCount.count - displayedAvatars.length}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingPollInput;