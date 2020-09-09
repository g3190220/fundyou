import React from 'react';
// 引入@material-ui
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import FaceIcon from '@material-ui/icons/Face';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

//處理個人資料取得
import {load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import isEmpty from 'views/Function/isEmpty.js'
//import Avatar from 'react-avatar';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter
    } from "react-router-dom";


const styles = theme => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
    });
class PersonalizeMenu extends React.Component{
    state = {
    }
    constructor(props) {
        super(props)
        this.getPDData=this.getPDData.bind(this);
        this.state = {
          //fields: {},
          errors: {},
          flag:false,
      }}
    
    //點擊去頁面
    
    handleSubmit(url,e){
    
    const member_id=load_cookies("member_id")
    //const member_session=load_cookies("member_session")
    
    //預設網址
    // const path=`/${url}/id=${member_id}`
    const path=`/${url}`
    
    console.log(path)
    this.props.history.push({
              pathname: path
    })
    
  }
  componentDidMount() {
    this.getPDData();
  }
  //取得個人資料
  getPDData(){
    let member_info=[];
    
    const url = "https://fundu.ddns.net:8090/check_LoginStatus";////////改url
    //console.log(data)
    fetch(url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    userid: load_cookies("member_id"),
                    userSession:load_cookies("member_session")
              })
              
        
        })
        .then((response) => {return response.json();})
        .then((jsonData) => {
          //console.log(this)
          
          if(jsonData.StatusCode==200){
              console.log("get data")
              member_info=JSON.parse(jsonData.member_info)
              //獲得以下資料
              this.state.email=member_info.member_email
              //this.state.password=member_info.member_password
              this.state.username=member_info.member_name
              
              //this.state.birthday=member_info.member_birthday
              //this.state.job=member_info.member_job
              //this.state.line_id=member_info.member_line_id
              this.state.image=member_info.member_photo
              if(member_info.member_gender==1){
                this.state.gender="男"
              }
              else{
                this.state.gender="女" 
              }
              //更新state
              
              if(!isEmpty(this.state.image)){
                //一進來有圖片，submit要回傳-1
                this.state.image="https://drive.google.com/uc?export=view&id="+this.state.image
              }
              this.setState((state, props) => {
                return {counter: state.counter + props.step,
                        flag:true};
              });

        }
        })
   }
      
    
    render(){
    const { classes } = this.props;
    
    return(
    <div className="personalize-menu">

            <div className="page-name">
                <div className="default-photo">
                  <Avatar src={this.state.image} className="avatar-size"/>
                </div>
                <br/><Divider variant="middle"/>
                <br/><span><font color="white" face="微軟正黑體" style={{fontWeight:"bold"}}>{this.state.email}</font></span>
                <br/><span><font color="white" face="微軟正黑體" style={{fontWeight:"bold"}}>姓名：{this.state.username}</font></span>
                <br/><span><font color="white" face="微軟正黑體" style={{fontWeight:"bold"}}>性別：{this.state.gender}</font></span>
                <br/><br/><Divider variant="middle"/>
                <button type="button" class="btn btn-neutral" onClick={this.handleSubmit.bind(this, "personal-data-page")} >
                    <div className="face-icon"><RecentActorsIcon></RecentActorsIcon></div>
                    我的名片
                </button>
            </div>

            <div className="page-myfund">
                <button type="button" class="btn btn-neutral" onClick={this.handleSubmit.bind(this, "page-myFund")}>
                    <div className="face-icon"><FavoriteIcon></FavoriteIcon></div>
                    追蹤基金
                </button>
            </div>

            <div className="page-mytag">
                <button type="button" class="btn btn-neutral" onClick={this.handleSubmit.bind(this, "page-myTag")}>
                    <div className="face-icon"><LoyaltyIcon></LoyaltyIcon></div>
                    我的TAG
                </button>
            </div>

            <div className="page-personalize"> 
                <button type="button" class="btn btn-neutral" onClick={this.handleSubmit.bind(this, "page-characterAnalysis")}>
                    <div className="face-icon"><ChildCareIcon></ChildCareIcon></div>
                    性格分析
                </button>
            </div>

            <div className="page-pig">
                <button type="button" class="btn btn-neutral" onClick={this.handleSubmit.bind(this, "page-pig")}>
                    <div className="face-icon"><EmojiObjectsIcon></EmojiObjectsIcon></div>
                    豬豬小助理
                </button>
            </div>

            <Divider variant="middle"/>

            <div className="personalize-page">
                <button type="button" class="btn btn-neutral" onClick={this.handleSubmit.bind(this, "personalize-page")}>
                  <div className="face-icon"><FaceIcon></FaceIcon></div>
                    個人專區
                </button>
            </div>

            <div className="fundu-page">
                <button type="button" class="btn btn-neutral" onClick={this.handleSubmit.bind(this, "allfund-page")}>
                    FUNDU
                </button>
            </div>

            
            
    </div>

        )}
}

export default withRouter(PersonalizeMenu);
