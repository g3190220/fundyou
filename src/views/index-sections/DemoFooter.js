import React from "react";

import { Row, Container } from "reactstrap";
import lineQR from '../../assets/img/QRcode.png';

function DemoFooter() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <div className="introduction">
            <h4>關於我們</h4>
            <p>中央大學資訊管理學系 學生團隊</p>
            <h4>聯絡我們</h4>
            <p>Email：fundu@gmail.com</p>
            <div className="copyright_line"></div>
            <span className="copyright_text">
              © {new Date().getFullYear()}, made with{" "}by FundU
            </span>
          </div>
          <div className="lineqr_code">
            <h4>LINE bot</h4>
            <img src={lineQR} alt="Background" className="lineQR"/>
          </div>
         
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
