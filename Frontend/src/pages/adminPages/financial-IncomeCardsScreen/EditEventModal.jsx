import { useState, useEffect } from "react";
import moment from "moment";

const EditEventModal = ({ event, onSave, onCancel }) => {
  const [editedEvent, setEditedEvent] = useState({
    title: event?.Announcement_title || "",
    amount: event?.amount || "",
    totalMembers: event?.totalMembers || "",
    date: event?.date ? moment(event.date).format("DD/MM/YYYY") : "", // Format for input
    dueDate: event?.dueDate ? moment(event.dueDate).format("DD/MM/YYYY") : "", // Format for input
    description: event?.description || "",
  });

  useEffect(() => {
    // Update the form fields when the `event` prop changes
    setEditedEvent({
      title: event?.Announcement_title || "",
      amount: event?.amount || "",
      totalMembers: event?.totalMembers || "",
      date: event?.date ? moment(event.date).format("DD/MM/YYYY") : "", // Format for input
      dueDate: event?.dueDate ? moment(event.dueDate).format("DD/MM/YYYY") : "", // Format for input
      description: event?.description || "",
    });
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedEvent);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-[10px] shadow-lg w-full max-w-md">
        <h2 className="text-[20px] font-semibold mb-4 border-b border-solid border-[#F4F4F4] pb-3">
          {event ? "Edit Event" : "Create Event"}
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
              value={editedEvent.title}
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
              value={editedEvent.amount}
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
              value={editedEvent.totalMembers}
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
                value={editedEvent.date}
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
                value={editedEvent.dueDate}
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
              value={editedEvent.description}
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

export default EditEventModal;