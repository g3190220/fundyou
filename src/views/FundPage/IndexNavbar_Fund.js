import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import logout from "views/Function/logout.js";
import { logout_deletecookie,load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
// reactstrap components

//個人icon
import FaceIcon from '@material-ui/icons/Face';

//處理登出y
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

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
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };


  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 99 ||
        document.body.scrollTop > 99
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 500 ||
        document.body.scrollTop < 500
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

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


  const member_id=load_cookies("member_id")
  const member_session=load_cookies("member_session")
  //預設網址
  const [path] = React.useState(`/personalize-page/id=${member_id}`);
  const[path_all_fund] = React.useState(`/allfund-page/id=${member_id}`);
  

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
          
            title="Coded by Creative Tim"
            tag={Link}
          >
           FUNDU
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
          <NavbarBrand
            data-placement="bottom"
            to = {path}
            tag={Link}
          >
           <FaceIcon className="navbar-face-icon"></FaceIcon>
           <span>   個人專區</span>
          </NavbarBrand>
          
        </div>
        
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
        <Nav navbar>
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
        <DialogTitle id="alert-dialog-slide-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={(e)=>logout(e)} color="primary" >
            Agree
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
