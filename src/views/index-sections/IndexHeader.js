import React from "react";
// reactstrap components
import { Container, Row, Col, Button } from 'reactstrap';

class IndexHeader extends React.Component{
  state = {
    timer:0,
    char:'U'
  };
  updatetitle(){setInterval(() => {
    if((this.state.timer+1)%2==0){
      this.setState(()=>{return {timer:this.state.timer+1,char:'U'}})
    }
    else{
      this.setState(()=>({timer:this.state.timer+1,char:'I'})) //兩種寫法都可以
    }
  }, 5000);}
  componentDidMount() {
    this.updatetitle()
  }
  
  render(){
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
                <h3 className="title-brand">「找到您」專屬的基金投資工具</h3>
            <h2 className="presentation-title"><span className="title_1">F{this.state.char}ND</span><br/><span className="title_2">YOU</span></h2>
                <div className="title-line"></div>
                <h4 className="title-brand_1">圖形化的介面管理系統，讓您輕鬆上手基金市場。</h4>
              </div >
          </Col>
        </Row>
          
        </Container>
        </div> 
    );
  }
}

export default IndexHeader;
