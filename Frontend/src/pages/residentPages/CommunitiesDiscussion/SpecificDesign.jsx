import React from "react";

const SpecificDesign = () => {
  return (
    <div className="flex grow flex-col gap-4 p-5 h-[calc(100vh-200px)] overflow-y-auto">
      {/* Add the specific design content here */}
      <div className="bg-[rgba(86,120,233,0.05)] border border-solid border-[#5678E9] p-3 rounded-lg w-full">
        <div className="font-normal text-[20px] text-[#4F4F4F] mb-4">
          Writing a good question
        </div>
        <div className="text-base font-normal text-[#202224]">
          You're ready to <span className="text-[#5678E9]">ask</span> a{" "}
          <span className="text-[#5678E9]">programming-related question</span>{" "}
          and this form will help guide you through the process.
        </div>
        <div className="text-base font-normal text-[#202224]">
          Looking to ask a non-programming question? See{" "}
          <span className="text-[#5678E9]">the topics here</span> to find a
          relevant site.
        </div>
        <div className="text-[18px] font-medium text-[#202224] mt-6 mb-2">
          Steps
        </div>
        <div className="text-base font-normal text-[#202224] mb-1">
          1. Summarize your problem in a one-line title
        </div>
        <div className="text-base font-normal text-[#202224] mb-1">
          2. Describe your problem in more detail.
        </div>
        <div className="text-base font-normal text-[#202224] mb-1">
          3. Describe what you tried and what you expected to happen.
        </div>
        <div className="text-base font-normal text-[#202224] mb-1">
          4. Add "tags" which help surface your question to members of the
          community
        </div>
      </div>
      <div className="bg-[#F4F4F4] border border-solid border-[#D3D3D3] p-3 rounded-lg w-full mt-5">
        <div className="text-base font-medium text-[#202224]">Title</div>
        <div className="text-base font-normal text-[#202224] mb-4">
          Be specific and imagine you're asking a question to another person.
        </div>
        <form>
          <input
            type="text"
            name="question"
            id="question"
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            className="w-full p-3 border border-solid border-[#D3D3D3] rounded-[10px] focus:border-[#5678E9] focus:outline-none focus:ring-1 focus:ring-[#5678E9] mt-2"
          />
        <button type="submit" className="gap-2.5 py-3 mt-2.5 text-lg font-semibold text-center text-white rounded-xl bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] w-[70px]">Next</button>
        </form>
      </div>
    </div>
  );
};

export default SpecificDesign;
