import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import _ from "underscore";

import { Container, Row, Col, Button } from 'reactstrap';

//loading 頁面
import LoadingIndicator_small from "views/Function/LoadingIndicator_small.js";

//覆寫CSS
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { forwardRef } from 'react';


//自動跳轉
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
//   } from "react-router-dom";


//gender 選項
const gender_ = [
  {
    value: 1,
    label: 'Male',
  },
  {
    value: 2,
    label: 'Female',
  },
];

//job 選項
const job_ = [
  {
    value: 1,
    label: '軍警',
  },
  {
    value: 2,
    label: '公務人員',
  },
  {
    value: 3,
    label: '教育',
  },
  {
    value: 4,
    label: '商',
  },
  {
    value: 5,
    label: '工',
  },
  {
    value: 6,
    label: '農',
  },
  {
    value: 7,
    label: '醫療',
  },
  {
    value: 8,
    label: '家管',
  },
  {
    value: 9,
    label: '學生',
  },
  {
    value: 10,
    label: '退休',
  },
  {
    value: 11,
    label: '待業中',
  },
  {
    value: 12,
    label: '其他',
  },
];

const styles = () =>({
  headercolor: {
    color: "#000",
    fontSize:25,
    fontWeight: 500,
  },
  email: {
    backgroundColor: "#fff",
  },
  password: {
    backgroundColor: "#fff",
  },
  username: {
    backgroundColor: "#fff",
  },
  gender: {
    backgroundColor: "#fff",
  },
  birthday: {
    backgroundColor: "#fff",
  },
  job: {
    backgroundColor: "#fff",
  },
  lineid: {
    backgroundColor: "#fff",
  },


})



class LiffRegister extends React.Component {
  
  state = {
  }
  constructor(props) {
      super(props)
      
      this.handleSubmit = this.handleSubmit.bind(this);
      this.goback = this.goback.bind(this);
      //console.log(this.state)
      this.state = {
        //fields: {},
        errors: {},
        flag:false,
    }
      //console.log(this.state) 
  }


  handleValidation(){
    //let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;//還沒有限定email長度
    const pwdRule = /^(\w){1,45}$/;
    const nameRule = /^([\u4e00-\u9fa5_a-zA-Z0-9]){1,45}$/;
    const dateRule =/^([0-9]{4})[./]{1}([0-9]{1,2})[./]{1}([0-9]{1,2})+$/
    var check_data = [this.state.email,
                      this.state.password,
                      this.state.username,
                      this.state.gender,
                      this.state.birthday,
                      this.state.job,
                      this.state.line_id];
    var column = ["email","password","username","gender","birthday","job","line_id"];
    var i=0;
    //console.log(this.state.password)
    //console.log(this.state.birthday)

    //看有沒有空值
    for(i=0;i<6;i++){
        if(typeof check_data[i] == "undefined" || !check_data[i]){
          //console.log(valid[0])
          formIsValid = false;
          errors[column[i]] = "Cannot be empty";
          errors[column[i]+'_is_errors'] = true;
        }    
    }
    //檢查email格式
    if(typeof check_data[0] != "undefined" || check_data[0]){
       if(!this.state.email.match(emailRule)){
                formIsValid = false;
                errors["email"] = "Wrong format";
                errors["email_is_errors"] = true;
                //console.log(this.state)
                //console.log(this.state.errors)
       }
    }    
    //檢查password
    if(typeof check_data[1] != "undefined" || check_data[1]){
      if(!this.state.password.match(pwdRule)){
               formIsValid = false;
               errors["password"] = "(a-z 0-9 A-Z) and 45 chracters only";
               errors["password_is_errors"] = true;
      }
    } 
    //檢查username
    if(typeof check_data[2] != "undefined" || check_data[2]){
      if(!this.state.username.match(nameRule)){
               formIsValid = false;
               errors["username"] = "(a-z 0-9 A-Z Chinese) and 45 chracters only";
               errors["username_is_errors"] = true;
      }
    } 
   this.setState({errors: errors});
   //console.log(errors)
   //console.log(this);
   return formIsValid;
  }


