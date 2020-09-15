import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
//import Cookies from 'js-cookie';
import _ from "underscore";

import { Container, Row, Col, Button } from 'reactstrap';
import ExamplesNavbar from "views/FundPage/IndexNavbar_Fund.js";
//icon
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CreateIcon from '@material-ui/icons/Create';
import imageToBase64 from 'image-to-base64';

//cookies
import { load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies

//覆寫CSS
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { forwardRef } from 'react';

//功能
import isEmpty from 'views/Function/isEmpty.js'
//自動跳轉
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
  } from "react-router-dom";
import { TextareaAutosize } from '@material-ui/core';


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


})


class PersonlDataPage extends React.Component {
  
  state = {
  }
  constructor(props) {
      super(props)
      this.getPersonalData=this.getPersonalData.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleChangeImage = this.handleChangeImage.bind(this);
      //console.log(this.state)
      this.state = {
        //fields: {},
        errors: {},
        
        disabled:true,
        edit_disabled:false,   
        flag:false,
        showButton:"hidden",
        image_old:""
    }
    
      //console.log(this.state) 
  }
  componentDidMount() {
    this.getPersonalData();
  }
  //取得全部會員資料
  getPersonalData(){
    let member_info=[];
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
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
          console.log("或取資料")
          console.log(jsonData)
          
          if(jsonData.StatusCode==200){
              member_info=JSON.parse(jsonData.member_info)
              //獲得以下資料
              this.state.email=member_info.member_email
              this.state.password=member_info.member_password
              this.state.username=member_info.member_name
              this.state.gender=member_info.member_gender
              this.state.birthday=member_info.member_birthday
              this.state.job=member_info.member_job
              this.state.image=member_info.member_photo
              this.state.image_old=member_info.member_photo

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
  //點擊edit btn,觸發編輯事件
  handleEdit(){
    this.state.disabled=false
    this.state.edit_disabled=true
    this.state.showButton="visible"
    this.setState({disabled: this.state.disabled});
    this.setState({edit_disabled:this.state.edit_disabled})
    this.setState({showButton:this.state.showButton})
    
  }

  //處理照片上傳               
  handleChangeImage(evt){
    //console.log("Uploading");
    var self = this;
    //console.log(this);
    var reader = new FileReader();
    var file = evt.target.files[0];

    reader.onload = function(upload) {
      self.setState({
          image: upload.target.result
      });
  };
  if (this.state.image.length < 100) {
    this.state.image=this.state.image_old
    reader.readAsDataURL(file);  
  } 
  else {
    reader.readAsDataURL(file);  
  }   
  setTimeout(function() {
    console.log(self.state.image);
  }, 1000);
  console.log(this.state)
  }

  //點擊submit btn
  handleSubmit(){
    const check_photo=this.state.image
    if(check_photo.startsWith('https')){
      this.state.image=-1
      this.setState({image:this.state.image})
    }
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://fundu.ddns.net:8090/UpdateUserInfo";////////改url
    fetch(url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    userid: load_cookies("member_id"),
                    password: this.state.password,
                    user_name:this.state.username,
                    gender:this.state.gender,
                    birthday:this.state.birthday,
                    Job:this.state.job,
                    photo:this.state.image,
                    session_password: load_cookies("member_session")
              
             
              })
              
        
        })
        .then((response) => {return response.json();})
        .then((jsonData) => {
          console.log("更新")
          console.log(this.state.image)
          console.log(jsonData)
          if(jsonData.StatusCode==200){
              alert("更新成功！")
              //刷新頁面
              this.setState();
              window.location.reload(true); 
              //this.getPersonalData();
        }
        })

  }

  //更改資料時，追蹤並更新state
  handleChange = name => event => {
    this.setState({
      [name]: event.nativeEvent.target.value,
    });
  }

  handleSelectChange = name2 => event =>{
    this.setState({
      [name2]: event.target.value,
    });
    console.log(this.state.gender)
    
  } 
  render() {
    const { classes } = this.props;
    var that = this;
    return (
    this.state.flag && <div>
      <div
        className="page-header"
        id="signup"
        style={{
          backgroundColor: '#f6f6f6',
         }}
       >
      <ExamplesNavbar></ExamplesNavbar>
      
      <Container className='Personalization-page-position'>
        <div className='personalization-title'><span className={classes.headercolor}>PERSONAL DATA </span>
              <div className="position-right">
              <Button variant="contained" color="Default" onClick={this.handleEdit} style={{marginRight: '25px',width:'88px'}}>
                Edit
              </Button>
              <Button variant="contained" color="Default" style={{width:'88px'}} onClick={this.handleSubmit}>
                Submit
              </Button>
              </div>
          </div>
        <hr className="my-2" />
        <div>  
        <form onSubmit={this.handleSubmit} className='register_textfield_font'>
        <React.Fragment> 
          <div>
          <div className='avatar_preview_div'><img src={this.state.image} className='avatar_preview'/></div>
          <div className='avatar_btn_div' style={{visibility:this.state.showButton}}>
          <label class="btn btn-default" style={{height: '38px',width:'116px'}}>
          <input ref="file" type="file" name="file" 
                              className="upload-file" 
                              id="file"
                              onChange={this.handleChangeImage}
                              encType="multipart/form-data" 
                              required
                              style={{display:'none'}}
                              disabled={this.state.disabled}
                              accept="image/*"
                              
                              />
          
          <i class="fa fa-photo"></i>  UPLOAD 
          </label>
          </div>
          </div>
        <Row>
          <Col sm>
              <TextField
                id="email"
                label="email"
                margin="normal"
                onChange={this.handleChange('email')}
                variant="outlined"
                fullWidth
                autoComplete='off'
                disabled
                value={this.state.email}
                InputLabelProps={{
                  shrink: true,
                }}
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
              disabled={this.state.disabled}
              InputLabelProps={{
                shrink: true
              }}
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
            disabled={this.state.disabled}
            InputLabelProps={{
              shrink: true
            }}
            classes={{root: classes.username}}

          />
          </Col>
          <Col sm={3}>
            <TextField
            id="gender"
            select
            label="gender"
            //value="1"
            key={this.state.gender}
            defaultValue={this.state.gender}
            onChange={this.handleSelectChange('gender')}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            helperText={this.state.errors["gender"]}
            error={this.state.errors["gender"]}
            disabled={this.state.disabled}
            InputLabelProps={{
              shrink: true
            }}
            classes={{root: classes.gender}}
            >
            {/* {gender_.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))} */}
            {gender_.map((u, i) => (
              <MenuItem value={u.value} key={i}>
                {u.label}
              </MenuItem>
            ))}
            </TextField>
          
          </Col>
          <Col sm={3}>
          <TextField
            id="birthday"
            label="birthday"
            type="date"
            value={this.state.birthday}
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
            disabled={this.state.disabled}
            InputLabelProps={{
              shrink: true
            }}
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
                //defaultValue={{ label: "d", value: this.state.job }}           
                //value="5"
                key={this.state.job}
                defaultValue={this.state.job}
                margin="normal"
                onChange={this.handleSelectChange('job')}
                variant="outlined"
                fullWidth
                autoComplete='off'
                required
                helperText={this.state.errors["job"]}
                error={this.state.errors["job"]}
                disabled={this.state.disabled}
                InputLabelProps={{
                  shrink: true
                }}
                classes={{root: classes.job}}

              >
              {/* {job_.map((option) => (
              <MenuItem key={option.value} value={option.value} >
                {option.label}
              </MenuItem>
            ))} */}
                    {job_.map((u, i) => (
              <MenuItem value={u.value} key={i}>
                {u.label}
              </MenuItem>
            ))}
            </TextField>
          </Col>
        </Row>
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
PersonlDataPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PersonlDataPage);

// export default PersonlDataPage