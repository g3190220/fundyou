import React, { Component } from 'react';
import { render } from 'react-dom';
import Loader from 'react-loader-spinner';
function LoadingIndicator_small() {
    return (
      <div
       style={{
         width:"40px",
         height: "40px",
         display:"inline-block"
          // justifyContent: "center",
          // alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="#004487" height="40" width="40" />
     </div>)
};
export default LoadingIndicator_small;