import React, { useState, useEffect } from 'react';
import './style.css';
import { addImportantNumber, updateImportantNumber } from '../../api/importantNumberApi';

const AddNumber = ({ onClose, onAdd, onUpdate, numberToEdit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [work, setWork] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (numberToEdit) {
            setName(numberToEdit.name);
            setPhone(numberToEdit.phoneNumber);
            setWork(numberToEdit.work);
        } else {
            setName('');
            setPhone('');
            setWork('');
            setErrors({});
        }
    }, [numberToEdit]);

    const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = 'Full Name is required';
        if (!phoneNumber) formErrors.phoneNumber = 'Phone Number is required';
        if (!work) formErrors.work = 'Work is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("not if",name,phoneNumber,work)
        
        if (validateForm()) {
            console.log("if",name,phoneNumber,work)
            try {
                const adminId = localStorage.getItem('adminId');
                if (numberToEdit) {
                    await updateImportantNumber(numberToEdit._id, {  name,  phoneNumber, work, adminId });
                    onUpdate({ _id: numberToEdit._id,  name,  phoneNumber, work });
                } else {
                    const newNumber = await addImportantNumber({  name,phoneNumber, work, adminId });
                    onAdd(newNumber);
                }
                onClose();
            } catch (error) {
                console.error('Error:', error);
            }
            console.log("gfsg",name,phoneNumber,work)
        }
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="frame-262" onClick={(e) => e.stopPropagation()}>
                <div className="frame-263">
                    <div className="frame-264">
                        <div className="frame-259">
                            <div className="text-wrapper-140">Add Important Number</div>
                        </div>
                        <form className='number-from' onSubmit={handleSubmit}>
                            <div className="frame-216">
                                <div className="input-field-9">
                                    <p className="label-7">
                                        <span className="text-wrapper-162">Full Name</span>
                                        <span className="text-wrapper-163">*</span>
                                    </p>
                                    <div className="select-menu-trigger-5">
                                        <input
                                            className="text-49"
                                            id="input-1"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <label className="text-wrapper-164" htmlFor="input-1">{errors.name}</label>
                                </div>
                                <div className="input-field-9">
                                    <p className="label-7">
                                        <span className="text-wrapper-162">Phone Number</span>
                                        <span className="text-wrapper-163">*</span>
                                    </p>
                                    <div className="component-54">
                                        <div className="select-menu-trigger-5">
                                            <input
                                                className="text-49"
                                                id="input-2"
                                                value={phoneNumber}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <label className="text-wrapper-164" htmlFor="input-2">{errors.phoneNumber}</label>
                                    </div>
                                </div>
                                <div className="input-field-9">
                                    <p className="label-7">
                                        <span className="text-wrapper-162">Work</span>
                                        <span className="text-wrapper-163">*</span>
                                    </p>
                                    <div className="component-54">
                                        <div className="select-menu-trigger-5">
                                            <input
                                                className="text-49"
                                                id="input-3"
                                                value={work}
                                                onChange={(e) => setWork(e.target.value)}
                                            />
                                        </div>
                                        <label className="text-wrapper-164" htmlFor="input-3">{errors.work}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="frame-265">
                                <button type="button" className="component hover-button-false border-button-true gray-button-false component-55" onClick={onClose}>
                                    <div className="buttons component-56">Cancel</div>
                                </button>
                                <button type="submit" className="component-9 hover-button-true border-button-false gray-button-true component-57">
                                    <div className="buttons undefined">{numberToEdit ? 'Update' : 'Save'}</div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNumber;
