import React, { Component } from 'react';
import { render } from 'react-dom';
import Loader from 'react-loader-spinner';
function LoadingIndicator() {
    return (
      <div
      style={{
        position: "fixed", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)"
      }}
      >
        <Loader type="ThreeDots" color="#004487" height="100" width="100" />
     </div>)
};
export default LoadingIndicator;