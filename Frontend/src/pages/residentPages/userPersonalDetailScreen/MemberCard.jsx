import React from "react";

function MemberCard({ fullName, email, phoneNumber, age, gender, relation }) {
  return (
    <article className="flex flex-col min-w-[240px] w-[370px]">
      <div className="flex flex-col max-w-full text-base font-medium text-white rounded-none w-[370px]">
        <header className="p-4 bg-[#5678E9] rounded-xl rounded-b-none max-md:pr-5">
          {fullName}
        </header>
      </div>
      <div className="flex flex-col justify-center p-4 max-w-full text-sm bg-white rounded-none border-r border-b border-l border-solid border-b-[#5678E9] border-b-opacity-30 border-x-[#5678E9] border-x-opacity-30 rounded-b-[10px] w-[370px]">
        <div className="flex flex-col justify-center w-full max-w-[340px]">
          <div className="flex gap-10 justify-between items-center w-full whitespace-nowrap">
            <h3 className="self-stretch my-auto text-neutral-600">Email</h3>
            <p className="self-stretch my-auto font-medium text-neutral-800">
              {email}
            </p>
          </div>
          <div className="flex gap-10 justify-between items-center mt-1.5 w-full whitespace-nowrap">
            <h3 className="self-stretch my-auto text-neutral-600">phone Number</h3>
            <p className="self-stretch my-auto font-medium text-neutral-800">{phoneNumber}</p>
          </div>
          <div className="flex gap-10 justify-between items-center mt-1.5 w-full whitespace-nowrap">
            <h3 className="self-stretch my-auto text-neutral-600">Age</h3>
            <p className="self-stretch my-auto font-medium text-neutral-800">
              {age}
            </p>
          </div>
          <div className="flex gap-10 justify-between items-center mt-1.5 w-full whitespace-nowrap">
            <h3 className="self-stretch my-auto text-neutral-600">Gender</h3>
            <p className="self-stretch my-auto font-medium text-neutral-800">
              {gender}
            </p>
          </div>
          <div className="flex gap-10 justify-between items-center mt-1.5 w-full whitespace-nowrap">
            <h3 className="self-stretch my-auto text-neutral-600">Relation</h3>
            <p className="self-stretch my-auto font-medium text-neutral-800">
              {relation}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MemberCard;
