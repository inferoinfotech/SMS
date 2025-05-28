import React, { useState, useEffect } from 'react';
import ExpenseDetailsList from './ExpenseDetailsList';
import CustomButton from '../../../components/customButton/CustomButton';
import AddExpenses from '../../../components/addExpenses/AddExpenses';
import ViewExpense from '../../../components/viewExpense/ViewExpense';
import { getExpense, deleteExpense } from '../../../api/expenseApi';

const FinancialExpanse = () => {
  const [expenses, setExpenses] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToView, setItemToView] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => { 
    try {
      const response = await getExpense();
      setExpenses(response);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    if (!isPopupOpen) {
      setItemToEdit(null); // Clear itemToEdit when opening the popup for adding new expense
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setItemToEdit(null); // Clear itemToEdit when closing the popup
  };

  const toggleViewPopup = () => {
    setIsViewPopupOpen(!isViewPopupOpen);
  }

  const closeViewPopup = () => {
    setIsViewPopupOpen(false);
    setItemToView(null); // Clear itemToView when closing the view popup
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const updateExpense = (index, updatedExpense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = updatedExpense;
    setExpenses(updatedExpenses);
  };

  const handleDelete = async (index, expenseId) => {
    try {
      await deleteExpense(expenseId);
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEdit = (index) => {
    setItemToEdit({ ...expenses[index], index });
    setIsPopupOpen(true); // Ensure the popup is open when editing
  };

  const handleView = (index) => {
    setItemToView(expenses[index]);
    setIsViewPopupOpen(true); // Ensure the view popup is open when viewing
  };

  return (
    <div className="relative">
      <div className="flex overflow-hidden flex-col p-5 w-full bg-white rounded-xl rounded-tl-none max-md:max-w-full">
        <div className="flex flex-col max-md:max-w-full">
          <div className="flex flex-col sm:flex-row justify-between font-semibold w-full">
            <h1 className="self-stretch my-auto text-xl text-neutral-800">
              Add Expenses Details
            </h1>
            <CustomButton text='Add New Expenses details' imageType='Add' onClick={togglePopup} />
          </div>
          <ExpenseDetailsList
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView} // Pass the onView handler
          />
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <AddExpenses
              closePopup={closePopup}
              onAdd={addExpense}
              onUpdate={updateExpense}
              itemToEdit={itemToEdit}
            />
          </div>
        </div>
      )}
      {isViewPopupOpen && (
        <ViewExpense
          expense={itemToView}
          onClose={closeViewPopup}
        />
      )}
    </div>
  );
};

export default FinancialExpanse;