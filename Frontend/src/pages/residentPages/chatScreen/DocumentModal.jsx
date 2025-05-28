import React from 'react';

function DocumentModal({ files, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Documents</h2>
        <div className="mb-4">
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <button onClick={onCancel} className="mr-4 px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-indigo-500 text-white rounded">Send</button>
        </div>
      </div>
    </div>
  );
}

export default DocumentModal;