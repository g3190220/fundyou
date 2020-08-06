import React, { Component } from 'react';
import { render } from 'react-dom';
import Loader from 'react-loader-spinner';
function LoadingIndicator() {
    return (
      <div
       style={{
         width: "100%",
         height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="#FF8000" height="100" width="100" />
     </div>)
};
export default LoadingIndicator;