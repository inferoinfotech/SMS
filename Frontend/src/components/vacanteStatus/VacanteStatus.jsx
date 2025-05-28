
import React, { useState, useEffect } from 'react';
import images from '../../Images';
import './style.css';
import CustomButton from '../customButton/CustomButton';

const VacanteStatus = ({ onClose, onSave, itemToEdit }) => {
    const [wing, setWing] = useState('');
    const [unit, setUnit] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (itemToEdit) {
            setWing(itemToEdit.wing || '');
            setUnit(itemToEdit.unit || '');
        } else {
            setWing('');
            setUnit('');
            setErrors({});
        }
    }, [itemToEdit]);

    // const validateForm = () => {
    //     const newErrors = {};
    //     if (!wing) newErrors.wing = 'Wing is required';
    //     if (!unit) newErrors.unit = 'Unit is required';
    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting VacanteStatus form', wing, unit);
        // if (!validateForm()) {
            const vacanteData = {
                wing: wing, // Ensure wing is trimmed and uppercase
                unit: unit  // Ensure unit is trimmed and uppercase
            };
            console.log('Vacante data to be saved:', vacanteData); // Log the data being saved
            onSave(vacanteData);
        // }
    };

    console.log('VacanteStatus rendering');

    return (
        <div className='element-edit-vacate-pop'>
            <form onSubmit={handleSubmit}>
                <div className="frame-608">
                    <div className="frame-609">
                        <div className="frame-605">
                            <div className="text-wrapper-349">{itemToEdit ? 'Edit Vacante' : 'Create Vacante'}</div>
                            <img className="line-124" alt="Line" src={images.line94} />
                        </div>

                        <div className="input-field-17">
                            <p className="label-14">
                                <span className="text-wrapper-371">Wing</span>
                                <span className="text-wrapper-372">*</span>
                            </p>
                            <input
                                type="text"
                                value={wing}
                                onChange={(e) => setWing(e.target.value) 
                                 }
                                className="form-control custom-input"
                            />
                            {errors.wing && <div className="text-red-500">{errors.wing}</div>}
                        </div>

                        <div className="input-field-17">
                            <p className="label-14">
                                <span className="text-wrapper-371">Unit</span>
                                <span className="text-wrapper-372">*</span>
                            </p>
                            <input
                                type="text"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                className="form-control custom-input"
                            />
                            {errors.unit && <div className="text-red-500">{errors.unit}</div>}
                        </div>

                        <div className="flex justify-between mb-5">
                            <button type="button" className="component hover-button-false border-button-true gray-button-false component-55 mr-5" onClick={onClose}>
                                <div className="buttons component-56">Cancel</div>
                            </button>
                            <CustomButton  text={itemToEdit ? 'Update' : 'Save'} onClick='' width='175px' className='!my-0' />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default VacanteStatus;