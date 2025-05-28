import { createComplaint, deleteComplaint, getComplaints, updateComplaint } from "@/api/createComplaintApi";
import React, { createContext, useState, useEffect } from "react";

export const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const addComplaint = async (complaint) => {
    try {
      const newComplaint = await createComplaint(complaint);
      setComplaints([...complaints, newComplaint]);
    } catch (error) {
      console.error("Error adding complaint:", error);
    }
  };

  const updateComplaintHandler = async (index, updatedComplaint) => {
    try {
      const complaintId = complaints[index]?._id;
      if (!complaintId) {
        console.error("Complaint ID is undefined");
        return;
      }
      const updatedComplaintData = await updateComplaint(complaintId, updatedComplaint);
      const updatedComplaints = [...complaints];
      updatedComplaints[index] = updatedComplaintData;
      setComplaints(updatedComplaints);
    } catch (error) {
      // console.error("Error updating complaint:", error);
    }
  };

  const deleteComplaintHandler = async (index) => {
    try {
      const complaintId = complaints[index]?._id;
      if (!complaintId) {
        console.error("Complaint ID is undefined");
        return;
      }
      await deleteComplaint(complaintId);
      const updatedComplaints = complaints.filter((_, i) => i !== index);
      setComplaints(updatedComplaints);
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
    <ComplaintContext.Provider
      value={{ complaints, addComplaint, updateComplaintHandler, deleteComplaintHandler }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};