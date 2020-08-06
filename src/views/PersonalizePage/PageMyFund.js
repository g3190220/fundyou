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

class PageMyFund extends React.Component{
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
    <div className="card-personalize-myfund">

    <PersonalizeMenu></PersonalizeMenu>

        <div className="card-personalize1">
            <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>我的基金</b></font></h4>

            <div className="fund-follows">
                <span style={{fontWeight:"bold"}}>追蹤基金</span>
            </div>
                <div className='sub-sub-all'>
                    <table id='fund-menu' border='2'>
                    <tr>
                        <th width="30%">基金名稱</th>
                        <th>地區</th>   
                        <th>最新淨值</th>
                        <th>漲跌</th>
                        <th>累積報酬</th>
                        <th>成立日期</th>
                    </tr>
                    <tr>
                        <td><a href="#all-fund">瀚亞高科技基金</a></td>
                        <td>台灣</td>
                        <td>66.3400</td>
                        <td>2.50%</td>
                        <td>NULL</td>
                        <td>1994/11/14</td>
                    </tr>
                    <tr>
                        <td><a href="#all-fund">日盛上選信託基金</a></td>
                        <td>台灣</td>
                        <td>46.4100</td>
                        <td>4.00%</td>
                        <td>20.21%</td>
                        <td>1997/12/27</td>
                    </tr>
                    </table>
                </div>

            <div className="fund-favorite">
                <span style={{fontWeight:"bold"}}>最愛基金</span>
            </div>
                <div className='sub-sub-all'>
                    <table id='fund-menu' border='2'>
                    <tr>
                        <th width="30%">基金名稱</th>
                        <th>地區</th>
                        <th>最新淨值</th>
                        <th>漲跌</th>
                        <th>累積報酬</th>
                        <th>成立日期</th>
                    </tr>
                    <tr>
                        <td><a href="#all-fund">瀚亞高科技基金</a></td>
                        <td>台灣</td>
                        <td>66.3400</td>
                        <td>2.50%</td>
                        <td>NULL</td>
                        <td>1994/11/14</td>
                    </tr>
                    </table>
                </div>
        </div>


    </div> 
        
        

    </Container>

    </div>
    
    );
    }
    }

    export default PageMyFund;