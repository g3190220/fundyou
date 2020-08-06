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

class PageMonthlyReport extends React.Component{
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
    <div className="card-personalize-monthlyreport">
        <PersonalizeMenu></PersonalizeMenu>

        <div className="card-personalize4">
            <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>月報表</b></font></h4>
        </div> 

    </div> 
    </Container>

    </div>
    
    );
    }
    }

    export default PageMonthlyReport;