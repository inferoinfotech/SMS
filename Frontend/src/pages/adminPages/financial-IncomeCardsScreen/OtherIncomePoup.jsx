// src/pages/OtherIncomePoup.jsx
import React, { useState, useEffect } from "react";

const OtherIncomePoup = ({ income, onCancel, onSave }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (income) {
      setTitle(income.title);
      setAmount(income.amount);
      setDate(income.date);
      setDescription(income.description);
      setTime(income.time);
    } else {
      setTitle("");
      setAmount("");
      setDate("");
      setDescription("");
      setTime("");
    }
  }, [income]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncome = {
      title,
      amount: parseFloat(amount),
      date,
      description,
      time,
    };
    onSave(newIncome);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-[10px] shadow-lg w-full max-w-md">
        <h2 className="text-[20px] font-semibold mb-4 border-b border-solid border-[#F4F4F4] pb-3">
          {income ? "Edit Other Income" : "Create Other Income"}
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
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              type="number"
              placeholder="0000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                value={date}
                placeholder="Select Date"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-2" htmlFor="time">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border rounded-[10px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="time"
                type="time"
                placeholder="Select Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherIncomePoup;