import React from "react";
import ExpenseListItem from "./ExpenseListItem";

function ExpenseDetailsList({ expenses, onEdit, onDelete, onView }) {
  return (
    <div className="flex flex-col mt-5 max-md:max-w-full">
      <div className="flex flex-col max-w-full w-full">
        <div className="flex flex-col w-full text-sm font-semibold max-w-full text-neutral-800 max-md:max-w-full">
          <div className="flex py-4 px-5 w-full bg-indigo-100 rounded-t-3xl overflow-x-scroll">
            <div className="w-[246px] grow">Title</div>
            <div className="w-[580px] text-left">Description</div>
            <div className="w-[166px] text-center">Date</div>
            <div className="w-[173px] text-center">Amount</div>
            <div className="w-[227px] text-center pl-3">Bill Format</div>
            <div className="w-[143px] text-center">Action</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full overflow-x-scroll">
        {/* {expenses.map((expense, index) => (
          <ExpenseListItem
            key={index}
            {...expense}
            onEdit={() => onEdit(index)}
            onDelete={() => onDelete(index, expense._id)} // Pass expenseId here
            onView={() => onView(index)}
          />
        ))} */}

        {expenses.length === 0 ? (
          <div className="text-center text-gray-500 font-bold p-4">
            Data not found
          </div>
        ) : (
          expenses.map((expense, index) => (
            <ExpenseListItem
              key={index}
              {...expense}
              onEdit={() => onEdit(index)}
              onDelete={() => onDelete(index, expense._id)} // Pass expenseId here
              onView={() => onView(index)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseDetailsList;
