import React from 'react';
import './style.css';
import images from '../../Images';

const CustomButton = ({ text, imageType, onClick, width, bgColor, className }) => {
    const imageMap = {
        Add: images.img1,
        Edit: images.img2,
        Clear: images.img3,
        Back: images.backArrow,
    };
    const imageSrc = imageMap[imageType];

    return (
        <button
            className={`customButton my-0 sm:my-5 ${className ? className: ''}`}
            style={{ width: `${width}`, backgroundColor: bgColor || 'transparent' }}
            onClick={onClick}
            type='submit'
        >
            {imageType && <img className="img-2" alt="Vuesax bold add" width="24px" src={imageSrc} />}
            <span className="button">{text}</span>
        </button>
    );
};

export default CustomButton;

// USE IT THIS WAY
{/* <CustomButton text='Add' imageType='Add' onClick='function name' />
<CustomButton text='Edit Profile' imageType='Edit' onClick='function name' />
<CustomButton text='Add New Resident details' imageType='Add' onClick='function name' />
<CustomButton text='Add New Expenses details' imageType='Add' onClick='function name' />
<CustomButton text='Add Security' imageType='Add' onClick='function name' />
<CustomButton text='' onClick='' width='' /> */}