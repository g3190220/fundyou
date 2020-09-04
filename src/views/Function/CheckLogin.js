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
class CheckLogin extends React.Component {
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
  }
  componentDidMount() { 
    let token = (this.props.location.search.split('='))[1];
    
    this.setState({token:token})
  }
  handleSubmit(){
    let errors = {}; 
    let member_info=[];
    let nounce="";
    
    
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
            //回到操作頁
            window.location.reload(true);
            
            
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
                <Card className="card-register-line">
                  <h3  className="title mx-auto">請先登入FUNDU</h3>
                  <div className="social-line text-center">
                  </div>
                  <Form className="register-form">
                    <label>Email</label>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange('email')} invalid={this.state.errors["email_is_errors"]} onKeyDown={this.keyPress}/>
                      <FormFeedback invalid>
                      {this.state.errors["email"]}
                      </FormFeedback>
                    </InputGroup>
                    <label>Password</label>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange('password')} invalid={this.state.errors["password_is_errors"]} onKeyDown={this.keyPress}/>
                      <FormFeedback invalid>
                      {this.state.errors["password"]}
                      </FormFeedback>
                    </InputGroup>
                    <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    //href="#allfund-page"//新增這行!!!
                    onClick={this.handleSubmit}
                  >
                    Login
                  </Button>
                  </Form>
                  
                </Card>
              </Col>
            </Row>
          </Container>
    </div>
    );
  }}

//export default SectionLogin;
export default withRouter(CheckLogin);
