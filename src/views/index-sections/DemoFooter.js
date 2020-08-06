import React from "react";

import { Row, Container } from "reactstrap";

function DemoFooter() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}by FundU
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
