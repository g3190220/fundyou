import React from "react";
import _ from "underscore";
import isEmpty from "views/Function/isEmpty.js"
import { onLogin,load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import liff from '@line/liff';
import Link_M from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';


// reactstrap components
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  FormFeedback
} from "reactstrap";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
  } from "react-router-dom";

var nounce="";
var liff_userid="";

class LiffLogin extends React.Component {
  state = {
  }
  constructor(props) {
      super(props)
      console.log(props)
      this.state = {
        //fields: {},
        errors: {},
        flag: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.setLineID=this.setLineID.bind(this);
    this.getLiff=this.getLiff.bind(this);
    this.goto=this.goto.bind(this);
    this.testpath=this.testpath.bind(this);
  }
  // componentDidMount() { 
  //   let token = (this.props.location.search.split('='))[1];
  //   this.setState({token:token})
  // }

  //存取liff-userid至資料庫
  setLineID(nounce,liff_userid){
    console.log("start setLineID")
    const url = "https://fundu.ddns.net:8090/setLineID";
        //console.log(data)
    fetch( url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    nonce: nounce,
                    lineid: liff_userid,
              })
              
        
        })
        .then((response) => {console.log(response);return response.json();})
        .then((jsonData) => {
          
          console.log(jsonData)
          if(jsonData.StatusCode==200){
            alert("成功連結！")
            //關閉Line liff
            liff.closeWindow();
          }
        })
  }

  getLiff(){
    console.log("start getLiff()")
    //就卡在這裡，出現預期錯誤
    liff.init({
      liffId: "1654887866-baMpN6YA" // Use own liffId
    })
    .then(() => {
      console.log("進來liff.init了")
        if (liff.isLoggedIn()) {
            liff.getProfile()
            .then(profile => {
              const userId = profile.userId
              //取得liff_userid;
              liff_userid=userId;
              console.log("連結成功,取得liff_userid！")
            })
            .then(()=>{this.setLineID(nounce,liff_userid)})
          }
        else{
          alert("取得失敗")
        }
    })
    // .then(()=>{
    //   liff.closeWindow();
    // })
    .catch((err) => {
      // Error happens during initialization
      console.log(err.code, err.message);
    }); 
  }
  

  handleSubmit(){
    let errors = {}; 
    let member_info=[];
    
    //let token = (this.props.location.search.split('='))[1];
    //console.log(token)
    
    //取消DOM的預設功能
    window.event.preventDefault();
    console.log("click into handleSubmit")
    if(!isEmpty(this.state.email) && !isEmpty(this.state.password))
    { 
        console.log("準備fetch")
        this.state.errors = {};
        const url = "https://fundu.ddns.net:8090/Signin";
        fetch( url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
              })
              
        
        })
        .then((response) => {console.log(response);return response.json();})
        .then((jsonData) => {
          console.log(jsonData)
          if(jsonData.StatusCode==200){
            alert("帳號密碼正確！")
            member_info=JSON.parse(jsonData.member_info)
            nounce=member_info.member_nonce
            this.getLiff();

          }
          else if(jsonData.StatusCode==1000){
            this.state.errors["message"] = "帳號或密碼錯誤！";
            alert("帳號密碼錯誤！")

            this.state.errors["email_is_errors"] = true;
            this.state.errors["password_is_errors"] = true;

            this.setState({errors: this.state.errors});
            //console.log(this.state.errors);
            
          }
          else{
            alert("不明error!")
          }
    })
        .catch(error => {
          console.log(error);
        });
        
        
    }
    else{
      alert("帳號密碼請輸入完全！")
      if(isEmpty(this.state.email)){
         errors["email_is_errors"] = true;
         errors["email"]="請輸入帳號"
      }
      else if(isEmpty(this.state.password)){
        errors["password_is_errors"] = true;
        errors["password"]="請輸入密碼"
      }
      this.setState({errors: errors});
      console.log(this.state.errors)
     
    }
    
  }
                   


  handleChange = name => event => {
    this.setState({
      [name]: event.nativeEvent.target.value,
    });
  }

  //監聽enter鍵
  keyPress(e){
    if(e.keyCode == 13){
       this.handleSubmit();
    }
 }

 goto(){
  this.props.history.push({
    pathname: "/liff-register"
  })
 }

 testpath(){
  this.props.history.push({
    pathname: "/line-allfund-page"
  })
 }
 
  render(){
    return (
        <div
          className="section section-login"
          id="login"
        >
           <Container >
            <Row>
              <Col className="mx-auto" lg="4" md="6">
                <Card className="card-register">
                  <div className="title" >登入以連動Line</div>
                  <div className="social-line text-center">
                  </div>
                  <Form className="register-form">
                    <label>Email</label>
                   
                     
                      <Input placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange('email')} invalid={this.state.errors["email_is_errors"]} onKeyDown={this.keyPress}/>
                      <FormFeedback invalid>
                      {this.state.errors["email"]}
                      </FormFeedback>
                   
                    <label>Password</label>
                    
                      
                      <Input placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange('password')} invalid={this.state.errors["password_is_errors"]} onKeyDown={this.keyPress}/>
                      <FormFeedback invalid>
                      {this.state.errors["password"]}
                      </FormFeedback>
                    
                    <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    //href="#allfund-page"//新增這行!!!
                    onClick={this.handleSubmit}
                  >
                    登 入
                  </Button>
                  
                  </Form>
                  <div className="go-to-register-btn-position">
                    <a className="go-to-register-btn" onClick={this.goto}>尚未註冊FUNDU會員？</a>
                    
                  </div>
                  {/* <div className="go-to-register-btn-position">
                    
                    <a className="go-to-register-btn" onClick={this.testpath}>link-all-fund？</a>
                  </div> */}
                </Card>
              </Col>
            </Row>
          </Container>
    </div>
    );
  }}

export default withRouter(LiffLogin);
