// reactstrap components
import React from "react";

// import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import PersonalizeMenu from "views/PersonalizePage/PersonalizeMenu.js";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
  } from "react-router-dom";
   
import {load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import { isImageUrl } from "antd/lib/upload/utils";

class PersonalizePage extends React.Component {
  state = {
  }
  constructor(props) {
      super(props)
      console.log(props)
      this.state = {
        //fields: {},
        errors: {}
    }}

  
  //點擊去頁面
  handleSubmit(url,e){
    
    const member_id=load_cookies("member_id")
    const member_session=load_cookies("member_session")
    
    //預設網址
    const path=`/${url}/id=${member_id}/session=${member_session}/`
    
    console.log(path)
    this.props.history.push({
              pathname: path
    })
    
  }
  
  render(){
    return (
      <div
        className="page-header"
        style={{
          backgroundColor: '#ffcdb2',
      }}>
        
      {/* <IndexNavbar></IndexNavbar> */}
      
      <Container>
      <div className="card-personalize">
       
      <PersonalizeMenu></PersonalizeMenu>

        <div className="card-personalize1-intro">
        <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>我的基金</b></font></h4>
          <div className="p1-intro">
            <span style={{fontWeight:"bold"}}>動手追蹤基金，輕鬆查看基金資訊</span>
            <br/><span style={{fontWeight:"bold"}}>加入最愛基金，隨時掌握最新動態</span>
          </div>
        </div>

        <div className="card-personalize5-intro">
        <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>我的TAG</b></font></h4>
            <div className="p5-intro">
              <span style={{fontWeight:"bold"}}>查看您新增的基金TAG</span><br/><br/>
              <span style={{fontWeight:"bold"}}></span>
            </div>
        </div>

        <div className="card-personalize2-intro">
        <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>性格分析</b></font></h4>
            <div className="p2-intro">
              <span style={{fontWeight:"bold"}}>由FundU打造的投資性格分析，</span><br/>
              <span style={{fontWeight:"bold"}}>帶您透過情境遊戲來了解投資偏好</span>
            </div>
        </div>

        <div className="card-personalize3-intro">
        <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>豬豬小助理</b></font></h4>
            <div className="p2-intro">
              <span style={{fontWeight:"bold"}}>豬豬小助理提供各種分析工具，</span><br/>
              <span style={{fontWeight:"bold"}}>讓您在投資基金時也獲取更多資訊</span>
            </div>
        </div>

        <div className="card-personalize4-intro">
        <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>月報表</b></font></h4>
            <div className="p2-intro">
              <span style={{fontWeight:"bold"}}>將您關注的基金組合彙整成月報表，</span><br/>
              <span style={{fontWeight:"bold"}}>了解本月的數值變化和趨勢</span>
            </div>
        </div>
     
      </div>
      </Container>
      </div> 
      
    );
  }
}
export default withRouter(PersonalizePage);