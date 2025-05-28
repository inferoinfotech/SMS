import React, { useState, useEffect } from "react";
import { PollCard } from "./PollCard";
import CreatePollModal from "./CreatePollModal";
import PreviousPoll from "./PreviousPoll";
import NewPoll from "./NewPoll";
import RatingPollCard from "./RatingPollCard";
import NumberPollCard from "./NumberPollCard";
import TextPollCard from "./TextPollCard";
import SelectPollModal from "./SelectPollModal";
import { getOwnPolls, newPoll, previousPolls } from "../../../api/PollApi"; // Import the API functions

const CommunityPolls = () => {
  const [activeTab, setActiveTab] = useState("ownPoll");
  const [isCreatePollModalOpen, setIsCreatePollModalOpen] = useState(false);
  const [isSelectPollModalOpen, setIsSelectPollModalOpen] = useState(false);
  const [selectedPollType, setSelectedPollType] = useState("");
  const [polls, setPolls] = useState([]); // State to store fetched polls
  const [newPolls, setNewPolls] = useState([]); // State to store new polls
  const [previousPollsData, setPreviousPollsData] = useState([]); // State to store previous polls
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch polls when the component mounts or when the activeTab changes
  useEffect(() => {
    if (activeTab === "ownPoll") {
      fetchOwnPolls();
    } else if (activeTab === "newPoll") {
      fetchNewPolls();
    } else if (activeTab === "previousPoll") {
      fetchPreviousPolls();
    }
  }, [activeTab]);

  // Function to fetch own polls
  const fetchOwnPolls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOwnPolls();
      const updatedPolls = response.polls.map((poll) => ({
        ...poll,
        optionCounts: calculateOptionCounts(poll.options, poll.responses),
      }));
      setPolls(updatedPolls);
    } catch (err) {
      setError("Failed to fetch polls. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch new polls
  const fetchNewPolls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await newPoll();
      const updatedPolls = response.polls.map((poll) => ({
        ...poll,
        optionCounts: calculateOptionCounts(poll.options, poll.responses),
      }));
      setNewPolls(updatedPolls);
    } catch (err) {
      setError("Failed to fetch new polls. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch previous polls
  const fetchPreviousPolls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await previousPolls();
      const updatedPolls = response.polls.map((poll) => ({
        ...poll,
        optionCounts: calculateOptionCounts(poll.options, poll.responses),
      }));
      setPreviousPollsData(updatedPolls);
    } catch (err) {
      setError("Failed to fetch previous polls. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate option counts and profile photos
  const calculateOptionCounts = (options, responses) => {
    const counts = {};

    // Initialize counts for all options
    options.forEach((option) => {
      counts[option] = { count: 0, profilePhotos: [] };
    });

    // Update counts based on responses
    responses.forEach((response) => {
      if (response.selectedOption) {
        if (counts[response.selectedOption] !== undefined) {
          counts[response.selectedOption].count++;
          if (response.residentId?.images?.profilePhoto) {
            counts[response.selectedOption].profilePhotos.push(response.residentId.images.profilePhoto);
          }
        }
      }
    });

    // Convert counts object to an array of { option, count, profilePhotos }
    return Object.keys(counts).map((option) => ({
      option,
      count: counts[option].count,
      profilePhotos: counts[option].profilePhotos,
    }));
  };

  // Function to handle poll creation
  const handleCreatePoll = (newPoll) => {
    setPolls([...polls, newPoll]);
  };

  return (
    <div className="flex flex-col rounded-none">
      <div>
        <div className="flex items-start self-start text-sm font-semibold text-center whitespace-nowrap">
          <button
            className={`gap-2.5 px-2.5 py-3.5 rounded-xl rounded-b-none border-b-2 border-solid min-h-[49px] w-[135px] ${
              activeTab === "ownPoll"
                ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] border-b-red-500"
                : "bg-white text-neutral-800 border-b-red-500"
            }`}
            onClick={() => setActiveTab("ownPoll")}
          >
            OwnPoll
          </button>
          <button
            className={`gap-2.5 px-2.5 py-3.5 rounded-xl rounded-b-none border-b-2 border-solid min-h-[49px] w-[135px] ${
              activeTab === "newPoll"
                ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] border-b-red-500"
                : "bg-white text-neutral-800 border-b-red-500"
            }`}
            onClick={() => setActiveTab("newPoll")}
          >
            NewPoll
          </button>
          <button
            className={`gap-2.5 px-2.5 py-3.5 rounded-xl rounded-b-none border-b-2 border-solid min-h-[49px] w-[135px] ${
              activeTab === "previousPoll"
                ? "text-white bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] border-b-red-500"
                : "bg-white text-neutral-800 border-b-red-500"
            }`}
            onClick={() => setActiveTab("previousPoll")}
          >
            PreviousPoll
          </button>
        </div>
      </div>

      {activeTab === "ownPoll" && (
        <div className="flex flex-col justify-center p-5 w-full bg-white rounded-none max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full font-semibold max-md:max-w-full">
              <div className="self-stretch my-auto text-xl text-neutral-800">
                Polls
              </div>
              <button
                className="gap-2.5 self-stretch px-3.5 py-3 my-auto text-lg text-center text-white rounded-xl bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)]"
                onClick={() => setIsSelectPollModalOpen(true)}
                aria-label="Create new poll"
              >
                Create Polls
              </button>
            </div>

            {/* Loading State */}
            {loading && <p>Loading polls...</p>}

            {/* Error State */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Polls List */}
            <div className="flex flex-wrap gap-5 items-start mt-5 max-md:max-w-full">
              {polls.map((poll, index) => {
                switch (poll.pollType) {
                  case "Rating":
                    return <RatingPollCard key={index} poll={poll} />;
                  case "Numeric":
                    return <NumberPollCard key={index} poll={poll} />;
                  case "Text":
                    return <TextPollCard key={index} poll={poll} />;
                  case "Multichoice":
                    return <PollCard key={index} poll={poll} />;
                  default:
                    return <PollCard key={index} poll={poll} />;
                }
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === "newPoll" && (
        <NewPoll polls={newPolls} />
      )}

      {activeTab === "previousPoll" && (
        <PreviousPoll polls={previousPollsData} />
      )}

      <SelectPollModal
        isOpen={isSelectPollModalOpen}
        onClose={() => setIsSelectPollModalOpen(false)}
        onSelectPoll={(pollType) => {
          setSelectedPollType(pollType);
          setIsSelectPollModalOpen(false);
          setIsCreatePollModalOpen(true);
        }}
      />

      <CreatePollModal
        isOpen={isCreatePollModalOpen}
        onClose={() => setIsCreatePollModalOpen(false)}
        onCreatePoll={handleCreatePoll}
        pollType={selectedPollType}
      />
    </div>
  );
};

export default CommunityPolls;