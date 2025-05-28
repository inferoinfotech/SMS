import React from "react";

const Popup = ({ responses, onClose }) => {
  // Filter out responses where selectedOption is null
  const filteredResponses = responses.filter(response => response.selectedOption !== null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Poll Responses</h2>
        {filteredResponses.length > 0 ? (
          <ul className="max-h-[200px] overflow-y-auto">
            {filteredResponses.map((response, index) => {
              const { firstName, lastName } = response.residentId || {};
              const profilePhoto = response.residentId?.images?.profilePhoto;

              return (
                <li key={index} className="mb-2 p-2 border-b border-gray-200 flex items-center">
                  {/* Display profile photo as avatar */}
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={`${firstName} ${lastName}'s avatar`}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
                      <span className="text-sm text-white">
                        {firstName?.charAt(0) || "?"}
                      </span>
                    </div>
                  )}

                  {/* Display name and response */}
                  <div>
                    <div className="text-sm font-medium">
                      {firstName} {lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {response.selectedOption || "No response"}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">No valid responses yet.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-[#5678E9] text-white rounded-[10px] hover:bg-[#4567D8] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;