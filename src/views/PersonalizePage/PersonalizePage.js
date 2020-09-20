// reactstrap components
import React from "react";
import Sidebar from "react-sidebar";
// import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import PersonalizeMenu2 from "views/PersonalizePage/PersonalizeMenu2.js";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';


//引入material-ui list
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';


//引入icon
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import FaceIcon from '@material-ui/icons/Face';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ListIcon from '@material-ui/icons/List';


//引入 Avatar
import Avatar from '@material-ui/core/Avatar';

//處理登出
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import logout from "views/Function/logout.js";

//意見反饋
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TextField from '@material-ui/core/TextField';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
  } from "react-router-dom";
 //處理個人資料取得
import isEmpty from 'views/Function/isEmpty.js' 
import {load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import { isImageUrl } from "antd/lib/upload/utils";

//sidebar 圖片
import Background from 'assets/img/sidebar.jpg';

const mql = window.matchMedia(`(min-width: 800px)`);

//處理登出
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class PersonalizePage extends React.Component {
  state = {
  }
  constructor(props) {
      super(props)
      this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      this.onSetSidebarDocked = this.onSetSidebarDocked.bind(this);
      this.handleClickOpen=this.handleClickOpen.bind(this);
      this.handleClose=this.handleClose.bind(this);
      this.handleClickOpen2=this.handleClickOpen2.bind(this);
      this.handleClose2=this.handleClose2.bind(this);
      this.state = {
        //fields: {},
        errors: {},
        sidebarDocked: false,
        sidebarOpen: false,
        open:false, 
        setOpen:false,
        open2:false,
    }}

    // componentDidMount() {
    //   window.scrollTo(0, 0);  //頁面置頂
    // }

    //處理sidebar
    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }
       
    componentWillUnmount() {
        // this.state.mql.removeListener(this.mediaQueryChanged);
        mql.removeListener(this.mediaQueryChanged);
    }
       
    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }

    onSetSidebarDocked() {
      this.setState({ sidebarDocked: true });
  }
       
    mediaQueryChanged() {
      this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }
  
  //點擊去頁面
  handleSubmit(url,e){
    
    const member_id=load_cookies("member_id")
    
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
          console.log("取得個人資料")
          if(jsonData.StatusCode==200){
              member_info=JSON.parse(jsonData.member_info)
              //獲得以下資料
              this.state.email=member_info.member_email
              this.state.username=member_info.member_name
              console.log(this.state.username)
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
        else{
          alert("請重新登入！")
          const path=`/index`
          this.props.history.push({
              pathname: path
              
          })
        }
        })
  }

  //處理登出視窗
  handleClickOpen(){
      this.setState({open:true})
  }
  handleClose(){
    this.setState({open:false})
  };
  //意見反饋視窗
  handleClickOpen2(){
    this.setState({
      open2: true
    });
  }

  handleClose2(){
    this.setState({
      open2: false
    });
  }
  

  render(){
    const { classes } = this.props;
    return (
      <div className='personlization-menu'>
      
      <Sidebar
      rootClassName="root-siderbar"
      sidebar={ 
        <div className='menu-position' style={{backgroundImage: "url(" + Background + ")"}}>
        
          <div className="default-photo">
              <Avatar src={this.state.image} className="avatar-size"/>
          </div>
          <div className='personality-position'>
            <span>{this.state.username}，您好</span>
            <IconButton aria-label="個人資料設定" color="primary" onClick={this.handleSubmit.bind(this, "personal-data-page")}>
              <SettingsIcon color="action" />
            </IconButton>
          </div>
          <hr size="6px" align="center" width="100%"></hr>
          <div>
          <div className="page-myfund">
                <button type="button" className="list-btn" onClick={this.handleSubmit.bind(this, "page-myFund")}>
                   <FavoriteIcon fontSize="small"></FavoriteIcon><div className="list-btn-content"> 追 蹤 基 金</div>
                    
                </button>
          </div>
          <div className="page-mytag">
                <button type="button" class="list-btn" onClick={this.handleSubmit.bind(this, "page-myTag")}>
                    <div className="face-icon"><LoyaltyIcon></LoyaltyIcon><div className="list-btn-content">我 的 T A G</div></div>
                    
                </button>
            </div>

            <div className="page-personalize"> 
                <button type="button" class="list-btn" onClick={this.handleSubmit.bind(this, "page-characterAnalysis")}>
                    <div className="face-icon"><ChildCareIcon></ChildCareIcon><div className="list-btn-content">性 格 分 析</div></div>
                </button>
            </div>

            <div className="page-pig">
                <button type="button" class="list-btn" onClick={this.handleSubmit.bind(this, "page-pig")}>
                    <div className="face-icon"><EmojiObjectsIcon></EmojiObjectsIcon><div className="list-btn-content">豬 豬 小 助 理</div></div>
                </button>
            </div>
            <div className="page-pig">
                <button type="button" class="list-btn" onClick={this.handleSubmit.bind(this, "allfund-page")}>
                    <div className="face-icon"><CallMissedOutgoingIcon></CallMissedOutgoingIcon><div className="list-btn-content">回 到 FUNDU</div></div>
                </button>
            </div>
            <div className='logout-btn-position'>
                <button type="button" class="list-btn"  onClick={this.handleClickOpen}>
                    <div className="face-icon"><ExitToAppIcon></ExitToAppIcon><div className="list-btn-content">登 出</div></div>
                </button>
            </div>
            <Dialog
              open={this.state.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.state.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{""}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  您確定要登出？
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  取消
                </Button>
                <Button onClick={(e)=>logout(e)} color="primary" >
                  是
                </Button>
              </DialogActions>
            </Dialog>
            <div className='logout-btn-position'>
                <button type="button" class="list-btn"  onClick={this.handleClickOpen2}>
                    <div className="face-icon"><EmojiPeopleIcon></EmojiPeopleIcon><div className="list-btn-content">意 見 反 饋</div></div>
                </button>
            </div>
            <Dialog 
              open={this.state.open2} 
              keepMounted
              onClose={this.handleClose2} 
              aria-labelledby="form-dialog-title"
              fullWidth={true}
              maxWidth={'xs'}
            >
                
            <DialogTitle >
              意見反饋
              <hr className="hr"></hr>
              </DialogTitle>
                
              <DialogContent>
                <DialogContentText >
                  若您在FUNDU上遇到問題，請填寫意見反饋。FUNDU會將您的寶貴建議予以檢討與改善。
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="請輸入欲回報之意見"
                  multiline
                  rowsMax={3}
                  type="string"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose2} color="primary">
                  取消
                </Button>
                <Button onClick={this.handleClose2} color="primary">
                  送出
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        
        </div>
     
      }
      open={this.state.sidebarOpen}
      //docked={this.state.sidebarDocked}
      onSetOpen={this.onSetSidebarOpen}
      >
        
      </Sidebar>
      <IconButton onClick={this.onSetSidebarOpen}>
          <ListIcon fontSize="large"/>
      </IconButton>
      </div>
      
    );
  }
}
export default withRouter(PersonalizePage);