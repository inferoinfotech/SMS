import React, { useState, useEffect } from 'react';
import './style.css';
import images from '../../Images';

const AddSecurity = ({ onClose, onAdd, onUpdate, itemToEdit }) => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [shift, setShift] = useState('');
    const [shiftDate, setShiftDate] = useState('');
    const [shiftTime, setShiftTime] = useState('');
    const [aadharCard, setAadharCard] = useState(null); // Store the file object
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (itemToEdit) {
            setFullName(itemToEdit.name || '');
            setPhoneNumber(itemToEdit.phone || '');
            setGender(itemToEdit.gender || '');
            setShift(itemToEdit.shift || '');
            setShiftDate(itemToEdit.date || '');
            setShiftTime(itemToEdit.time || '');
            // Do not set aadharCard here, as it's a file input
        } else {
            setFullName('');
            setPhoneNumber('');
            setGender('');
            setShift('');
            setShiftDate('');
            setShiftTime('');
            setAadharCard(null);
            setErrors({});
        }
    }, [itemToEdit]);

    const validateForm = () => {
        const newErrors = {};
        if (!fullName) newErrors.fullName = 'Full Name is required';
        if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!gender) newErrors.gender = 'Gender is required';
        if (!shift) newErrors.shift = 'Shift is required';
        if (!shiftDate) newErrors.shiftDate = 'Shift Date is required';
        if (!shiftTime) newErrors.shiftTime = 'Shift Time is required';
        if (!aadharCard) newErrors.aadharCard = 'Aadhar Card is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (itemToEdit) {
                onUpdate(itemToEdit.index, { fullName, phoneNumber, gender, shift, shiftDate, shiftTime, aadharCard });
            } else {
                onAdd({ fullName, phoneNumber, gender, shift, shiftDate, shiftTime, aadharCard });
            }
            onClose();
        }
    };

    const handleFileChange = (e) => {
        setAadharCard(e.target.files[0]);
    };

    return (
        <div className='element-add-security-screen'>
            <div className="frame-247">
                <div className="frame-248">
                    <div className="frame-249">
                        <div className="text-wrapper-86">{itemToEdit ? 'Edit Security' : 'Add Security'}</div>
                        <img className="line-46" alt="Line" src={images.line94} />
                    </div>
                    <div className="frame-248">
                        <div className="frame-248">
                            <div className="frame-250">
                                <div className="vuesax-bold-camera-wrapper">
                                    <svg className="vuesax-bold-camera-1 vuesax-bold-camera" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path className="path" d="M18 6C17.39 6 16.83 5.65 16.55 5.11L15.83 3.66C15.37 2.75 14.17 2 13.15 2H10.86C9.83 2 8.63 2.75 8.17 3.66L7.45 5.11C7.17 5.65 6.61 6 6 6C3.83 6 2.11 7.83 2.25 9.99L2.77 18.25C2.89 20.31 4 22 6.76 22H17.24C20 22 21.1 20.31 21.23 18.25L21.75 9.99C21.89 7.83 20.17 6 18 6ZM10.5 7.25H13.5C13.91 7.25 14.25 7.59 14.25 8C14.25 8.41 13.91 8.75 13.5 8.75H10.5C10.09 8.75 9.75 8.41 9.75 8C9.75 7.59 10.09 7.25 10.5 7.25ZM12 18.12C10.14 18.12 8.62 16.61 8.62 14.74C8.62 12.87 10.13 11.36 12 11.36C13.87 11.36 15.38 12.87 15.38 14.74C15.38 16.61 13.86 18.12 12 18.12Z" fill="#292D32"></path>
                                        <g className="g" opacity="0"></g>
                                    </svg>
                                </div>
                                <div className="text-wrapper-87">Add Photo</div>
                            </div>
                            <div className="frame-245">
                                <div className="input-field-10">
                                    <p className="label-18">
                                        <span className="text-wrapper-88">Full Name</span>
                                        <span className="text-wrapper-89">*</span>
                                    </p>
                                    <input
                                        className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-62 ${errors.fullName ? 'error' : ''}`}
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter Full Name"
                                    />
                                    {errors.fullName && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.fullName}</div>}
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
                                <div className="frame-251">
                                    <div className="input-field-11">
                                        <p className="label-18">
                                            <span className="text-wrapper-88">Gender</span>
                                            <span className="text-wrapper-89">*</span>
                                        </p>
                                        <input
                                            className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-63 ${errors.gender ? 'error' : ''}`}
                                            type="text"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            placeholder="Select Gender"
                                        />
                                        {errors.gender && <div className="incorrect-email error-false rupee-error-0-false component-64">{errors.gender}</div>}
                                    </div>
                                    <div className="input-field-11">
                                        <p className="label-18">
                                            <span className="text-wrapper-88">Shift</span>
                                            <span className="text-wrapper-89">*</span>
                                        </p>
                                        <input
                                            className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-63 ${errors.shift ? 'error' : ''}`}
                                            type="text"
                                            value={shift}
                                            onChange={(e) => setShift(e.target.value)}
                                            placeholder="Select Shift"
                                        />
                                        {errors.shift && <div className="incorrect-email error-false rupee-error-0-false component-64">{errors.shift}</div>}
                                    </div>
                                </div>
                                <div className="frame-251">
                                    <div className="input-field-11">
                                        <p className="label-18">
                                            <span className="text-wrapper-88">Shift Date</span>
                                            <span className="text-wrapper-89">*</span>
                                        </p>
                                        <input
                                            className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-63 ${errors.shiftDate ? 'error' : ''}`}
                                            type="date"
                                            value={shiftDate}
                                            onChange={(e) => setShiftDate(e.target.value)}
                                            placeholder="Select Date"
                                        />
                                        {errors.shiftDate && <div className="incorrect-email error-false rupee-error-0-false component-64">{errors.shiftDate}</div>}
                                    </div>
                                    <div className="input-field-11">
                                        <p className="label-18">
                                            <span className="text-wrapper-88">Shift Time</span>
                                            <span className="text-wrapper-89">*</span>
                                        </p>
                                        <input
                                            className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-63 ${errors.shiftTime ? 'error' : ''}`}
                                            type="time"
                                            value={shiftTime}
                                            onChange={(e) => setShiftTime(e.target.value)}
                                            placeholder="Select Time"
                                        />
                                        {errors.shiftTime && <div className="incorrect-email error-false rupee-error-0-false component-64">{errors.shiftTime}</div>}
                                    </div>
                                </div>
                                <div className="input-field-12">
                                    <p className="label-18">
                                        <span className="text-wrapper-88">Upload Aadhar Card</span>
                                        <span className="text-wrapper-89">*</span>
                                    </p>
                                    <input
                                        className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-65 ${errors.aadharCard ? 'error' : ''}`}
                                        type="file"
                                        onChange={handleFileChange}
                                        placeholder="Upload a file"
                                    />
                                    {errors.aadharCard && <div className="incorrect-email error-false rupee-error-0-false component-64">{errors.aadharCard}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="frame-252">
                            <button type="button" className="component hover-button-false border-button-true gray-button-false component-55" onClick={onClose}>
                                <div className="buttons component-56">Cancel</div>
                            </button>
                            <button type="submit" className="component-9 hover-button-true border-button-false gray-button-true component-57" onClick={handleSubmit}>
                                <div className="buttons undefined">{itemToEdit ? 'Update' : 'Save'}</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSecurity;