import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Container, Row, Col} from "reactstrap";
import feature1 from '../../assets/img/feature1.png';
import feature2 from '../../assets/img/feature2.png';
import feature3 from '../../assets/img/feature3.png';
import feature4 from '../../assets/img/feature4.png';
//引入 Avatar
import Avatar from '@material-ui/core/Avatar';
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
      <Container>
 
        <Row>
          <div className="col">        
            <div className="features">
              <h4>績效預測</h4>
              <div className='title_line'></div>
              <img src={feature1} alt="Background" className="feature1"/>
              <p><span>大數據取得資料、AI分析基金績效。</span></p>
            </div>
          </div>
          <div className="col">
            <div className="features">
              <h4>個人化服務</h4>
              <div className='title_line'></div>
              <img src={feature2} alt="Background" className="feature2"/>
              <p><span>基金追蹤推薦，多種個人化服務。</span></p>
            </div>
          </div>
        </Row>
        <Row>
          <div className="col">
            <div className="features">
              <h4>資料視覺化</h4>
              <div className='title_line'></div>
              <img src={feature3} alt="Background" className="feature3"/>
              <p><span>基金指標圖表化，漲幅趨勢輕鬆掌握。</span></p>
            </div>
          </div>
          <div className="col">
            <div className="features">
              <h4>LINE Bot</h4>
              <div className='title_line'></div>
              <img src={feature4} alt="Background" className="feature4"/>
              <p><span>LINE Bot with FUNDU，理財行動化。</span></p>
            </div>
          </div>
        </Row>
      </Container>

    </div>

  );
}

export default SectionCarousel;
