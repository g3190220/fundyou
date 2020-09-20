  import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import logout from "views/Function/logout.js";
import { logout_deletecookie,load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
// reactstrap components

//個人icon
import FaceIcon from '@material-ui/icons/Face';

//意見反饋
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TextField from '@material-ui/core/TextField';

//處理登出y
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

//功能
import isEmpty from 'views/Function/isEmpty.js'

import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  //Button
} from "reactstrap";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };


  React.useEffect(() => {
    

    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 0 ||
        document.body.scrollTop > 0
      ) {
        setNavbarColor("");
      } 
    };
    //getPDData();
    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  //登出對話框
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   //意見對話框
   const [open2, setOpen2] = React.useState(false);

   const handleClickOpen2 = () => {
     setOpen2(true);
   };
 
   const handleClose2 = () => {
     setOpen2(false);
   };


  const member_id=load_cookies("member_id")
  const member_session=load_cookies("member_session")
  //預設網址
  // const [path] = React.useState(`/page-myTag/id=${member_id}`);
  const [path] = React.useState(`/page-myFund`);

  // const[path_all_fund] = React.useState(`/allfund-page/id=${member_id}`);
  const[path_all_fund] = React.useState(`/allfund-page`);

  

  

  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to={path_all_fund}
          
            title="FUNDU"
            tag={Link}
          >
           FUNDU
          </NavbarBrand>
          <NavbarBrand
            data-placement="bottom"
            to={path}
          
            title="個人專區"
            tag={Link}
          >
           <FaceIcon></FaceIcon>個人專區
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <div className="navbar-face-icon">
         
          
        </div>
        
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
        <Nav navbar>
            
        <NavItem>
          <Button color="action" onClick={handleClickOpen2}>
              意見反饋
          </Button>
        </NavItem>
        <Dialog 
          open={open2} 
          keepMounted
          onClose={handleClose2} 
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
            <Button onClick={handleClose2} color="primary">
              取消
            </Button>
            <Button onClick={handleClose2} color="primary">
              送出
            </Button>
          </DialogActions>
        </Dialog>


        <NavItem>
          <Button color="secondary" onClick={handleClickOpen}>
          LOGOUT
          </Button>
        </NavItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
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
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={(e)=>logout(e)} color="primary" >
            是
          </Button>
        </DialogActions>
      </Dialog>
             
           </Nav>
         </Collapse>
       </Container>
     </Navbar>
      
  );
}

export default IndexNavbar;
