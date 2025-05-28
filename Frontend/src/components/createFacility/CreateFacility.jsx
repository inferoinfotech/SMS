// src/components/createFacility/CreateFacility.jsx

import React, { useState } from 'react';
import './style.css';
import images from '../../Images';
import { createFacility } from '../../api/facilityManagementApi';

const CreateFacility = () => {
    const [name, setFacilityName] = useState('');
    const [description, setDescription] = useState('');
    const [scheduleServiceDate, setScheduleServiceDate] = useState('');
    const [remindBefore, setRemindBefore] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Facility Name is required';
        if (!description) newErrors.description = 'Description is required';
        if (!scheduleServiceDate) newErrors.scheduleServiceDate = 'Schedule Service Date is required';
        if (!remindBefore) newErrors.remindBefore = 'Remind Before is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setSubmitError(null);
            try {
                const facilityData = {
                    name: name,
                    description,
                    serviceDate: scheduleServiceDate,
                    remindBeforeDate: "1",
                };
                await createFacility(facilityData);
                alert('Facility created successfully!');
                // Optionally, reset the form or navigate to another page
            } catch (error) {
                setSubmitError(error.message || 'Failed to create facility');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className='element-create-facility'>
            <div className="frame-733">
                <div className="frame-734">
                    <div className="frame-725">
                        <div className="frame-735">
                            <div className="text-wrapper-221">Create Facility</div>
                            <img className="line-130" alt="Line" src={images.line94} />
                        </div>
                        <div className="frame-731">
                            <div className="input-field-47">
                                <p className="label-64">
                                    <span className="text-wrapper-222">Facility Name</span>
                                    <span className="text-wrapper-223">*</span>
                                </p>
                                <input
                                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false design-component-instance-node-6 ${errors.facilityName ? 'error' : ''}`}
                                    type="text"
                                    value={name}
                                    onChange={(e) => setFacilityName(e.target.value)}
                                    placeholder="Enter Name"
                                />
                                {errors.name && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.name}</div>}
                            </div>
                            <div className="input-field-48">
                                <p className="label-64">
                                    <span className="text-wrapper-222">Description</span>
                                    <span className="text-wrapper-223">*</span>
                                </p>
                                <input
                                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false undefined ${errors.description ? 'error' : ''}`}
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter Description"
                                />
                                {errors.description && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.description}</div>}
                            </div>
                            <div className="input-field undefined">
                                <div className="label undefined">Schedule Service Date</div>
                                <input
                                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false design-component-instance-node-6 ${errors.scheduleServiceDate ? 'error' : ''}`}
                                    type="date"
                                    value={scheduleServiceDate}
                                    onChange={(e) => setScheduleServiceDate(e.target.value)}
                                    placeholder="Select Schedule Service Date"
                                />
                                {errors.scheduleServiceDate && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.scheduleServiceDate}</div>}
                            </div>
                            <div className="input-field undefined">
                                <div className="label undefined">Remind Before</div>
                                <input
                                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false design-component-instance-node-6 ${errors.remindBefore ? 'error' : ''}`}
                                    type="text"
                                    value={remindBefore}
                                    onChange={(e) => setRemindBefore(e.target.value)}
                                    placeholder="Select Day"
                                />
                                {errors.remindBefore && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.remindBefore}</div>}
                            </div>
                        </div>
                        <div className="frame-736">
                            <button type="button" className="component hover-button-false border-button-true gray-button-false component-55">
                                <div className="buttons component-56">Cancel</div>
                            </button>
                            <button type="submit" className="component-9 hover-button-true border-button-false gray-button-true component-57" onClick={handleSubmit} disabled={isSubmitting}>
                                <div className="buttons undefined">{isSubmitting ? 'Saving...' : 'Save'}</div>
                            </button>
                        </div>
                        {submitError && <div className="error-message">{submitError}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFacility;