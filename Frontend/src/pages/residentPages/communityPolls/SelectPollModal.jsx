import React, { useState } from "react";

const SelectPollModal = ({ isOpen, onClose, onSelectPoll }) => {
  const [selectedPollType, setSelectedPollType] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 border-b border-solid border-[#F4F4F4] pb-2">
          Select Polls
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-sm mb-1">
              Polls <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full rounded-[10px] px-3 py-2 border"
              value={selectedPollType}
              onChange={(e) => setSelectedPollType(e.target.value)}
            >
              <option disabled value="">
                Select Poll
              </option>
              <option value="Single Choice Poll">Single Choice Poll</option>
              <option value="Multiple Choice Poll">Multiple Choice Poll</option>
              <option value="Rating Poll">Rating Poll</option>
              <option value="Numeric Poll">Numeric Poll</option>
              <option value="Text Poll">Text Poll</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4 w-full">
          <button
            onClick={onClose}
            className="px-4 py-3 border border-solid border-[#D3D3D3] text-gray-600 rounded-[10px] w-full mr-3"
          >
            Cancel
          </button>
          <button
            onClick={() => onSelectPoll(selectedPollType)}
            className="px-4 py-3 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-[10px] w-full"
            disabled={!selectedPollType}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectPollModal;