import React, { useState } from "react";

const CoomunitiesChatHeader = ({ searchTerm, setSearchTerm, setShowSpecificDesign, showSpecificDesign }) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleAskQuestionClick = () => {
    setShowSpecificDesign(true);
  };

  return (
    <div className="flex flex-wrap gap-5 justify-between px-5 py-5 w-full text-base font-medium bg-white rounded-tr-2xl max-md:max-w-full relative">
      <div className="flex gap-4">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d91373ffe8facbef34460ad2db2768acb601f883355f9d20aef81de11e743a5?placeholderIfAbsent=true&apiKey=d8c5f2c1accc4d81819c9cc495d39210"
          className="object-contain shrink-0 self-start w-12 aspect-square min-h-[48px]"
        />
        <div className="flex flex-col">
          <div className="text-neutral-800">Community</div>
          <div className="self-start mt-1 text-neutral-400">9:00 Pm</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {showSearch ? (
          <input
            type="text"
            placeholder="Search in conversation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border rounded-md outline-none"
            autoFocus
          />
        ) : (
          <>
            {!showSpecificDesign && (
              <button
                className="gap-2.5 px-14 py-3 mt-2.5 text-lg font-semibold text-center text-white rounded-xl bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] w-full max-md:px-5"
                onClick={handleAskQuestionClick}
              >
                Ask Question
              </button>
            )}
          </>
        )}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CoomunitiesChatHeader;