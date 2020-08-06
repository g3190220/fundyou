import React, { PureComponent } from 'react';
// import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'reactstrap';
import PersonalizeMenu from "views/PersonalizePage/PersonalizeMenu.js";
import Example from "views/PersonalizePage/pie.js";
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
    <div className="page-header" style={{backgroundColor: '#ffcdb2',}}>
    {/* <IndexNavbar></IndexNavbar> */}
    <Container>
    <div className="card-personalize-characteranalysis">

    <PersonalizeMenu></PersonalizeMenu>
        
        <div className="card-personalize2">
            <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>性格分析</b></font></h4>

            <div className="game-title">
                <span style={{fontWeight:"bold"}}>由FundU打造的投資性格分析，</span><br/>
                <span style={{fontWeight:"bold"}}>帶您透過情境遊戲來了解投資偏好</span>
            </div>
            <div className="start-btn">
                <button type="button" class="btn btn-neutral">前往遊戲GO</button>    
            </div>
            
            <div>
                <span className='survey-go-font' style={{fontWeight:"bold"}}>不想玩遊戲？前往問卷頁面</span>
                <IconButton aria-label="GO" size="small" onClick={this.handleSubmit}>
                    <ArrowForwardIcon />
                </IconButton>
            </div>
            
        </div>

        <div className="card-personalize2-1">
            <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>性格分析結果</b></font></h4>

            <div className="game-result-title">
                <span style={{fontWeight:"bold"}}>根據測驗結果，您屬於：</span>
                <span style={{fontWeight:"bold"}}>穩健型投資人</span><br/>
                <div className="result-chart"><Example></Example></div>
            </div>
            <div className="result-content">
                <span style={{fontWeight:"bold"}}>
                    穩健型投資人願意為了累積財富而適當承受風險，在風險合理的情況下去追求中等的獲利與報酬。
                </span><br/><br/>
                <span style={{fontWeight:"bold"}}>適合的基金類型：</span><br/>
                <span style={{fontWeight:"bold"}}>平衡型、區域型基金</span><br/>

            </div>
        </div>
    </div>

        

    </Container>

    </div>
    
    );
    }
    }

    export default PageCharacterAnalysis;