import React from 'react';
// import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import { Container, Row, Col, Button, Card } from 'reactstrap';
import Caculate from "views/Function/Caculate.js";
import Caculate2 from "views/Function/Caculate2.js";
import Caculate3 from "views/Function/Caculate3.js";
import PersonalizeMenu from "views/PersonalizePage/PersonalizeMenu.js";




import 'react-multi-carousel/lib/styles.css';


class PagePig extends React.Component{
    state = {
    }
    constructor(props) {
        super(props)
        this.Change_rank=this.Change_rank.bind(this);
        console.log(props)
        this.state = {
          //fields: {},
          errors: {},
          selected:1
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    //點擊去頁面
    handleSubmit(){
      this.props.history.push("/personal-data-page")
    }

    //(10)改變分頁
    Change_rank(selected){
        if(selected==1){
            this.setState({selected:1})
            
        }
        else if(selected==2){
            this.setState({selected:2})
            
        }
        else if(selected==3){
            this.setState({selected:3})
            
        }
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
            <Row>
                <Col sm={4}>
                <div className="dollor-cost-average">
                    <span style={{fontWeight:"bold"}}>基金試算器</span>  
                </div>
                </Col>
                <Col sm={8}>
                <div className='button-center'>
                        <button className='tag-btn'  onClick={()=>this.Change_rank(1)}>單筆投資</button>
                        <button className='tag-btn'  onClick={()=>this.Change_rank(2)}>每月定期定額</button>
                        <button className='tag-btn'  onClick={()=>this.Change_rank(3)}>每年定期定額</button>
                </div>
                </Col>
            </Row>
                {this.state.selected==1?(<Caculate></Caculate>):(this.state.selected==3?(<Caculate2></Caculate2>):(<Caculate3></Caculate3>))}

        </div>

        
    </div> 
    </Container>
    </div>
    
    );
    }
    }

    export default PagePig;