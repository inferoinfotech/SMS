import React from 'react';
import './style.css';
import images from '../../Images';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ViewAnnouncement = ({ announcement, onClose }) => {
  if (!announcement) return null;

  return (
    <div className='element-view-announcement-pop-up-screen'>
      <div className="frame-495">
        <div className="frame-496">
          <div className="frame-497">
            <div className="frame-498">
              <div className="text-wrapper-162">View Announcement Details</div>
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
            <img className="line-88" alt="Line" src={images.line94} />
          </div>
          <div className="frame-499">
            <div className="text-wrapper-159">Title</div>
            <div className="text-wrapper-163">{announcement.Announcement_title}</div>
          </div>
          <div className="frame-500">
            <div className="text-wrapper-159">Description</div>
            <p className="text-wrapper-164">{announcement.description}</p>
          </div>
          <div className="frame-501">
            <div className="frame-499">
              <div className="text-wrapper-159">Date</div>
              <div className="text-wrapper-163">{formatDate(announcement.date)}</div>
            </div>
            <div className="frame-499">
              <div className="text-wrapper-159">Time</div>
              <div className="text-wrapper-163">{announcement.time}</div>
            </div>
            <div className="frame-499">
              <div className="text-wrapper-159">Amount</div>
              <div className="text-wrapper-163">{announcement.amount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnnouncement;