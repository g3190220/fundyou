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
        <div className="stars1" id="s1_1"></div>
        <div className="stars2" id="m1_2"></div>
        <div className="stars3" id="l1_3"></div>
        <div className="stars1" id="s2_1"></div>
        <div className="stars2" id="m2_2"></div>
        <div className="stars3" id="l2_3"></div>
            <div className="content-logo">
            {/* //   style={{
            //     backgroundImage:
            //       "url(" + require("assets/img/examples/clock.gif") + ")"
            // }}> */}
              <h3 className="title-brand">致 富 思 考 </h3>
              <div className="title-line"></div>
              <h2 className="presentation-title"><span className="title_1">FUND</span><br/><span className="title_2">YOU</span></h2>
            </div >
        </Col>
      </Row>
        
      </Container>
      </div> 
   
    
      
      
    
  );
}

export default IndexHeader;
