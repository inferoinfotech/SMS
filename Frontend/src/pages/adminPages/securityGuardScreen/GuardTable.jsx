import React from "react";
import GuardTableRow from "./GuardTableRow";
import GuardTableHeader from "./GuardTableHeader";

function GuardTable({ guards, onEdit, onDelete, onView, onClose }) {
  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <GuardTableHeader />
      {guards.length === 0 ? (
        <div className="text-center text-gray-500 font-bold p-4">
          Data not found
        </div>
      ) : (
        guards.map((guard, index) => (
          <GuardTableRow
            key={index}
            {...guard}
            onEdit={() => onEdit(index)}
            onDelete={() => onDelete(index)}
            onView={() => onView(index)}
          />
        ))
      )}
    </div>
  );
}

export default GuardTable;
