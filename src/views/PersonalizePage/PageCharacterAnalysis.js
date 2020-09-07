import React, { PureComponent } from 'react';
// import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'reactstrap';
import PersonalizeMenu from "views/PersonalizePage/PersonalizePage.js"; //左側選單
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
          characteristic:"",
          description_1:'完成測驗即可獲得投資性格相關資訊',
          description_2:'無',
          texts:'您尚未做過性格測驗，點選上方的前往性格測驗按鈕完成問卷！',
          errors: {}
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  //頁面置頂

        //取得性格分析結果
        let data = []
        const url = "https://fundu.ddns.net:8090/getCharacteristic";////////改url
        //console.log(data)
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberID: load_cookies("member_id")
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.info)
            try{
                data=JSON.parse(jsonData.info)
                if(jsonData.StatusCode==200){
                    
                    console.log(data[0])
                    let description = [];
                    if(data[0].Member_characteristic =='保守型'){
                        description = ["保守型投資人對風險的承受力較低，期待投資能夠盡量保本並有穩定的回報。建議選擇風險波動度較小的產品。","債券型、有固定配息的收益型債券基金、組合式基金"]
                    }
                    else if(data[0].Member_characteristic =='穩健型'){
                        description = ["穩健型投資人願意為了累積財富而適當承受風險。在做決策時會審慎評估其可能隱含的損失，並在風險合理的情況下去追求中等的獲利與報酬。",'平衡型、區域型基金']
                    }
                    else if(data[0].Member_characteristic =='成長型'){
                        description = ["成長型投資人願意承受部分風險，追求資產能有成長的機會。通常願意嘗試新鮮的事物，在資產配置中可將基金列為資產成長主力。",'平衡型、區域型、全球股票型基金']
                    }
                    else if(data[0].Member_characteristic =='積極型'){
                        description = ["積極型投資人以追求資本利得為目標，願意利用風險較高或是新推出的金融商品作為投資工具，來獲得高報酬。","單一國家股票型、產業股票型基金"]
                    }
    
                    //更新state並獲得以下資料
                    this.setState((state, props) => {
                        return {counter: state.counter + props.step,
                                characteristic:data[0].Member_characteristic+'投資人',
                                description_1:description[0],
                                description_2:description[1],
                                texts:'根據測驗結果，您屬於：'
                                };
                    });
                }

            }
            catch(e){

            }

            })       
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
    <div className="card-personalize-characteranalysis">
    <PersonalizeMenu></PersonalizeMenu>
    <Container>
    <Row>
        <div className="card-personalize2">
        <Row>
        <div className="card-personalize1-title">性格分析</div>
            <div className="start-btn">
                <button type="button" class="btn btn-neutral" onClick={this.handleSubmit}>前往性格測驗</button>    
            </div>
        </Row>
        <Row>
            <div className="card-personalize2-1">
            <Row>
            <div className="card-personalize1-title2">性格分析結果</div>
            </Row>
            <Row>
            <div className="result-1">
                <Row>
                <div className="game-result-title-1">
<<<<<<< HEAD
                    <span style={{fontWeight:"bold"}}>{this.state.texts}</span>
                    <span style={{fontWeight:"bold"}}>{this.state.characteristic}</span><br/>
                    <div className="result-chart"><Result></Result></div>
=======
                    <span style={{fontWeight:"bold"}}>根據測驗結果，您屬於：</span>
                    <span style={{fontWeight:"bold"}}>{this.state.characteristic}投資人</span><br/>
>>>>>>> edbf5b5cbf6e4c1107ed1475e8d3af0eb590fa53
                </div>
                </Row>
                <Row>
                    <Col>
                    <div className="result-content-1">
                    <span style={{fontWeight:"bold"}}>
                        {this.state.description_1}
                    </span><br/><br/>
                    <span style={{fontWeight:"bold"}}>適合的基金類型：</span><br/>
                    <span style={{fontWeight:"bold"}}>{this.state.description_2}</span><br/>
                    </div>
                    </Col>
                    <Col>
                    <div className="result-chart"><Result></Result></div>
                    </Col>
                </Row>
                
            </div>
            </Row>
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
        </Row>
        </div>
    </Row>
    </Container>

    </div>
    
    );
    }
    }

    export default PageCharacterAnalysis;