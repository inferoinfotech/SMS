/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const StatusButton = ({ open, pending, solved, className }) => {
  return (
    <div className={`statusButton open-${open} pending-${pending} solved-${solved} ${className}`}>
      <div className="open">
        {open && <>Open</>}

        {pending && <>Pending</>}

        {solved && <>Solved</>}
      </div>
    </div>
  );
};

StatusButton.propTypes = {
  open: PropTypes.bool,
  pending: PropTypes.bool,
  solved: PropTypes.bool,
};
