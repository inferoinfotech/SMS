import React from 'react';
import profile from '../../../static/img/profile.png'
import './style.css';
import images from '../../Images';

const ViewComplaint = ({ complaint, onClose }) => {
  if (!complaint) return null;

  const profileImage = complaint.profileImage || profile;
  const [wing, unitNumber] = complaint.unit.split(' ');

  return (
    <div className="element-view-pop-up fixed right-4 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="frame-479">
        <div className="frame-480">
          <div className="frame-476">
            <div className="frame-481">
              <div className="text-wrapper-285">View Complaint</div>
              <svg onClick={onClose}
                className="close-fill1-wght400-grad0-opsz24-1-1 icon-instance-node-61"
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
            <img className="line-96" alt="Line" src={images.line94} />
          </div>
          <div className="frame-482">
            <div className="frame-483">
              {/* <img className="ellipse-22" alt="Profile" src={profileImage} /> */}
              <div className="frame-434">
                <div className="text-wrapper-286">{complaint.complainerName}</div>
                <div className="text-wrapper-287">Aug 5, 2024</div>
              </div>
            </div>
            <div className="frame-480">
              <div className="frame-484">
                <div className="text-wrapper-260">Request Name</div>
                <div className="text-wrapper-288">{complaint.complaintName}</div>
              </div>
              <div className="frame-484">
                <div className="text-wrapper-260">Description</div>
                <p className="offering-giving">{complaint.description}</p>
              </div>
              <div className="group-389">
                <div className="frame-485">
                  <div className="text-wrapper-260">Wing</div>
                  <div className="a-yes-b-no-c-no-d-no-wrapper undefined">
                    <div className="text-4 g-false d-false h-false a-true c-false b-false i-false">{complaint.wing}</div>
                  </div>
                </div>
                <div className="frame-486">
                  <div className="text-wrapper-260">Unit</div>
                  <div className="text-wrapper-288">{complaint.unit}</div>
                </div>
                <div className="frame-487">
                  <div className="text-wrapper-260">Priority</div>
                  <div className="accreditation-status medium-true low-false high-false accreditation-status-5">
                    <div className="medium accreditation-status-4">{complaint.priority}</div>
                  </div>
                </div>
                <div className="frame-488">
                  <div className="text-wrapper-260">Status</div>
                  <div className="accreditation-status medium-true low-false high-false accreditation-status-6">
                    <div className="medium accreditation-status-7">{complaint.status}</div>
                  </div>
                </div>
                {/* <img className="line-97" alt="Line" src={images.line-112} />
                <img className="line-98" alt="Line" src={images.line-112} />
                <img className="line-99" alt="Line" src={images.line-112} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaint;