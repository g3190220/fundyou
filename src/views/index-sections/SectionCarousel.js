import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Container, Row, Col} from "reactstrap";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function SectionCarousel() {
  return (
    <div className='section-carousel'>
      <Carousel responsive={responsive}>
      <Container>
        <Row>
        <Col>
          <div className="description">
            <span>We provide<br/>various fund rankings</span>
          </div>
        </Col>
        <Col>
          <div className='sub-carousel'>
            <span className='table-title'>Top 10 Fund Rankings</span>
            <div class="link-top"></div>
            <table>
            </table>
          </div>
        </Col>
        </Row>
        </Container>
        <Container>
        <Row>
        <Col>
          <div className="description">
            <span>We provide<br/>various fund rankings</span>
          </div>
        </Col>
        <Col>
          <div className='sub-carousel'>
            <span className='table-title'>Our Recommendation</span>
            <div class="link-top"></div>
            <table>
            </table>
          </div>
        </Col>
        </Row>
        </Container>
          
    
    </Carousel>
    
    </div>

  );
}

export default SectionCarousel;
