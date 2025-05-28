import React from "react";
import ProtocolListItem from "./RequestListItem";

const requestData = [
  {
    title: "Rent or Mortgage",
    description: "A visual representation of your spending categories...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Housing Costs",
    description: "Rack the fluctuations in your spending over we time...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Property Taxes",
    description: "Easily compare your planned budget against we your...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Transportation",
    description: "Identify your largest expenditures, you a enabling you...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Financial Breakdown",
    description: "Tailor the dashboard to your unique financial we goals...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Expense Tracker",
    description: "preferences by categorizing and organizing your expe...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Personal Expenses",
    description: "future and adjust your budget will become accordingly...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Rent or Mortgage",
    description: "expenses will becomea way that makes sense for you....",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Cost Management Hub",
    description: "Helping you identify where your money is it is a going...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Entertainment",
    description: "Simply navigate through the different sections a to get...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Rent or Mortgage",
    description: "A visual representation of your spending categories...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Rent or Mortgage",
    description: "A visual representation of your spending categories...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Housing Costs",
    description: "Rack the fluctuations in your spending over we time...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Property Taxes",
    description: "Easily compare your planned budget against we your...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Transportation",
    description: "Identify your largest expenditures, you a enabling you...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Financial Breakdown",
    description: "Tailor the dashboard to your unique financial we goals...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Expense Tracker",
    description: "preferences by categorizing and organizing your expe...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Personal Expenses",
    description: "future and adjust your budget will become accordingly...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Rent or Mortgage",
    description: "expenses will becomea way that makes sense for you....",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Cost Management Hub",
    description: "Helping you identify where your money is it is a going...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Entertainment",
    description: "Simply navigate through the different sections a to get...",
    date: "09/11/200",
    time: "2:45 AM",
  },
  {
    title: "Rent or Mortgage",
    description: "A visual representation of your spending categories...",
    date: "09/11/200",
    time: "2:45 AM",
  },
];

const ProtocolDetailList = ({ protocols, onEdit, onDelete, onView }) => {
  return (
    <div className="flex flex-col mt-5 max-md:max-w-full">
      <div className="flex flex-col max-w-full w-full">
        <div className="flex flex-col w-full text-sm font-semibold max-w-full text-neutral-800 max-md:max-w-full overflow-x-scroll">
          <div className="flex py-4 px-5 w-full bg-indigo-100 rounded-t-3xl">
            <div className="md:min-w-[282px] grow">Title</div>
            <div className="md:w-[515px] w-full">Description</div>
            <div className="md:w-[250px] w-full text-center">Date</div>
            <div className="md:w-[183px] w-full text-center">Time</div>
            <div className="md:w-[207px] w-full text-center pl-[60px]">
              Action
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-[760px] overflow-scroll">
        {/* {Array.isArray(protocols) &&
          protocols.map((protocol, index) => (
            <ProtocolListItem
              key={protocol._id}
              {...protocol}
              onEdit={() => onEdit(index)}
              onDelete={() => onDelete(index)}
              onView={() => onView(index)}
            />
          ))} */}

        {Array.isArray(protocols) && protocols.length === 0 ? (
          <div className="text-center text-gray-500 font-bold p-4">Data not found</div>
        ) : (
          protocols.map((protocol, index) => {
            return (
              <ProtocolListItem
                key={protocol._id}
                {...protocol}
                onEdit={() => onEdit(index)}
                onDelete={() => onDelete(index)}
                onView={() => onView(index)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProtocolDetailList;
