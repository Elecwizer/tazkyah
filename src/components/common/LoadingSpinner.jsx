import React from "react";
import "../../styles/loadingSpinner.css";

const LoadingSpinner = ({ size = "medium", text = "Loading..." }) => {
  return (
    <div className={`spinner-container ${size}`}>
      <div className="spinner"></div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
