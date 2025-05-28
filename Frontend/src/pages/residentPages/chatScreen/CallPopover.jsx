import React from 'react';

function CallPopover({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-16 z-50 bg-white p-4 rounded-lg shadow-lg">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Call Arlene McCoy</h3>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => console.log('Call accepted')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Accept
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default CallPopover;