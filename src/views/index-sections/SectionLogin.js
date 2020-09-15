import React from "react";
import _ from "underscore";
import isEmpty from "views/Function/isEmpty.js"
import { onLogin,load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies


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



//function SectionLogin() {
class SectionLogin extends React.Component {
  state = {
  }
  constructor(props) {
      super(props)
      console.log(props)
      this.state = {
        //fields: {},
        errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }
  handleSubmit(){
    let errors = {}; 
    let member_info=[];
    
    
    //取消DOM的預設功能
    window.event.preventDefault();
  
    if(!isEmpty(this.state.email) && !isEmpty(this.state.password))
    { 
        console.log("handleSubmit_start")
        this.state.errors = {};
        //const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://fundu.ddns.net:8090/Signin";
        //console.log(data)
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
            member_info=JSON.parse(jsonData.member_info)
            onLogin(member_info)
            alert("登入成功")
            //跳轉頁面
            //取得member_id和member_sesiion
            const member_id=member_info.member_id
            //const member_session=member_info.member_session
            //預設網址
            // const path=`/allfund-page/id=${member_id}`
            const path=`/allfund-page`
            this.props.history.push({
              pathname: path
            })
            console.log(this.props)
            
          }
          else if(jsonData.StatusCode==1000){
            this.state.errors["message"] = "帳號或密碼錯誤！";
            alert("帳號密碼錯誤！")

            this.state.errors["email_is_errors"] = true;
            this.state.errors["password_is_errors"] = true;

            this.setState({errors: this.state.errors});
            console.log(this.state.errors);
            
            

    }
        
          else{
            alert("帳號密碼錯誤！")
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
                  <div className="title" >FUNDU</div>
                  <div className="social-line text-center">
                  </div>
                  <Form className="register-form">
                    <label style={{fontFamily:'jf-openhuninn',fontSize:'15px'}}>電子信箱</label>
                   
                     
                      <Input placeholder="電子信箱" type="email" value={this.state.email} onChange={this.handleChange('email')} invalid={this.state.errors["email_is_errors"]} onKeyDown={this.keyPress}/>
                      <FormFeedback invalid>
                      {this.state.errors["email"]}
                      </FormFeedback>
                   
                    <label style={{fontFamily:'jf-openhuninn',fontSize:'15px'}}>密碼</label>
                    
                      
                      <Input placeholder="密碼" type="password" value={this.state.password} onChange={this.handleChange('password')} invalid={this.state.errors["password_is_errors"]} onKeyDown={this.keyPress}/>
                      <FormFeedback invalid>
                      {this.state.errors["password"]}
                      </FormFeedback>
                    
                    <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    style={{fontFamily:'jf-openhuninn',fontSize:'15px'}}
                    onClick={this.handleSubmit}
                  >
                    登  入
                  </Button>
                  </Form>
                  
                </Card>
              </Col>
            </Row>
          </Container>
          
          <div id="face-wrap">
            <div id="face" class=" body">
            <div className='z1'>z</div>
              <div id="ear-r" class="ear body"></div>
              <div id="ear-l" class="ear body"></div>
              <div id="eye-r" class="eye body"><span className="eyeball"></span></div>
              <div id="eye-l" class="eye body"><span className="eyeball"></span></div>
              <div id="nose">
                <div id="nose-r" class="nose body"></div>
                <div id="nose-l" class="nose body"></div>
              </div>
            </div>
          </div>
    </div>
    );
  }}

//export default SectionLogin;
export default withRouter(SectionLogin);
