import React from "react";
// reactstrap components
import { Container, Row, Col, Button } from 'reactstrap';

function IndexHeader() {
  return (
    <div
      className="page-header"
      style={{
        backgroundColor: '#ffb5a7',
    }}>
    <Container>
    
    <Row>
        <Col>
            <div className='svg-position'>
              <svg preserveAspectRatio="xMidYMid meet" data-bbox="3.5 3.5 193 193" viewBox="3.5 3.5 193 193" height="420" width="420" xmlns="http://www.w3.org/2000/svg" data-type="color" role="img">
                <g>
                <path fill="#FFFFFF" d="M100.267 3.5v16.632h-.533V3.5h.533z" data-color="1"></path>
                <path fill="#FFFFFF" d="M100.267 179.868V196.5h-.533v-16.632h.533z" data-color="1"></path>
                <path fill="#FFFFFF" d="M196.5 99.734v.533h-16.632v-.533H196.5z" data-color="1"></path>
                <path fill="#FFFFFF" d="M20.132 99.734v.533H3.5v-.533h16.632z" data-color="1"></path>
                <path fill="#FFFFFF" d="M183.533 51.68l.265.462-14.42 8.288-.265-.462 14.42-8.288z" data-color="1"></path>
                <path fill="#FFFFFF" d="M30.622 139.565l.265.462-14.42 8.288-.265-.463 14.42-8.287z" data-color="1"></path>
                <path fill="#FFFFFF" d="M147.819 16.183l.462.265L140 30.872l-.463-.266 8.282-14.423z" data-color="1"></path>
                <path fill="#FFFFFF" d="M59.997 169.131l.463.266-8.282 14.423-.462-.265 8.281-14.424z" data-color="1"></path>
                <path fill="#FFFFFF" d="M51.896 16.342l8.331 14.395-.461.267-8.331-14.395.461-.267z" data-color="1"></path>
                <path fill="#FFFFFF" d="M140.236 168.986l8.33 14.395-.46.267-8.332-14.395.462-.267z" data-color="1"></path>
                <path fill="#FFFFFF" d="M16.39 51.817l14.433 8.264-.265.463-14.433-8.265.265-.462z" data-color="1"></path>
                <path fill="#FFFFFF" d="M169.44 139.454l14.433 8.264-.264.463-14.434-8.265.265-.462z" data-color="1"></path>
                </g>
              </svg>
            </div> 
            <div className="content-logo">
            {/* //   style={{
            //     backgroundImage:
            //       "url(" + require("assets/img/examples/clock.gif") + ")"
            // }}> */}
              <h3 className="title-brand">Think and Grow Rich</h3>
              <h2 className="presentation-title">Fund<br/>You</h2>
            </div >
        </Col>
        <Col>
            <div className="welcome">
              <h4 className="title">Welcome to join us !</h4>
              <div className="description">
                <span>We will provide smart tools<br/>and recommend funds <br/>that are most suitable for you.<br/>Make investemt become easily.</span>
              </div>
              
              <div className="btn-position">
                <Button color="neutral" style={{width:250}} href = "#register-page">Join us！</Button>
                {/* <Button color="neutral" style={{width:130}}>Login</Button> */}
              </div>
            </div>
        </Col> 
      </Row>
        
      </Container>
      </div> 
   
    
      
      
    
  );
}

export default IndexHeader;
