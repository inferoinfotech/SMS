import React, { useState, useEffect } from "react";
import { getOwnPolls, submitPoll } from '../../../api/PollApi'; // Import the API functions
import Popup from "./Popup"; // Create a Popup component (see Step 3)
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const TextPollInput = ({ pollId, onSend, readOnly = false }) => {
  const [textValue, setTextValue] = useState("");
  const [responses, setResponses] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSendDisabled, setIsSendDisabled] = useState(false); // State to disable send button

  // Fetch responses for the specific poll
  const fetchPollResponses = async () => {
    try {
      const response = await getOwnPolls(); // Fetch all polls
      const poll = response.polls.find((poll) => poll._id === pollId); // Find the specific poll

      if (poll) {
        setResponses(poll.responses); // Set the responses for the poll
      } else {
        setResponses([]); // No responses found
      }
    } catch (error) {
      console.error("Error fetching poll responses:", error);
      toast.error("Failed to fetch poll responses. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleTextChange = (value) => {
    if (readOnly || isSendDisabled) return; // Prevent changes if read-only or send is disabled
    setTextValue(value);
  };

  const handleSend = async () => {
    if (readOnly || isSendDisabled) return; // Prevent submissions if read-only or send is disabled
    if (textValue.trim() === "") {
      toast.error("Please enter some text before sending.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      // Prepare the poll data to be sent
      const pollData = {
        pollId: pollId,
        selectedOption: textValue,
      };

      // Call the API to submit the poll
      await submitPoll(pollData);

      // Notify the parent component that the poll has been sent
      onSend(textValue);

      // Clear the input field after sending
      setTextValue("");

      toast.success("Poll response submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Refresh the responses after submission
      fetchPollResponses();
    } catch (error) {
      console.error("Error submitting poll response:", error);
      toast.error("Failed to submit poll response. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleViewResponses = async () => {
    await fetchPollResponses(); // Fetch responses
    setIsPopupOpen(true); // Open the popup
  };

  // Disable send button and make input read-only after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSendDisabled(true);
    },  60000 * 1 * 5);
    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block font-medium text-sm">
          Text <span className="text-red-500">*</span>
        </label>
        <button
          onClick={handleSend}
          className={`px-4 py-2 bg-[#5678E9] text-white rounded-[10px] hover:bg-[#4567D8] transition ${
            readOnly || isSendDisabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={readOnly || isSendDisabled} // Disable button if read-only or send is disabled
        >
          Send
        </button>
      </div>
      <div className="flex items-center">
        <textarea
          value={textValue}
          onChange={(e) => handleTextChange(e.target.value)}
          className={`w-full border rounded-[10px] px-3 py-2 ${
            readOnly || isSendDisabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          placeholder="Enter text (max 100 characters)"
          maxLength="100"
          required
          disabled={readOnly || isSendDisabled} // Disable textarea if read-only or send is disabled
        />
      </div>
      <div className="mt-4 w-full">
        <button
          onClick={handleViewResponses}
          className={`w-full px-4 py-2 bg-[#5678E9] text-white rounded-[10px] hover:bg-[#4567D8] transition ${
            readOnly || isSendDisabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={readOnly || isSendDisabled} // Disable button if read-only or send is disabled
        >
          View Responses
        </button>
      </div>

      {/* Popup to display responses */}
      {isPopupOpen && (
        <Popup
          responses={responses}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default TextPollInput;