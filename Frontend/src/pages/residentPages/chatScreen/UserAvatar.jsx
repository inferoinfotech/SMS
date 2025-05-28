import React from 'react';

function UserAvatar({ isOnline, className = "" }) {
  return (
    <div 
      className={`flex overflow relative flex-col justify-end items-end px-2.5 pt-0.5 pb-9 rounded-3xl aspect-square w-[50px] cursor-pointer ${className}`}
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/14324558563bf32df2198d575e702760deccc036e8797b865a75d8880c8337b4?placeholderIfAbsent=true&apiKey=d8c5f2c1accc4d81819c9cc495d39210"
        className="object-cover rounded-full absolute inset-0 size-full"
      />
      <div className={`flex relative left-3 top-[-4px] shrink-0 w-4 h-4 border-2 border-solid border-white ${isOnline ? 'bg-indigo-500' : 'bg-gray-300'} rounded-full shadow-sm`} />
    </div>
  );
}

export default UserAvatar;