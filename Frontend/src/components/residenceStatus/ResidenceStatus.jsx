import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import images from '../../Images';

const ResidenceStatus = ({ onCancel, onSave, openVacateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState('Occupied');
    const navigate = useNavigate();

    const handleSave = () => {
        console.log('Save button clicked');
        if (selectedStatus === 'Occupied') {
            navigate('/addOwnerTenantForm');
        } else if (selectedStatus === 'Vacate') {
            console.log('Setting showVacanteStatus to true');
            openVacateStatus();
        }
        onSave(selectedStatus);
    };

    return (
        <div className='element-residence-status'>
            <div className="overlay" onClick={onCancel}></div>
            <div className="pop-up">
                <div className="frame-725">
                    <div className="frame-726">
                        <div className="text-wrapper-442">Residence Status</div>
                        <img className="line-145" alt="Line" src={images.line94} />
                    </div>
                    <div className="frame-725">
                        <div className="frame-727">
                            <div className={`frame-730 ${selectedStatus === 'Occupied' ? 'selected' : ''}`}>
                                <div className="radio-button-13">
                                    <input
                                        type="radio"
                                        name="residenceStatus"
                                        value="Occupied"
                                        checked={selectedStatus === 'Occupied'}
                                        onChange={() => setSelectedStatus('Occupied')}
                                    />
                                </div>
                                <div className="frame-729">
                                    <div className="text-wrapper-443">Occupied</div>
                                </div>
                            </div>
                            <div className={`frame-730 ${selectedStatus === 'Vacate' ? 'selected' : ''}`}>
                                <div className="radio-button-13">
                                    <input
                                        type="radio"
                                        name="residenceStatus"
                                        value="Vacate"
                                        checked={selectedStatus === 'Vacate'}
                                        onChange={() => setSelectedStatus('Vacate')}
                                    />
                                </div>
                                <div className="frame-729">
                                    <div className="text-wrapper-444">Vacate</div>
                                </div>
                            </div>
                        </div>
                        <div className="frame-731">
                            <input type="checkbox" className="text-wrapper-445" defaultChecked />
                            <p className='font-normal text-sm text-[#A7A7A7]'>By submitting, you agree to select {selectedStatus}</p>
                        </div>
                        <div className="frame-732">
                            <button
                                className="component hover-button-false border-button-true gray-button-false component-234"
                                onClick={onCancel}
                            >
                                <div className="buttons component-235">Cancel</div>
                            </button>
                            <button
                                className="component hover-button-true border-button-false gray-button-false component-236"
                                onClick={handleSave}
                            >
                                <div className="buttons">Save</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResidenceStatus;