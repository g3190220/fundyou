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
      <Carousel responsive={responsive}>
      <Container>
        <Row className="features_title" style={{display:"inline-block"}}>
          <div>FUNDU 特 色</div>
        </Row>  
        <Row>
          <Col className="col1">        
            <div className="features">
              <h4>績效預測</h4>
              <div className='title_line'></div>
              <img src={feature1} alt="Background" className="feature1"/>
              <p data-text="透過大數據取得基金風險、經理人能力、淨值等多面向指標，結合機器學習對基金進行數據分析，
            預測未來可能的基金績效走勢並推薦給使用者。"><span>透過大數據取得基金風險、經理人能力、淨值等多面向指標，結合機器學習對基金進行數據分析，
            預測未來可能的基金績效走勢並推薦給使用者。</span></p>
            </div>
          </Col>
          <Col>
            <div className="features">
              <h4>個人化服務</h4>
              <div className='title_line'></div>
              <img src={feature2} alt="Background" className="feature2"/>
              <p data-text="Tag、備忘錄、基金追蹤與推薦、等多種計算工具，使用者能依照自身的投資狀況
                ，使用我們所設計的個人化服務功能。"><span>Tag、備忘錄、基金追蹤與推薦、等多種計算工具，使用者能依照自身的投資狀況
                ，使用我們所設計的個人化服務功能。</span></p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col1">
            <div className="features">
              <h4>資料視覺化</h4>
              <div className='title_line'></div>
              <img src={feature3} alt="Background" className="feature3"/>
              <p data-text="投資報酬率、淨值、風險等各項指標圖表化，一目了然各種漲跌起伏；
                比較不同基金指標的變化，使用者更能掌握趨勢。"><span>投資報酬率、淨值、風險等各項指標圖表化，一目了然各種漲跌起伏；
                比較不同基金指標的變化，使用者更能掌握趨勢。</span></p>
            </div>
          </Col>
          <Col>
            <div className="features">
              <h4>LINE BOT</h4>
              <div className='title_line'></div>
              <img src={feature4} alt="Background" className="feature4"/>
              <p data-text="使用者透過行動裝置將LINE連動後，即可透過該裝置來管理個人化基金追蹤、查詢基金、
                查看月報表等，使基金理財行動化。"><span>使用者透過行動裝置將LINE連動後，即可透過該裝置來管理個人化基金追蹤、查詢基金、
                查看月報表等，使基金理財行動化。</span></p>
            </div>
          </Col>
        </Row>
      </Container>
    </Carousel>
    
    </div>

  );
}

export default SectionCarousel;