  handleSubmit(){
    this.setState({flag:true});
    let errors = {};
    //errors["email"] = "Duplicate account"
    console.log(this.handleValidation())
    //取消DOM的預設功能
    window.event.preventDefault();
    if(this.handleValidation()) 
    {
        //const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://fundu.ddns.net:8090/CreateUser";
        //console.log(data)
        fetch(url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    user_name: this.state.username,
                    gender: this.state.gender,//數值 1,2
                    birthday: this.state.birthday,
                    Job: this.state.job,//數值 1~2
                    line_id: "",
              })
              
        
        })
        .then((response) => {console.log(response);return response.json();})
        .then((jsonData) => {
          console.log(jsonData)
          //console.log(jsonData.StatusCode)
          if(jsonData.StatusCode==200){
            this.setState({flag:false});
            this.state.errors["message"] = "註冊成功！即將跳轉回連結頁面，請重新做連結。";
            this.setState({errors: this.state.errors});
            setTimeout(() =>
              //window.event.preventDefault();
              this.props.history.push("/liff-linking")
            ,2500)
            console.log(this.state.errors)

          }
          else if(jsonData.StatusCode==1000){
            this.state.errors["message"] = "註冊失敗！此Email帳號已經註冊過。";
            //this.state.errors["email"] = "Duplicate account";
            this.state.errors["email_is_errors"] = true;
            this.setState({errors: this.state.errors});
            console.log(this.state.errors);
            

          }
          else{
            alert("error")
          }
        })
        
        
    }
    else{
      console.log("error")
    }
    
  }
                   


  handleChange = name => event => {
    this.setState({
      [name]: event.nativeEvent.target.value,
    });
  }

  handleSelectChange = name2 => event =>{
    this.setState({
      [name2]: event.target.value,
    });
    
  }

  goback(){
    this.props.history.push({
      pathname: "/liff-linking"
  })
  }
  
  render() {
    const { classes } = this.props;
    var that = this;
    return (
    <div>
      <div
        className="page-header"
        id="signup"
        style={{
          backgroundColor: '#e9ecef',
         }}
       >
      
      <Container>
        <div className='register-title'><h3 className={classes.headercolor}>創建新帳戶</h3></div>
        {!this.state.flag ? (<span></span>):(<LoadingIndicator_small></LoadingIndicator_small>)}
        <hr className="my-2" />
        <div>  
        <form onSubmit={this.handleSubmit} className='register_textfield_font'>
        <React.Fragment>
        <Row>
          <Col sm>
              <TextField
                id="email"
                label="email"
                value={this.state.email}
                margin="normal"
                onChange={this.handleChange('email')}
                variant="outlined"
                fullWidth
                autoComplete='off'
                required
                helperText={this.state.errors["email"]}
                error={this.state.errors["email_is_errors"]}
                classes={{root: classes.email}}
              />
          
          </Col>
          <Col sm>
              <TextField
              id="password"
              label="password"
              value={this.state.password}
              margin="normal"
              onChange={this.handleChange('password')}
              variant="outlined"
              fullWidth
              autoComplete='off'
              required
              helperText={this.state.errors["password"]}
              error={this.state.errors["password_is_errors"]}
              classes={{root: classes.password}}

            />
         
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <TextField
            id="username"
            label="username"
            value={this.state.username}
            margin="normal"
            onChange={this.handleChange('username')}
            variant="outlined"
            fullWidth
            autoComplete='off'
            required
            helperText={this.state.errors["username"]}
            error={this.state.errors["username_is_errors"]}
            classes={{root: classes.username}}

          />
          </Col>
          <Col sm={3}>
            <TextField
            id="gender"
            select
            label="gender"
            value={this.state.gender}
            onChange={this.handleSelectChange('gender')}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            helperText={this.state.errors["gender"]}
            error={this.state.errors["gender"]}
            classes={{root: classes.gender}}

            >
            {gender_.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </TextField>
          
          </Col>
          <Col sm={3}>
          <TextField
            id="birthday"
            label="birthday"
            type="date"
            defaultValue="2000-01-01"
            //className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            onChange={this.handleChange('birthday')}
            variant="outlined"
            fullWidth
            required
            helperText={this.state.errors["birthday"]}
            error={this.state.errors["birthday"]}
            classes={{root: classes.birthday}}

          />
          </Col>
        </Row>
        <Row>
          <Col sm>
              <TextField
                id="job"
                label="job"
                select
                value={this.state.job}
                margin="normal"
                onChange={this.handleSelectChange('job')}
                variant="outlined"
                fullWidth
                autoComplete='off'
                required
                helperText={this.state.errors["job"]}
                error={this.state.errors["job"]}
                classes={{root: classes.job}}

              >
              {job_.map((option) => (
              <MenuItem key={option.value} value={option.value} >
                {option.label}
              </MenuItem>
            ))}
            </TextField>
                
              
          
          </Col>
          {/* <Col sm>
          
              <TextField
              
              id="LINE id"
              label="LINE id"
              value={this.state.line_id}
              margin="normal"
              onChange={this.handleChange('line_id')}
              variant="outlined"
              fullWidth
              autoComplete='off'
              classes={{root: classes.lineid}}

            />
         
          </Col> */}
        </Row>
          <div className="register-btn">
              <Button variant="contained" color="Default" onClick={this.handleSubmit} style={{width:'95px'}}>
                提交
              </Button>
          </div>
          <div className="register-btn">
              <Button variant="contained" color="Default" onClick={this.goback} style={{width:'95px'}}>
                回上一頁
              </Button>
          </div>
          <div className='register-alert' ><span>{this.state.errors["message"]}</span></div>
        </React.Fragment>
        </form>
      </div>
      
    </Container>
  </div>
  </div>
  );
  }
}
LiffRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(LiffRegister);
