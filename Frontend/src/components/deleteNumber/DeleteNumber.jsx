import React from 'react';
import './style.css';

const DeleteNumber = ({ name, onCancel, onDelete }) => {
    return (
        <div className="popup-overlay" onClick={onCancel}>
            <div className="frame-427" onClick={(e) => e.stopPropagation()}>
                <div className="frame-428">
                    <div className="frame-424">
                        <div className="text-wrapper-234">Delete {name}?</div>
                    </div>
                    <p className="text-wrapper-256">Are you sure you want to delete this number?</p>
                </div>
                <div className="frame-429">
                    <button className="component hover-button-false border-button-true gray-button-false component-97" onClick={onCancel}>
                        <div className="buttons component-98">Cancel</div>
                    </button>
                    <button className="component hover-button-true border-button-false gray-button-false component-99" onClick={onDelete}>
                        <div className="buttons undefined">Delete</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteNumber;