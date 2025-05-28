/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/
import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export const PriorityStatus = ({ medium, low, high, className, divClassName, text = "Medium" }) => {
  return (
    <div className={`priority-status medium-${medium} low-${low} high-${high} ${className}`}>
      <div className={`medium ${divClassName}`}>
        {medium && <>{text}</>}

        {low && <>Low</>}

        {high && <>High</>}
      </div>
    </div>
  );
};

PriorityStatus.propTypes = {
  medium: PropTypes.bool,
  low: PropTypes.bool,
  high: PropTypes.bool,
  text: PropTypes.string,
};
