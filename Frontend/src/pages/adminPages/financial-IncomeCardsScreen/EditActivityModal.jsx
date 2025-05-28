import React, { useState, useEffect } from "react";
import moment from "moment";

const EditActivityModal = ({ activity, onSave, onCancel }) => {
  const [editedActivity, setEditedActivity] = useState({
    title: activity?.Announcement_title || "",
    amount: activity?.amount || "",
    totalMembers: activity?.totalMembers || "",
    date: activity?.date ? moment(activity.date).format("YYYY-MM-DD") : "", // Format for input
    dueDate: activity?.createdAt ? moment(activity.createdAt).format("YYYY-MM-DD") : "", // Format for input
    description: activity?.description || "",
  });

  useEffect(() => {
    setEditedActivity({
      title: activity?.Announcement_title || "",
      amount: activity?.amount || "",
      totalMembers: activity?.totalMembers || "",
      date: activity?.date ? moment(activity.date).format("YYYY-MM-DD") : "", // Format for input
      dueDate: activity?.createdAt ? moment(activity.createdAt).format("YYYY-MM-DD") : "", // Format for input
      description: activity?.description || "",
    });
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedActivity({ ...editedActivity, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedActivity);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-[10px] shadow-lg w-full max-w-md">
        <h2 className="text-[20px] font-semibold mb-4 border-b border-solid border-[#F4F4F4] pb-3">
          {activity ? "Edit Activity" : "Create Activity"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              placeholder="Enter Title"
              value={editedActivity.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="amount">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              name="amount"
              placeholder="Enter Amount"
              value={editedActivity.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="totalMembers"
            >
              Total Members <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="totalMembers"
              type="text"
              name="totalMembers"
              placeholder="Enter Total Members"
              value={editedActivity.totalMembers}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex md:flex-row flex-col items-center w-full mb-4">
            <div className="mr-5">
              <label className="block text-sm font-medium mb-2" htmlFor="date">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                name="date"
                placeholder="Select Date"
                value={editedActivity.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="Duedate"
              >
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Duedate"
                type="date"
                name="dueDate"
                placeholder="Select Due Date"
                value={editedActivity.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Description"
              type="text"
              name="description"
              placeholder="Enter Description"
              value={editedActivity.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end w-full">
            <button
              className="bg-transparent border border-solid border-[#D3D3D3] text-[#202224] font-medium py-3 px-3 rounded-[10px] mr-2 w-full"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-[#F6F8FB] hover:bg-[linear-gradient(90deg,#FE512E_0%,#F09619_100%)] text-[#202224] hover:text-white font-medium py-2 px-4 rounded-[10px] w-full"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditActivityModal;