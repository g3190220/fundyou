import React from "react";
// reactstrap components
import { Container, Row, Col, Button } from 'reactstrap';

function IndexHeader() {
  return (
    <div
      className="page-header"
      style={{
        backgroundColor: '#004487',
        backgroundImage: "linear-gradient(to bottom,#004487 15%,transparent 30%),radial-gradient(60% 90% at 50% 90%,#59acff 20%,transparent 80% 100%)",
    }}>
    <Container>
    
    <Row>
        <Col>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
            <div className="content-logo">
            {/* //   style={{
            //     backgroundImage:
            //       "url(" + require("assets/img/examples/clock.gif") + ")"
            // }}> */}
              <h3 className="title-brand">Think and Grow Rich</h3>
              <h2 className="presentation-title">Fund<br/>You</h2>
            </div >
        </Col>
      </Row>
        
      </Container>
      </div> 
   
    
      
      
    
  );
}

export default IndexHeader;
