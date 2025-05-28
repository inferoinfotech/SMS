import React, { useState } from 'react';
import './style.css';
import images from '../../Images';

const AddParticipator = ({ onClose, onAdd }) => {
    const [unitNumber, setUnitNumber] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [status, setStatus] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!unitNumber) newErrors.unitNumber = 'Unit Number is required';
        if (!paymentDate) newErrors.paymentDate = 'Payment Date is required';
        if (!status) newErrors.status = 'Status is required';
        if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!amount) newErrors.amount = 'Amount is required';
        if (!paymentMethod) newErrors.paymentMethod = 'Payment Method is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onAdd({ unitNumber, paymentDate, status, phoneNumber, amount, paymentMethod });
            onClose();
        }
    };

    return (
        <div className='add-participator-screen'>
            <div className="overlay"></div>
            <div className="frame-247">
                <div className="frame-248">
                    <div className="frame-249">
                        <div className="text-wrapper-86">Add Participator</div>
                        <img className="line-46" alt="Line" src={images.line94} />
                    </div>
                    <div className="frame-248">
                        <div className="frame-248">
                            <div className="frame-245">
                                <div className="input-field-10">
                                    <p className="label-18">
                                        <span className="text-wrapper-88">Unit Number</span>
                                        <span className="text-wrapper-89">*</span>
                                    </p>
                                    <input
                                        className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-62 ${errors.unitNumber ? 'error' : ''}`}
                                        type="text"
                                        value={unitNumber}
                                        onChange={(e) => setUnitNumber(e.target.value)}
                                        placeholder="D 1001"
                                    />
                                    {errors.unitNumber && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.unitNumber}</div>}
                                </div>
                                <div className="input-field-10">
                                    <p className="label-18">
                                        <span className="text-wrapper-88">Payment Date</span>
                                        <span className="text-wrapper-89">*</span>
                                    </p>
                                    <input
                                        className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-62 ${errors.paymentDate ? 'error' : ''}`}
                                        type="date"
                                        value={paymentDate}
                                        onChange={(e) => setPaymentDate(e.target.value)}
                                        placeholder="Select Payment Date"
                                    />
                                    {errors.paymentDate && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.paymentDate}</div>}
                                </div>
                                <div className="input-field-10">
                                    <p className="label-18">
                                        <span className="text-wrapper-88">Status</span>
                                        <span className="text-wrapper-89">*</span>
                                    </p>
                                    <select
                                        className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-62 ${errors.status ? 'error' : ''}`}
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Tenant">Tenant</option>
                                        <option value="Owner">Owner</option>
                                    </select>
                                    {errors.status && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.status}</div>}
                                </div>
                                <div className="input-field-10">
                                    <p className="label-18">
                                        <span className="text-wrapper-88">Phone Number</span>
                                        <span className="text-wrapper-89">*</span>
                                    </p>
                                    <input
                                        className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-62 ${errors.phoneNumber ? 'error' : ''}`}
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="+91"
                                    />
                                    {errors.phoneNumber && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.phoneNumber}</div>}
                                </div>
                                <div className="input-field-10">
                                    <p className="label-18">
                                        <span className="text-wrapper-88">Amount</span>
                                        <span className="text-wrapper-89">*</span>
                                    </p>
                                    <input
                                        className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-62 ${errors.amount ? 'error' : ''}`}
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Enter Amount"
                                    />
                                    {errors.amount && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.amount}</div>}
                                </div>
                                <div className="input-field-10">
                                    <p className="label-18">
                                        <span className="text-wrapper-88">Payment Method</span>
                                        <span className="text-wrapper-89">*</span>
                                    </p>
                                    <select
                                        className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-62 ${errors.paymentMethod ? 'error' : ''}`}
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Online">Online</option>
                                    </select>
                                    {errors.paymentMethod && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.paymentMethod}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="frame-252">
                            <button type="button" className="component hover-button-false border-button-true gray-button-false component-55" onClick={onClose}>
                                <div className="buttons component-56">Cancel</div>
                            </button>
                            <button type="submit" className="component component-9 hover-button-true rounded-lg border-button-false gray-button-true component-57" onClick={handleSubmit}>
                                <div className="buttons undefined">Save</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddParticipator;