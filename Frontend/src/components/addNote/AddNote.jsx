import React, { useState, useEffect } from 'react';
import './style.css';
import CustomButton from '../customButton/CustomButton';
import images from '../../Images';

const AddNote = ({ closePopup, onSubmit, note }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setDescription(note.description);
            setDate(note.date || '');
        } else {
            setTitle('');
            setDescription('');
            setDate('');
        }
    }, [note]);

    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = 'Title is required';
        if (!description) newErrors.description = 'Description is required';
        if (!date) newErrors.date = 'Date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({ title, description, date });
        }
    };

    return (
        <div className='element-add-expenses-screen'>
            <div className="frame-627">
                <div className="frame-628">
                    <div className="frame-620">
                        <div className="frame-629">
                            <div className="text-wrapper-194">{note ? 'Update Note' : 'Add Note'}</div>
                            <img className="line-111" alt="Line" src={images.line94} />
                        </div>
                        <div className="frame-626">
                            <div className="input-field-39">
                                <p className="label-44">
                                    <span className="text-wrapper-195">Title</span>
                                    <span className="text-wrapper-196">*</span>
                                </p>
                                <input
                                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-241 ${errors.title ? 'error' : ''}`}
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter Title"
                                />
                                {errors.title && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.title}</div>}
                            </div>
                            <div className="input-field-40">
                                <p className="label-44">
                                    <span className="text-wrapper-195">Description</span>
                                    <span className="text-wrapper-196">*</span>
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
                            <div className="input-field-39 mt-4">
                                <p className="label-44">
                                    <span className="text-wrapper-195">Date</span>
                                    <span className="text-wrapper-196">*</span>
                                </p>
                                <input
                                    className={`custom-input select-menu-trigger error-0-false unfill-0-true typing-false rupee-unfill-false rupee-typing-false rupee-error-false component-241 ${errors.date ? 'error' : ''}`}
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    placeholder="Select Date"
                                />
                                {errors.date && <div className="incorrect-email error-false rupee-error-0-false undefined">{errors.date}</div>}
                            </div>
                        </div>
                        <div className="frame-630">
                            <button type="button" className="component hover-button-false border-button-true gray-button-false component-55" onClick={closePopup}>
                                <div className="buttons component-56">Cancel</div>
                            </button>
                            <CustomButton text={note ? 'Update' : 'Save'} width='190px' onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNote;