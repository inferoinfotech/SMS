import React from 'react';
import profile from '../../../static/img/profile.png';
import DayShift from '../../../static/img/day-shift.svg';
import NightShift from '../../../static/img/night-shift.svg';
import Male from '../../../static/img/male-icon.svg';
import Female from '../../../static/img/female-icon.svg';
import './style.css';

const ViewGuard = ({ guard, onClose }) => {
  if (!guard) return null;

  const profileImage = guard.photo || profile;
  const shiftIcon = guard.shift === "Day" ? DayShift : NightShift;
  const genderIcon = guard.gender === "Male" ? Male : Female;

  return (
    <div className="element-view-Guard-pop-up fixed right-4 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="frame-479 bg-white p-8 rounded-lg shadow-lg">
        <div className="frame-480">
          <div className="frame-476">
            <div className="frame-481 flex justify-between items-center">
              <div className="text-wrapper-285 text-xl font-semibold">View Guard Details</div>
              <svg onClick={onClose}
                className="close-fill1-wght400-grad0-opsz24-1-1 icon-instance-node-61 cursor-pointer"
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="path"
                  d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                  fill="#202224"
                />
              </svg>
            </div>
          </div>
          <div className="frame-482 mt-4">
            <div className="frame-483 flex items-center">
              <img className="ellipse-22 rounded-full w-20 h-20" alt="Profile" src={profileImage} />
              <div className="frame-434 ml-4">
                <div className="text-wrapper-286 text-lg font-semibold">{guard.name}</div>
                <div className="text-wrapper-287 text-gray-600">{guard.email}</div>
                <div className="text-wrapper-287 text-gray-600">{guard.phoneNumber}</div>
              </div>
            </div>
            <div className="frame-480-1 mt-4">
              <div className="frame-484 flex items-center">
                <div className="text-wrapper-260 text-gray-700">Shift</div>
                <div className="w-[110px] flex items-center justify-center ml-4">
                  <div className={`w-[95px] flex gap-1.5 justify-center items-center self-stretch px-3 py-1.5 my-auto text-sm font-medium whitespace-nowrap rounded-[58px] ${guard.shift === "Day" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}>
                    <img src={shiftIcon} alt="" className="w-5 h-5" />
                    <div className="self-stretch my-auto">{guard.shift}</div>
                  </div>
                </div>
              </div>
              <div className="frame-484 flex items-center mt-2">
                <div className="text-wrapper-260 text-gray-700">Time</div>
                <div className="text-wrapper-288 ml-4">{guard.shiftTime}</div>
              </div>
              <div className="frame-484 flex items-center mt-2">
                <div className="text-wrapper-260 text-gray-700">Gender</div>
                <div className="w-[110px] flex items-center justify-center ml-4">
                  <div className={`w-[95px] flex gap-1.5 justify-center items-center self-stretch px-3 py-1.5 my-auto text-sm font-medium whitespace-nowrap rounded-[58px] ${guard.gender === "Male" ? "bg-blue-500 text-white" : "bg-pink-500 text-white"}`}>
                    <img src={genderIcon} alt="" className="w-5 h-5" />
                    <div className="self-stretch my-auto">{guard.gender}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGuard;