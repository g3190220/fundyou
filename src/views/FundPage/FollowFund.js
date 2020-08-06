import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter
    } from "react-router-dom";

class FollowFund extends React.Component {
    constructor(props){
      super(props)
      this.state ={
        button: true
      }
      this.handleClickFollow = this.followBtn.bind(this);
    }s
    followBtn(){
      this.setState({
        button:!this.state.button
      })
    }
    render(){
      return (
        <input type="button" className={this.state.button ? "followBtnFalse" : "followBtnTrue"} onClick={this.handleClickFollow} value={this.state.button ? "+ 追蹤" : "√ 已追蹤"}></input>  
      )
    }
    
  }
  
//   ReactDOM.render(<FollowFund />, document.querySelector("follow-btn"));
  export default withRouter(FollowFund);
  