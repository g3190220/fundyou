import React, { PureComponent } from 'react';
// import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'reactstrap';
import PersonalizeMenu from "views/PersonalizePage/PersonalizeMenu.js";
import Result from "views/PersonalizePage/PersonalizeResult.js";
import {Button} from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { logout_deletecookie,load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import { PieChart, Pie, Sector } from 'recharts';

// import FcBusinessman from "react-icons/fc";


class PageCharacterAnalysis extends React.Component{
    state = {
    }
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
          //fields: {},
          errors: {}
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  //頁面置頂
    }
  
    //點擊去頁面
    handleSubmit(){
        const member_id=load_cookies("member_id");
        const path=`/page-survey/id=${member_id}`
        this.props.history.push({
            pathname: path 
        })
    }

    render(){
    
    
    return(
    <div className="page-header" style={{backgroundColor: '#fff',}}>
    {/* <IndexNavbar></IndexNavbar> */}
    <Container>
    <div className="card-personalize-characteranalysis">

    <PersonalizeMenu></PersonalizeMenu>
        
        <div className="card-personalize2">
            <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>性格分析</b></font></h4>

            <div className="game-title">
                <span style={{fontWeight:"bold"}}>由FundU打造的投資性格分析，</span><br/>
                <span style={{fontWeight:"bold"}}>帶您透過性格測驗來了解投資偏好</span>
            </div>
            <div className="start-btn">
                <button type="button" class="btn btn-neutral" onClick={this.handleSubmit}>前往性格測驗</button>    
            </div>            
        </div>

        <div className="card-personalize2-1">
            <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>性格分析結果</b></font></h4>

            <div className="result-1">
                <div className="game-result-title-1">
                    <span style={{fontWeight:"bold"}}>根據測驗結果，您屬於：</span>
                    <span style={{fontWeight:"bold"}}>保守型投資人</span><br/>
                    <div className="result-chart"><Result></Result></div>
                </div>
                <div className="result-content-1">
                    <span style={{fontWeight:"bold"}}>
                        保守型投資人對風險的承受力較低，期待投資能夠盡量保本並有穩定的回報。建議選擇風險波動度較小的產品。
                    </span><br/><br/>
                    <span style={{fontWeight:"bold"}}>適合的基金類型：</span><br/>
                    <span style={{fontWeight:"bold"}}>債券型、有固定配息的收益型債券基金、組合式基金</span><br/>
                </div>
            </div>

            {/* <div className="result-2">
                <div className="game-result-title-2">
                    <span style={{fontWeight:"bold"}}>根據測驗結果，您屬於：</span>
                    <span style={{fontWeight:"bold"}}>穩健型投資人</span><br/>
                    <div className="result-chart"><Result></Result></div>
                </div>
                <div className="result-content-2">
                    <span style={{fontWeight:"bold"}}>
                        穩健型投資人願意為了累積財富而適當承受風險。在做決策時會審慎評估其可能隱含的損失，並在風險合理的情況下去追求中等的獲利與報酬。
                    </span><br/><br/>
                    <span style={{fontWeight:"bold"}}>適合的基金類型：</span><br/>
                    <span style={{fontWeight:"bold"}}>平衡型、區域型基金</span><br/>
                </div>
            </div>

            <div className="result-3">
                <div className="game-result-title-3">
                    <span style={{fontWeight:"bold"}}>根據測驗結果，您屬於：</span>
                    <span style={{fontWeight:"bold"}}>成長型投資人</span><br/>
                    <div className="result-chart"><Result></Result></div>
                </div>
                <div className="result-content-3">
                    <span style={{fontWeight:"bold"}}>
                        成長型投資人願意承受部分風險，追求資產能有成長的機會。通常願意嘗試新鮮的事物，在資產配置中可將基金列為資產成長主力。
                    </span><br/><br/>
                    <span style={{fontWeight:"bold"}}>適合的基金類型：</span><br/>
                    <span style={{fontWeight:"bold"}}>平衡型、區域型、全球股票型基金</span><br/>
                </div>
            </div>

            <div className="result-4">
                <div className="game-result-title-4">
                    <span style={{fontWeight:"bold"}}>根據測驗結果，您屬於：</span>
                    <span style={{fontWeight:"bold"}}>積極型投資人</span><br/>
                    <div className="result-chart"><Result></Result></div>
                </div>
                <div className="result-content-4">
                    <span style={{fontWeight:"bold"}}>
                        積極型投資人以追求資本利得為目標，願意利用風險較高或是新推出的金融商品作為投資工具，來獲得高報酬。
                    </span><br/><br/>
                    <span style={{fontWeight:"bold"}}>適合的基金類型：</span><br/>
                    <span style={{fontWeight:"bold"}}>單一國家股票型、產業股票型基金</span><br/>
                </div>
            </div> */}

            

        </div>
    </div>

        

    </Container>

    </div>
    
    );
    }
    }

    export default PageCharacterAnalysis;