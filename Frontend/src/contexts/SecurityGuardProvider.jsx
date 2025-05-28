// src/SecurityGuardContext.js
import { addSecurityGuard, deleteSecurityGuard, getSecurityGuards, updateSecurityGuard } from "@/api/securityGuardApi";
import React, { createContext, useState, useEffect } from "react";
// import { getSecurityGuards } from "./api/securityGuardApi";

export const SecurityGuardContext = createContext();

export const SecurityGuardProvider = ({ children }) => {
  const [guards, setGuards] = useState([]);
  useEffect(() => {
    fetchSecurityGuards();
  }, []);

  const fetchSecurityGuards = async () => {
    try {
      const data = await getSecurityGuards();
      setGuards(data);
    } catch (error) {
      console.error("Error fetching security guards:", error);
    }
  };

  const addGuard = async (guard) => {
    try {
      const response = await addSecurityGuard(guard);
      setGuards([...guards, response.data]);
    } catch (error) {
      console.error("Error adding security guard:", error);
    }
  };

  const updateGuard = async (index, guardData) => {
    try {
      const _id = guardData.get("_id");
      const response = await updateSecurityGuard(_id, guardData);
      const updatedGuards = [...guards];
      updatedGuards[index] = response.data;
      setGuards(updatedGuards);
    } catch (error) {
      console.error("Error updating security guard:", error);
    }
  };

  const deleteGuard = async (index) => {
    try {
      await deleteSecurityGuard(guards[index]._id);
      const updatedGuards = guards.filter((_, i) => i !== index);
      setGuards(updatedGuards);
    } catch (error) {
      console.error("Error deleting security guard:", error);
    }
  };

  return (
    <SecurityGuardContext.Provider
      value={{ guards, addGuard, updateGuard, deleteGuard }}
    >
      {children}
    </SecurityGuardContext.Provider>
  );
};