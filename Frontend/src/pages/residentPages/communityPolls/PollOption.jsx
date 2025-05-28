import React from "react";
import images from "@/Images"; // Import your static avatar images

export function PollOption({
  option,
  count,
  totalVotes,
  onSelect,
  isMultiChoice,
  disabled,
  selected,
  onSubmitOption,
  profilePhotos, // Passed from PollCard
  readOnly, // Pass read-only flag
}) {
  const handleClick = () => {
    if (disabled || readOnly) return; // Prevent clicks if disabled or read-only
    onSelect(option);
    onSubmitOption(option); // Trigger the API call when an option is selected
  };

  // Default values for missing fields
  const defaultOption = {
    text: "No option text",
    icon: "default-icon.png", // Replace with your default icon path
    count: 0,
    progressColor: "bg-gray-300", // Default progress bar color
    progressWidth: 0, // Default progress bar width
  };

  // If the option is a string, convert it to an object
  const optionData = typeof option === "string" ? { text: option } : option;

  // Merge the option data with default values
  const mergedOption = {
    ...defaultOption,
    ...optionData,
    count, // Use the count passed from the parent
  };

  // Calculate the progress bar width based on the count and total votes
  const progressWidth = totalVotes > 0 ? (mergedOption.count / totalVotes) * 100 : 0;

  // Set the progress bar color based on the count (you can customize this logic)
  const progressColor = mergedOption.count > 0 ? "bg-[#F09619]" : "bg-gray-300";

  // Use profile photos if available, otherwise use static avatars
  const displayedAvatars = profilePhotos.slice(0, 2); // Show up to 2 profile photos

  // If profile photos are not enough, use static avatars as fallback
  const fallbackAvatars = [images.Avatar, images.man].slice(0, 2 - displayedAvatars.length);

  return (
    <div className="flex flex-col w-full rounded-none max-w-[340px] mt-2.5">
      <div
        className={`flex gap-2.5 items-center p-2 rounded-md ${
          disabled || readOnly ? "opacity-50 cursor-not-allowed" : "cursor-pointer bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={handleClick}
      >
        <div className="flex flex-col my-auto w-[18px]">
          <div
            className={`flex shrink-0 rounded-full border-2 border-solid h-[18px] ${
              selected ? "border-[#F09619] bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]" : "border-neutral-300"
            }`}
          />
        </div>
        <div className="flex gap-10 justify-between items-center my-auto text-sm whitespace-nowrap w-full text-neutral-600">
          <div className="my-auto">{mergedOption.text}</div>
          <div className="flex gap-1.5 items-center my-auto text-right">
            {/* Display avatars based on profile photos or fallback */}
            <div className="flex -space-x-2 items-center">
              {displayedAvatars.map((photo, index) => (
                <img
                  key={index}
                  src={photo || images.defaultProfileImage}
                  alt="User avatar"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              ))}
              {fallbackAvatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt="Fallback avatar"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              ))}
              {/* Show a "+X" badge if there are more votes than avatars */}
              {mergedOption.count > displayedAvatars.length + fallbackAvatars.length && (
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
                  +{mergedOption.count - displayedAvatars.length - fallbackAvatars.length}
                </div>
              )}
              {/* Display the count next to the avatars */}
              <div className="ml-2 text-sm text-neutral-600">{count}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="flex flex-col items-start self-end mt-1.5 max-w-full bg-neutral-300 bg-opacity-40 rounded-[30px] w-[312px] max-md:pr-5">
        <div
          className={`flex shrink-0 h-[5px] rounded-[30px] ${progressColor}`}
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
}