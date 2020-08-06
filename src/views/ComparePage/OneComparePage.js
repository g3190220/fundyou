import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter
    } from "react-router-dom";
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import { compare_fund_id,load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies



class OneComparePage extends React.Component{
    state = {
    }
    constructor(props) {
        super(props)
        //this.getPDData=this.getPDData.bind(this);
        this.state = {
          //fields: {},
          fund_id_1 : '',
          fund_id_2 : '',
          fund_id_3 : '',

          errors: {},
          flag:false,
      }
      this.handleClicksubmit = this.submitfund.bind(this);
    }

    submitfund(){
        if(this.props.fund_id_1 == 'undefined'){
            this.props.fund_id_1 = '';
        }
        if(this.props.fund_id_2 == 'undefined'){
            this.props.fund_id_2 = '';
        }
        if(this.props.fund_id_3 == 'undefined'){
            this.props.fund_id_3 = '';
        }

        //判斷參考網址：https://reurl.cc/Njzgae
        if(this.props.fund_id_2=='' || (!this.props.fund_id_2)){
            alert('請輸入至少兩筆欲比較之基金！')
        }
        else{
            let fund_id = []

            fund_id.push(this.props.fund_id_1);
            fund_id.push(this.props.fund_id_2);
            fund_id.push(this.props.fund_id_3);          

            compare_fund_id(fund_id);
    
            this.props.history.push({
                pathname: "/page-compare"
            })
        }
    }

    handleChange = name => event => {   //不太懂，問湘琪
        this.setState({
          [name]: event.nativeEvent.target.value,
        });
    }
      render(){
        return(
            
                <div className='compare-fix'>
                
                   
                    <TextField
                        id="fund_1"
                        label="input first fund's ID"
                        value={this.props.fund_id_1}
                        onChange={this.handleChange('fund_id_1')}
                        margin="normal"
                        variant="outlined"
                        className='comparefund-bar'    
                        color="secondary"                
                    />
                    <TextField
                        id="fund_2"
                        label="input second fund's ID"
                        value={this.props.fund_id_2}
                        onChange={this.handleChange('fund_id_2')}
                        margin="normal"
                        variant="outlined"
                        className='comparefund-bar'    
                        color="secondary"                                                   
                    />
                    <TextField
                        id="fund_3"
                        label="input third fund's ID"
                        value={this.props.fund_id_3}
                        onChange={this.handleChange('fund_id_3')}
                        margin="normal"
                        variant="outlined"
                        className='comparefund-bar'    
                        color="secondary"                                                   
                    />
                    <button className='compare-btn' onClick={this.handleClicksubmit}>去比較</button>
                    
                </div>
            
        )}}
export default withRouter(OneComparePage);