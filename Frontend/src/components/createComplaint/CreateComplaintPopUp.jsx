// src/components/createComplaint/CreateComplaintPopUp.jsx

import React, { useState, useEffect } from 'react';
import './style.css';
import images from '../../Images';
import WingSelectBox from '../WingSelectBox/WingSelectBox';

const CreateComplaintPopUp = ({ onClose, onAdd, onUpdate, itemToEdit }) => {
  const [complainerName, setComplainerName] = useState('');
  const [complaintName, setComplaintName] = useState('');
  const [description, setDescription] = useState('');
  const [wing, setWing] = useState('');
  const [unit, setUnit] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setComplainerName(itemToEdit.complainerName || '');
      setComplaintName(itemToEdit.complaintName || '');
      setDescription(itemToEdit.description || '');
      setWing(itemToEdit.wing || '');
      setUnit(itemToEdit.unit || '');
      setPriority(itemToEdit.priority || '');
      setStatus(itemToEdit.status || '');
    } else {
      setComplainerName('');
      setComplaintName('');
      setDescription('');
      setWing('');
      setUnit('');
      setPriority('');
      setStatus('');
      setErrors({});
    }
  }, [itemToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!complainerName) newErrors.complainerName = 'Complainer Name is required';
    if (!complaintName) newErrors.complaintName = 'Complaint Name is required';
    if (!description) newErrors.description = 'Description is required';
    if (!wing) newErrors.wing = 'Wing is required';
    if (!unit) newErrors.unit = 'Unit is required';
    if (!priority) newErrors.priority = 'Priority is required';
    if (!status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const complaintData = { complainerName, complaintName, description, wing, unit, priority, status };
      
      if (itemToEdit) {
        onUpdate(itemToEdit.index, complaintData);
      } else {
        onAdd(complaintData);
      }
      onClose();
    }
  };

  return (
    <div className='element-create-complaint'>
      <div className="frame-873">
        <div className="frame-874">
          <div className="frame-874">
            <div className="frame-875">
              <div className="text-wrapper-279">{itemToEdit ? 'Edit Complaint' : 'Create Complaint'}</div>
              <img className="line-159" alt="Line" src={images.line94} />
            </div>
            <form className='number-from' onSubmit={handleSubmit}>
              <div className="frame-216">
                <div className="input-field-9">
                  <p className="label-7">
                    <span className="text-wrapper-162">Complainer Name</span>
                    <span className="text-wrapper-163">*</span>
                  </p>
                  <div className="select-menu-trigger-5">
                    <input
                      className="text-49"
                      id="input-1"
                      value={complainerName}
                      onChange={(e) => setComplainerName(e.target.value)}
                    />
                  </div>
                  <label className="text-wrapper-164" htmlFor="input-1">{errors.complainerName}</label>
                </div>
                <div className="input-field-9">
                  <p className="label-7">
                    <span className="text-wrapper-162">Complaint Name</span>
                    <span className="text-wrapper-163">*</span>
                  </p>
                  <div className="component-54">
                    
                    <div className="select-menu-trigger-5">
                      <input
                        className="text-49"
                        id="input-2"
                        value={complaintName}
                        onChange={(e) => setComplaintName(e.target.value)}
                      />
                    </div>
                    <label className="text-wrapper-164" htmlFor="input-2">{errors.complaintName}</label>
                  </div>
                </div>
                <div className="input-field-9">
                  <p className="label-7">
                    <span className="text-wrapper-162">Description</span>
                    <span className="text-wrapper-163">*</span>
                  </p>
                  <div className="component-54">
                    <div className="select-menu-trigger-5">
                      <input
                        className="text-49"
                        id="input-3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <label className="text-wrapper-164" htmlFor="input-3">{errors.description}</label>
                  </div>
                </div>
                {/* <div className="input-field-9">
                  <p className="label-7">
                    <span className="text-wrapper-162">Wing</span>
                    <span className="text-wrapper-163">*</span>
                  </p>
                  <div className="component-54">
                    <div className="select-menu-trigger-5">
                      <input
                        className="text-49"
                        id="input-4"
                        value={wing}
                        onChange={(e) => setWing(e.target.value)}
                      />
                    </div>
                    <label className="text-wrapper-164" htmlFor="input-4">{errors.wing}</label>
                  </div>
                </div> */}
                <WingSelectBox value={wing} onChange={setWing} error={errors.wing} />
                <div className="input-field-9">
                  <p className="label-7">
                    <span className="text-wrapper-162">Unit</span>
                    <span className="text-wrapper-163">*</span>
                  </p>
                  <div className="component-54">
                    <div className="select-menu-trigger-5">
                      <input
                        className="text-49"
                        id="input-5"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                      />
                    </div>
                    <label className="text-wrapper-164" htmlFor="input-5">{errors.unit}</label>
                  </div>
                </div>
                <div className="input-field-9">
                  <p className="label-7">
                    <span className="text-wrapper-162">Priority</span>
                    <span className="text-wrapper-163">*</span>
                  </p>
                  <div className="component-54">
                    <div className="select-menu-trigger-5">
                      <input
                        className="text-49"
                        id="input-6"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      />
                    </div>
                    <label className="text-wrapper-164" htmlFor="input-6">{errors.priority}</label>
                  </div>
                </div>
                <div className="input-field-9">
                  <p className="label-7">
                    <span className="text-wrapper-162">Status</span>
                    <span className="text-wrapper-163">*</span>
                  </p>
                  <div className="component-54">
                    <div className="select-menu-trigger-5">
                      <input
                        className="text-49"
                        id="input-7"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                    </div>
                    <label className="text-wrapper-164" htmlFor="input-7">{errors.status}</label>
                  </div>
                </div>
              </div>
              <div className="frame-265">
                <button type="button" className="component hover-button-false border-button-true gray-button-false component-55" onClick={onClose}>
                  <div className="buttons component-56">Cancel</div>
                </button>
                <button type="submit" className="component-9 hover-button-true border-button-false gray-button-true component-57">
                  <div className="buttons undefined">{itemToEdit ? 'Update' : 'Create'}</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComplaintPopUp;