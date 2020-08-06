import React from 'react';
// import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'reactstrap';
import PersonalizeMenu from "views/PersonalizePage/PersonalizeMenu.js";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import 'react-multi-carousel/lib/styles.css';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FaceIcon from '@material-ui/icons/Face';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

class PagePig extends React.Component{
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
      this.props.history.push("/personal-data-page")
    }

    render(){
    
    return(
    <div className="page-header" style={{backgroundColor: '#ffcdb2',}}>
    {/* <IndexNavbar></IndexNavbar> */}
    <Container>
    <div className="card-personalize-pig">

        <PersonalizeMenu></PersonalizeMenu>

        <div className="card-personalize3">
            <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>豬豬小助理</b></font></h4>

            {/* <div className="fund-risk-classify">
                <span style={{fontWeight:"bold"}}>基金風險分類</span>
            </div>

            <div className="fund-time-ability">
                <span style={{fontWeight:"bold"}}>選股擇時能力計算器</span>
            </div>

            <div className="env-index-predict">
                <span style={{fontWeight:"bold"}}>環境指數關聯性預測</span>
            </div> */}

            <div className="dollor-cost-average">
                <span style={{fontWeight:"bold"}}>定期定額試算器</span>
            </div>

            <div className="dollor-cost-average-sub">
                <form>
                    <table id="dollor-table">
                        <tr>
                            <th>每年投資金額</th>
                            <th><input type="text"></input> 元</th>
                        </tr>
                        <tr>
                            <th>目標投資年報酬率</th>
                            <th><input type="text"></input> %</th>
                        </tr>
                        <tr>
                            <th>投資期間</th>
                            <th><input type="text"></input> 年</th>
                        </tr>

                        <tr>
                            <th colspan="2">
                                <div className="dollor-table-btn">
                                    <input className="reset-btn" type="reset" value="重新設置" ></input> &nbsp;&nbsp;
                                    <input className="submit-btn" type="submit" value="試算結果"></input>
                                </div>
                            </th>
                        </tr>

                        <tr>
                            <th>試算結果</th>
                            <th><input type="textarea"></input></th>
                        </tr>
                    </table>
                </form>
            </div>


        </div>

        
    </div> 
    </Container>
    </div>
    
    );
    }
    }

    export default PagePig;