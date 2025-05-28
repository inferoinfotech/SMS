import React from 'react';

const WingSelectBox = ({ value, onChange, error }) => {
    const wings = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    return (
        <div className="mb-4">
            <label className="text-gray-700 text-sm font-bold mb-2">
                Wing <span className="text-red-500">*</span>
            </label>
            <div className="relative">
                <select
                    className="block appearance-none md:w-[200px] w-auto bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded-[10px] shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option value="">Select Wing</option>
                    {wings.map((wing, index) => (
                        <option key={index} value={wing}>
                            {wing}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
};

export default WingSelectBox;