import React from "react";
import { PollCard } from "./PollCard";
import RatingPollCard from "./RatingPollCard";
import NumberPollCard from "./NumberPollCard";
import TextPollCard from "./TextPollCard";

const NewPoll = ({ polls }) => {
  return (
    <div className="flex flex-col justify-center p-5 w-full bg-white rounded-none max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="self-stretch my-auto font-semibold text-xl text-neutral-800">
          New Polls
        </div>
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
  );
};

export default NewPoll;