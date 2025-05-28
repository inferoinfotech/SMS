import React, { useState, useEffect } from "react";
import CustomButton from "../customButton/CustomButton";
import "./style.css";
import images from "../../Images";
import { createExpense, updateExpense } from "../../api/expenseApi";

const AddExpenses = ({ closePopup, onAdd, onUpdate, itemToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [bill, setBill] = useState(null); // State to manage the bill file
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    date: "",
    amount: "",
    bill: "", // Add error state for bill
  });

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title || "");
      setDescription(itemToEdit.description || "");
      setDate(itemToEdit.date || "");
      setAmount(itemToEdit.amount || "");
      setBill(itemToEdit.bill || null); // Set the bill file if available
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setAmount("");
      setBill(null); // Reset the bill file state
      setErrors({ title: "", description: "", date: "", amount: "", bill: "" });
    }
  }, [itemToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {
      title: "",
      description: "",
      date: "",
      amount: "",
      bill: "",
    };

    if (!title) formErrors.title = "Title is required.";
    if (!description) formErrors.description = "Description is required.";
    if (!date) formErrors.date = "Date is required.";
    if (!amount) formErrors.amount = "Amount is required.";
    if (!bill) formErrors.bill = "Bill is required."; // Validate bill

    setErrors(formErrors);

    if (
      !formErrors.title &&
      !formErrors.description &&
      !formErrors.date &&
      !formErrors.amount &&
      !formErrors.bill
    ) {
      const expenseData = new FormData();
      expenseData.append("title", title);
      expenseData.append("description", description);
      expenseData.append("date", date);
      expenseData.append("amount", amount);
      if (bill instanceof File) expenseData.append("bill", bill);

      try {
        if (itemToEdit) {
          await updateExpense(itemToEdit._id, expenseData);
          onUpdate(itemToEdit.index, expenseData);
        } else {
          await createExpense(expenseData);
          onAdd(expenseData);
        }
        closePopup();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleBillChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      if (fileType === "jpg" || fileType === "pdf") {
        setBill(file);
        setErrors({ ...errors, bill: "" }); // Clear error if valid file type
      } else {
        setErrors({ ...errors, bill: "Only .jpg and .pdf files are allowed." });
      }
    }
  };

  return (
    <div className="element-add-expenses">
      <form>
        <div className="frame-519">
          <div className="frame-520">
            <div className="frame-520">
              <div className="frame-521">
                <div className="text-wrapper-168">Add Expenses Details</div>
                <img className="line-92" alt="Line" src={images.line94} />
              </div>
              <div className="frame-518">
                <div className="input-field-30">
                  <p className="label-36">
                    <span className="text-wrapper-169">Title</span>
                    <span className="text-wrapper-170">*</span>
                  </p>
                  <input
                    type="text"
                    className={`custom-input input-box ${
                      errors.title ? "error" : ""
                    }`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                  />
                  {errors.title && (
                    <div className="error-message">{errors.title}</div>
                  )}
                </div>
                <div className="input-field-31">
                  <p className="label-36">
                    <span className="text-wrapper-169">Description</span>
                    <span className="text-wrapper-170">*</span>
                  </p>
                  <input
                    type="text"
                    className={`custom-input input-box ${
                      errors.description ? "error" : ""
                    }`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Description"
                  />
                  {errors.description && (
                    <div className="error-message">{errors.description}</div>
                  )}
                </div>
                <div className="mt-4 date-field">
                  <div className="frame-522">
                    <div className="input-field-32">
                      <p className="label-36">
                        <span className="text-wrapper-169">Date</span>
                        <span className="text-wrapper-170">*</span>
                      </p>
                      <input
                        type="date"
                        className={`custom-input input-box ${
                          errors.date ? "error" : ""
                        }`}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      {errors.date && (
                        <div className="error-message">{errors.date}</div>
                      )}
                    </div>
                  </div>
                  <div className="frame-523">
                    <div className="input-field-33">
                      <p className="label-36">
                        <span className="text-wrapper-169">Amount</span>
                        <span className="text-wrapper-170">*</span>
                      </p>
                      <input
                        type="number"
                        className={`custom-input input-box ${
                          errors.amount ? "error" : ""
                        }`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                      />
                      {errors.amount && (
                        <div className="error-message">{errors.amount}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="sm:w-full w-auto mb-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Bill <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".jpg,.pdf"
                      onChange={handleBillChange}
                      style={{ display: "none" }}
                      id="billFileInput"
                    />
                    <label
                      htmlFor="billFileInput"
                      className="cursor-pointer flex items-center flex-col w-full border-2 border-dashed border-[#D3D3D3] p-6 rounded-md text-center"
                    >
                      {bill ? (
                        bill.type === "application/pdf" ? (
                          <div className="flex flex-col items-center">
                            <i className="bi bi-file-earmark-pdf text-6xl text-red-500 mb-3"></i>
                            <div className="text-gray-500 text-sm">
                              {bill.name}
                            </div>
                          </div>
                        ) : (
                          <img
                            src={
                              bill instanceof File
                                ? URL.createObjectURL(bill)
                                : bill
                            }
                            alt="Selected Bill"
                            className="max-w-full max-h-40 object-contain mb-3"
                          />
                        )
                      ) : (
                        <img
                          src={images.billImage}
                          alt="Dummy"
                          className="max-w-full max-h-40 object-contain mb-3"
                        />
                      )}
                      <div className="text-blue-500 font-bold">
                        Upload a file{" "}
                        <span className="text-[#4F4F4F]">or drag and drop</span>
                      </div>
                      <div className="text-gray-500 text-sm">
                        JPG, PDF up to 10MB
                      </div>
                    </label>

                    {errors.bill && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.bill}
                      </div>
                    )}
                  </div>
                </div>
                <div className="frame-265">
                  <button
                    type="button"
                    className="component hover-button-false border-button-true gray-button-false component-55 mr-5"
                    onClick={closePopup}
                  >
                    <div className="buttons component-56">Cancel</div>
                  </button>
                  <CustomButton
                    text={itemToEdit ? "Update" : "Save"}
                    onClick={handleSubmit}
                    imageType="Add"
                    width="170px"
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpenses;
