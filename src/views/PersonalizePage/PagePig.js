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

//分頁
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

class PagePig extends React.Component{
    state = {
    }
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
          //fields: {},
          errors: {},
          key:"home",
          setKey:'home',
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
            <div>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={this.state.key}
                    onSelect={(k) => this.setState({setKey:k})}
                >
                    <Tab eventKey="home" title="Home">
                        <h1>home</h1>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                        <h1>Profile</h1>
                    </Tab>
                    <Tab eventKey="contact" title="Contact" disabled>
                        <h1>contact</h1>
                    </Tab>
                </Tabs>
            </div>

            


        </div>

        
    </div> 
    </Container>
    </div>
    
    );
    }
    }

    export default PagePig;