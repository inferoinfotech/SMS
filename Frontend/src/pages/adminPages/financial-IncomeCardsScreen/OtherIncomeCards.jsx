// src/pages/OtherIncomeCards.jsx
import React, { useState, useEffect } from "react";
import "./style.css";
import IncomeCard from "./IncomeCard";
import OtherIncomePoup from "./OtherIncomePoup";
import CustomButton from "../../../components/customButton/CustomButton";
import { getOtherIncomes, addOtherIncome, updateOtherIncome, deleteOtherIncome } from "../../../api/otherincomeApi";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const OtherIncomeCards = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const data = await getOtherIncomes();
      console.log("Fetched incomes:---------------------------------", data);
      
      const formattedData = data.incomes.map(income => ({
        ...income,
        date: formatDate(income.createdAt),
        time: formatTime(income.createdAt),
      }));
      setIncomes(formattedData);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const handleOpenPopup = (income = null) => {
    setSelectedIncome(income);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedIncome(null);
    setShowPopup(false);
  };

  const handleSave = async (income) => {
    try {
      if (selectedIncome) {
        // Update existing income
        await updateOtherIncome(selectedIncome._id, income);
        setIncomes(incomes.map((inc) => (inc._id === selectedIncome._id ? { ...inc, ...income } : inc)));
      } else {
        // Add new income
        const response = await addOtherIncome(income);
        // Format the new income data to match the structure of existing incomes
        const formattedNewIncome = {
          ...response.income, // Assuming the API returns { income: {...} }
          date: formatDate(response.income.createdAt),
          time: formatTime(response.income.createdAt),
        };
        setIncomes([...incomes, formattedNewIncome]);
      }
      handleClosePopup();
    } catch (error) {
      console.error('Error saving income:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOtherIncome(id);
      console.log("Deleted income with ID:", id);
      
      setIncomes(incomes.filter((income) => income._id !== id));
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  return (
    <div className="otherIncome">
      <div className="frame-577">
        <div className="frame-578">
          <div className="frame-579 flex-col sm:flex-row">
            <div className="text-wrapper-184">Other Income</div>
            <CustomButton
              text="Create Other Income"
              onClick={() => handleOpenPopup()}
            />
            {showPopup && (
              <div className="popup-overlay">
                <OtherIncomePoup
                  income={selectedIncome}
                  onCancel={handleClosePopup}
                  onSave={handleSave}
                />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 items-start mt-5 max-md:max-w-full h-[614px] overflow-y-scroll">
            {incomes.length === 0 ? (
              <div className="text-center text-gray-500 font-bold p-4">
                Data not found
              </div>
            ) : (
              incomes.map((income, index) => (
                <div key={index} className="flex income-card">
                  <IncomeCard
                    {...income}
                    onEdit={() => handleOpenPopup(income)}  
                    onDelete={() => handleDelete(income._id)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherIncomeCards;