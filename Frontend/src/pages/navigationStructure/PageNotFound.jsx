// src/components/NotFound.jsx
import React from 'react';

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1
                    className="text-9xl font-bold"
                    style={{
                        background: 'linear-gradient(90deg, #fe512e 0%, #f09619 100%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent'
                    }}
                >
                    404
                </h1>
                <p className="text-4xl pb-10 font-semibold text-gray-600">Page Not Found</p>
            </div>
        </div>
    );
};

export default PageNotFound;