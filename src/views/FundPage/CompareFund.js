import React from "react";
import ReactDOM from 'react-dom';
import 'react-multi-carousel/lib/styles.css';
import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";
import { TextField } from "@material-ui/core";
import ReactHighcharts from'react-highcharts'; //基金圖表套件，參考：https://reurl.cc/0ored6
import { red } from "@material-ui/core/colors";
import {load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import LoadingIndicator from "views/Function/LoadingIndicator.js";

var fund_net_1 = [];
var fund_net_2 = [];
var fund_net_3 = [];
var fund_day = [];
var performance_sharpe_1 = [];
var performance_treynor_1 = [];
var performance_day = [];
var risk_beta_1 = [];
var risk_SD_1 = [];
var performance_sharpe_2 = [];
var performance_treynor_2 = [];
var risk_beta_2 = [];
var risk_SD_2 = [];
var performance_sharpe_3 = [];
var performance_treynor_3 = [];
var risk_beta_3 = [];
var risk_SD_3 = [];
var fund_name_1;
var fund_name_2;
var fund_name_3;
var fund_3_exist = false;

class CompareFund extends React.Component{

    state = {
    }
    constructor(props) { //待搞懂
        super(props)
        this.state = {
          //fields: {},
        fund_id_1 : load_cookies("fund_id_1"),
        fund_id_2 : load_cookies("fund_id_2"),
        fund_id_3 : load_cookies("fund_id_3"),
        flag:false,
        errors: {},
        initial:false
      };

      this.handleClick_net = chart_net.bind(this); //綁定事件，參考：https://reurl.cc/pdkgQ8
      this.handleClick_sharpe = chart_sharpe.bind(this); //綁定事件
      this.handleClick_trenyor = chart_trenyor.bind(this); //綁定事件
      this.handleClick_beta = chart_beta.bind(this); //綁定事件
      this.handleClick_SD = chart_SD.bind(this); //綁定事件
      this.handleClickadd = this.addnewFund.bind(this);//新增比較基金按鈕
    }

    componentDidMount() {

        if(load_cookies("fund_id_3") != '' && load_cookies("fund_id_3") != 'undefined'){
            fund_3_exist = true;
        }
        else{
            fund_3_exist = false;
        }

        //------------第一家公司的淨值(圖表化)----------------
        //取得基金淨值
        let fund_net=[];
        let net=[];
        let day = [];
        let i = 0;
       // let id = (this.props.match.params.fundid.split('='))[1];
        const url3 = "https://fundu.ddns.net:8090/getNetWorth";////////改url
        //console.log(data)
        fetch(url3, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_1,
                    seltype: 2
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_net)
            fund_net=JSON.parse(jsonData.fund_net)
            if(jsonData.StatusCode==200){
                
                //console.log(fund_net[0])

                for(i = 0; i < fund_net.length; i++){
                    net.push(fund_net[i].History_NetWorth);
                    day.push(fund_net[i].History_Datatime)
                }

                fund_net_1 = net;
                fund_day = day;

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            history_net:net,
                            history_day:day,
                            initial:true};
                });

                this.net_2();
            }
            })       
    }

    //------------第二家公司的淨值(圖表化)----------------
    net_2(){
        let fund_net=[];
        let net=[];
        let i = 0;
        //let id = (this.props.match.params.fundid.split('='))[1];
        const url3 = "https://fundu.ddns.net:8090/getNetWorth";////////改url
        //console.log(data)
        fetch(url3, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_2,
                    seltype: 2
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_net)
            fund_net=JSON.parse(jsonData.fund_net)
            if(jsonData.StatusCode==200){
                
                //console.log(fund_net[0])

                for(i = 0; i < fund_net.length; i++){
                    net.push(fund_net[i].History_NetWorth);
                }

                fund_net_2 = net;

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            history_net_2:net,
                            initial:true};
                });

                if(fund_3_exist){
                    this.net_3();
                }
                else{
                    this.getfundname();
                }
            }
            })
    }
        //------------第三家公司的淨值(圖表化)----------------
        net_3(){
            let fund_net=[];
            let net=[];
            let day = [];
            let i = 0;
            //let id = (this.props.match.params.fundid.split('='))[1];
            const url3 = "https://fundu.ddns.net:8090/getNetWorth";////////改url
            //console.log(data)
            fetch(url3, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fld022: this.state.fund_id_3,
                        seltype: 2
                    })
                })
                .then((response) => {return response.json();})
                .then((jsonData) => {
                //console.log(this)
                console.log(jsonData.fund_net)
                fund_net=JSON.parse(jsonData.fund_net)
                if(jsonData.StatusCode==200){
    
                    for(i = 0; i < fund_net.length; i++){
                        net.push(fund_net[i].History_NetWorth);
                    }
    
                    fund_net_3 = net;
    
                    //更新state並獲得以下資料
                    this.setState((state, props) => {
                        return {counter: state.counter + props.step,
                                history_net_3:net,
                                initial:true};
                    });
                    this.getfundname();
                }
                })
        }
        
    //------------第一家公司的名稱--------------------------
    getfundname(){
        let fund_info=[];
        const url = "https://fundu.ddns.net:8090/getFundInfo";////////改url
        //console.log(data)
        fetch( url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_1,
                })
            
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_info)
            fund_info=JSON.parse(jsonData.fund_info)
            if(jsonData.StatusCode==200){
                
                console.log(fund_info[0]);

                fund_name_1 = fund_info[0].Fund_CH_Name;

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            fund_name1:fund_info[0].Fund_CH_Name,
                            initial:true};
                });
                this.getfundname_2();
            }
            }) 
    }

    //------------第二家公司的名稱--------------------------
    getfundname_2(){
        let fund_info=[];
        const url = "https://fundu.ddns.net:8090/getFundInfo";////////改url
        //console.log(data)
        fetch( url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_2,
                })
            
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_info)
            fund_info=JSON.parse(jsonData.fund_info)
            if(jsonData.StatusCode==200){

                fund_name_2 = fund_info[0].Fund_CH_Name;

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            fund_name2:fund_info[0].Fund_CH_Name,
                            initial:true};
                });
                if(fund_3_exist){
                    this.getfundname_3();
                }
                else{
                    this.performance();
                }
            }
            }) 
    }
    //------------第三家公司的名稱--------------------------
    getfundname_3(){
        let fund_info=[];
        const url = "https://fundu.ddns.net:8090/getFundInfo";////////改url
        //console.log(data)
        fetch( url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_3,
                })
            
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_info)
            fund_info=JSON.parse(jsonData.fund_info)
            if(jsonData.StatusCode==200){

                fund_name_3 = fund_info[0].Fund_CH_Name;

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            fund_name3:fund_info[0].Fund_CH_Name,
                            initial:true};
                });
                this.performance();
            }
            }) 
    }

    //------------第一家公司的績效風險表現(圖表化)----------------
    performance(){
        let fund_performance=[];
        let sharpe=[];
        let treynor = [];
        let jensen = [];
        let beta = [];
        let SD = [];
        let day = [];
        let i = 0;
        //let id = (this.props.match.params.fundid.split('='))[1];
        const url4 = "https://fundu.ddns.net:8090/getPerformance";////////改url
        //console.log(data)
        fetch(url4, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_1,
                    seltype: 2
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_performance)
            fund_performance=JSON.parse(jsonData.fund_performance)
            if(jsonData.StatusCode==200){
                
                console.log(fund_performance[0])

                for(i = 0; i < fund_performance.length; i++){
                    sharpe.push(fund_performance[i].Hostory_Sharpe);
                    treynor.push(fund_performance[i].History_Treynor);
                    jensen.push(fund_performance[i].History_Jensen);
                    beta.push(fund_performance[i].History_Beta);
                    SD.push(fund_performance[i].History_SD)
                    day.push(fund_performance[i].History_Datatime);
                }
                performance_sharpe_1 = sharpe;
                performance_treynor_1 = treynor;
                performance_day = day;
                risk_beta_1 = beta;
                risk_SD_1 = SD;

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            history_sharpe:sharpe,
                            history_treynor:treynor,
                            history_jensen:jensen,
                            history_beta:beta,
                            history_SD:SD,
                            history_performance_day:day,
                            initial:true};
                });
                this.performance_2();
            }
            })
    }

    //------------第二家公司的績效風險表現(圖表化)----------------
    performance_2(){
        let fund_performance=[];
        let sharpe=[];
        let treynor = [];
        let jensen = [];
        let beta = [];
        let SD = [];
        let day = [];
        let i = 0;
        //let id = (this.props.match.params.fundid.split('='))[1];
        const url4 = "https://fundu.ddns.net:8090/getPerformance";////////改url
        //console.log(data)
        fetch(url4, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_2,
                    seltype: 2
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_performance)
            fund_performance=JSON.parse(jsonData.fund_performance)
            if(jsonData.StatusCode==200){
                
                console.log(fund_performance[0])

                for(i = 0; i < fund_performance.length; i++){
                    sharpe.push(fund_performance[i].Hostory_Sharpe);
                    treynor.push(fund_performance[i].History_Treynor);
                    jensen.push(fund_performance[i].History_Jensen);
                    beta.push(fund_performance[i].History_Beta);
                    SD.push(fund_performance[i].History_SD)
                    day.push(fund_performance[i].History_Datatime);
                }
                performance_sharpe_2 = sharpe;
                performance_treynor_2 = treynor;
                risk_beta_2 = beta;
                risk_SD_2 = SD;

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            history_sharpe:sharpe,
                            history_treynor:treynor,
                            history_jensen:jensen,
                            history_beta:beta,
                            history_SD:SD,
                            history_performance_day:day,
                            initial:true};
                });

                if(fund_3_exist){
                    this.performance_3();
                }
                else{
                    this.recent_performance();
                }
            }
            })
    }
    //------------第三家公司的績效風險表現(圖表化)----------------
    performance_3(){
        let fund_performance=[];
        let sharpe=[];
        let treynor = [];
        let jensen = [];
        let beta = [];
        let SD = [];
        let day = [];
        let i = 0;
        //let id = (this.props.match.params.fundid.split('='))[1];
        const url4 = "https://fundu.ddns.net:8090/getPerformance";////////改url
        //console.log(data)
        fetch(url4, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_3,
                    seltype: 2
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_performance)
            fund_performance=JSON.parse(jsonData.fund_performance)
            if(jsonData.StatusCode==200){
                
                console.log(fund_performance[0])

                for(i = 0; i < fund_performance.length; i++){
                    sharpe.push(fund_performance[i].Hostory_Sharpe);
                    treynor.push(fund_performance[i].History_Treynor);
                    jensen.push(fund_performance[i].History_Jensen);
                    beta.push(fund_performance[i].History_Beta);
                    SD.push(fund_performance[i].History_SD)
                    day.push(fund_performance[i].History_Datatime);
                }
                performance_sharpe_3 = sharpe;
                performance_treynor_3 = treynor;
                risk_beta_3 = beta;
                risk_SD_3 = SD;

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            history_sharpe:sharpe,
                            history_treynor:treynor,
                            history_jensen:jensen,
                            history_beta:beta,
                            history_SD:SD,
                            history_performance_day:day,
                            initial:true};
                });
                this.recent_performance();
            }
            })
    }
    //------------第一家公司的績效風險表現----------------
    recent_performance(){
        let fund_performance=[];
        //let id = (this.props.match.params.fundid.split('='))[1];
        const url4 = "https://fundu.ddns.net:8090/getPerformance";////////改url
        //console.log(data)
        fetch(url4, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_1,
                    seltype: 1
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_performance)
            fund_performance=JSON.parse(jsonData.fund_performance)
            if(jsonData.StatusCode==200){
                
                console.log(fund_performance[0])

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            recent_sharpe:fund_performance[0].Hostory_Sharpe.toFixed(2),
                            recent_treynor:fund_performance[0].History_Treynor.toFixed(2),
                            recent_jensen:fund_performance[0].History_Jensen.toFixed(2),
                            recent_beta:fund_performance[0].History_Beta.toFixed(2),
                            recent_SD:fund_performance[0].History_SD.toFixed(2),
                            initial:true};
                });
                this.recent_performance_2();
            }
            })
    }

    //------------第二家公司的績效風險表現----------------
    recent_performance_2(){
        let fund_performance=[];
        //let id = (this.props.match.params.fundid.split('='))[1];
        const url4 = "https://fundu.ddns.net:8090/getPerformance";////////改url
        //console.log(data)
        fetch(url4, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_2,
                    seltype: 1
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_performance)
            fund_performance=JSON.parse(jsonData.fund_performance)
            if(jsonData.StatusCode==200){
                
                console.log(fund_performance[0])

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            recent_sharpe_2:fund_performance[0].Hostory_Sharpe.toFixed(2),
                            recent_treynor_2:fund_performance[0].History_Treynor.toFixed(2),
                            recent_jensen_2:fund_performance[0].History_Jensen.toFixed(2),
                            recent_beta_2:fund_performance[0].History_Beta.toFixed(2),
                            recent_SD_2:fund_performance[0].History_SD.toFixed(2),
                            initial:true};
                });
                if(fund_3_exist){
                    this.recent_performance_3();
                }
                else{
                    this.recent_ROI();
                }
                
            }
            })
    }
        //------------第三家公司的績效風險表現----------------
        recent_performance_3(){
            let fund_performance=[];
            //let id = (this.props.match.params.fundid.split('='))[1];
            const url4 = "https://fundu.ddns.net:8090/getPerformance";////////改url
            //console.log(data)
            fetch(url4, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fld022: this.state.fund_id_3,
                        seltype: 1
                    })
                })
                .then((response) => {return response.json();})
                .then((jsonData) => {
                //console.log(this)
                console.log(jsonData.fund_performance)
                fund_performance=JSON.parse(jsonData.fund_performance)
                if(jsonData.StatusCode==200){
                    
                    console.log(fund_performance[0])
    
                    //更新state並獲得以下資料
                    this.setState((state, props) => {
                        return {counter: state.counter + props.step,
                                recent_sharpe_3:fund_performance[0].Hostory_Sharpe.toFixed(2),
                                recent_treynor_3:fund_performance[0].History_Treynor.toFixed(2),
                                recent_jensen_3:fund_performance[0].History_Jensen.toFixed(2),
                                recent_beta_3:fund_performance[0].History_Beta.toFixed(2),
                                recent_SD_3:fund_performance[0].History_SD.toFixed(2),
                                initial:true};
                    });
                    this.recent_ROI();
                }
                })
        }

    //------------第一家公司的ROI--------------------------
    recent_ROI(){   
        let fund_return=[];
        //let id = (this.props.match.params.fundid.split('='))[1];
        const url2 = "https://fundu.ddns.net:8090/getReturn";////////改url
        //console.log(data)
        fetch(url2, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_1,
                    seltype: 1
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_Return)
            fund_return=JSON.parse(jsonData.fund_Return)
            if(jsonData.StatusCode==200){
                
               // console.log(fund_return[0])
               // console.log(fund_return[1]) //新的
                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            History_ROI_3M : (fund_return[1].History_ROI_3M).toFixed(2),
                            History_ROI_6M : (fund_return[1].History_ROI_6M).toFixed(2),
                            History_ROI_12M : (fund_return[1].History_ROI_12M).toFixed(2),
                            initial:true};
                });
                this.recent_ROI_2();
            }
            })
    }

    //------------第二家公司的ROI--------------------------
    recent_ROI_2(){   
        let fund_return=[];
        //let id = (this.props.match.params.fundid.split('='))[1];
        const url2 = "https://fundu.ddns.net:8090/getReturn";////////改url
        //console.log(data)
        fetch(url2, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: this.state.fund_id_2,
                    seltype: 1
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_Return)
            fund_return=JSON.parse(jsonData.fund_Return)
            if(jsonData.StatusCode==200){
                
                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            History_ROI_3M_2 : (fund_return[1].History_ROI_3M).toFixed(2),
                            History_ROI_6M_2 : (fund_return[1].History_ROI_6M).toFixed(2),
                            History_ROI_12M_2 : (fund_return[1].History_ROI_12M).toFixed(2),
                            flag:true,
                            initial:true};
                });
                if(fund_3_exist){
                    this.recent_ROI_3();
                }
            }
            })
    }
        //------------第三家公司的ROI--------------------------
        recent_ROI_3(){   
            let fund_return=[];
            //let id = (this.props.match.params.fundid.split('='))[1];
            const url2 = "https://fundu.ddns.net:8090/getReturn";////////改url
            //console.log(data)
            fetch(url2, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fld022: this.state.fund_id_3,
                        seltype: 1
                    })
                })
                .then((response) => {return response.json();})
                .then((jsonData) => {
                //console.log(this)
                console.log(jsonData.fund_Return)
                fund_return=JSON.parse(jsonData.fund_Return)
                if(jsonData.StatusCode==200){
                    
                    //更新state並獲得以下資料
                    this.setState((state, props) => {
                        return {counter: state.counter + props.step,
                                History_ROI_3M_3 : (fund_return[1].History_ROI_3M).toFixed(2),
                                History_ROI_6M_3 : (fund_return[1].History_ROI_6M).toFixed(2),
                                History_ROI_12M_3 : (fund_return[1].History_ROI_12M).toFixed(2),
                                flag:true,
                                initial:true};
                    });
                }
                })
        }

    //------------新增比較基金------------------------------
    addnewFund(){
        let member_id = load_cookies("member_id");
        // let path = "/allfund-page/:member_id="+ member_id;
        let path = "/allfund-page";

        this.props.history.push({
            pathname: path
  })
    }

    render(){
        var config_net = {

            chart : {
                backgroundColor: '#fffafa',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                borderRadius: 10,
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            yAxis: {
                title: {
                    text: '單位',
                }
            },
            credits:{
                enabled:false
            },
            xAxis:{
                categories:this.state.history_day,//['2010','2011','2012','2013','2014','2015','2016','2017'], //這裡要從資料庫讀
                labels:{  
                    //step: 30
                    enabled:false //不顯示X軸
                }
            },
            series: [{    //這裡要從資料庫讀
                name: this.state.fund_name1,
                data: this.state.history_net//[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: this.state.fund_name2,
                data: this.state.history_net_2//[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            },{
                name: this.state.fund_name3,
                data: this.state.history_net_3
            }],
            
            };
            //改變第三欄位 參考網址：https://reurl.cc/KkV6zj
            let third_fund;
            if(fund_3_exist){
                third_fund = fund_name_3;
            }
            else{
                third_fund = <button className='add-compare' onClick={this.handleClickadd}>新增比較基金</button>;
            }

        return(
            <div>
            {!this.state.flag ? (<LoadingIndicator></LoadingIndicator>): 
            (<div className='compare-menu'>
            <Container>
            <IndexNavbar></IndexNavbar>
            <Row>
                <div className='compare-title'>
                    <label>基金比較</label>
                </div>
            </Row>
            <Row>
                <div className='sub-compare-gragh'>
                    <Row>
                        <label className='compare-label'>圖形比較</label>
                    </Row>
                    <Row>
                    <div className='compare-chart' id='comparechart'>
                        <ReactHighcharts config={config_net}/>
                    </div>
                    </Row>
                    <Row className='compare-btn'>
                        <label id='btn-net'>淨值</label>
                        <button className='sub-btn-net' onClick={this.handleClick_net}>淨值</button> 
                    </Row>
                    <Row className='compare-btn'>
                        <label id='btn-performance'>績效</label>
                        <button className='sub-btn-performance' onClick={this.handleClick_sharpe}>sharpe</button>
                        <button className='sub-btn-performance' onClick={this.handleClick_trenyor}>treynor</button>
                    </Row>
                    <Row className='compare-btn'>
                        <label id='btn-risk'>風險</label>
                        <button className='sub-btn-risk' onClick={this.handleClick_beta}>beta</button>
                        <button className='sub-btn-risk' onClick={this.handleClick_SD}>SD</button>
                    </Row>
                </div>
            </Row>

            <Row>
                <div className='sub-compare-info'>
                    <table className='compare-table' border='2'>  {/*基本資料*/}
                        <tr>
                            <th width='150px'>基金名稱</th>
                            <th width='300px'>{fund_name_1}</th>
                            <th width='300px'>{fund_name_2}</th>
                            <th width='300px'>{third_fund}</th>
                        </tr>
                        <tr>
                        </tr>
                    </table>
                    <label className='compare-label'>風險資訊</label>
                    <table className='compare-table' border='2'>  {/*風險資訊*/}
                        <tr>
                            <td width='150px'>Standard Deviation(SD)</td>
                            <td width='300px'>{this.state.recent_SD}%</td>
                            <td width='300px'>{this.state.recent_SD_2}%</td>
                            <td width='300px'>{this.state.recent_SD_3}%</td>
                        </tr>
                        <tr>
                            <td width='150px'>beta</td>
                            <td width='300px'>{this.state.recent_beta}%</td>
                            <td width='300px'>{this.state.recent_beta_2}%</td>
                            <td width='300px'>{this.state.recent_beta_3}%</td>
                        </tr>
                    </table>
                    <label className='compare-label'>績效資訊</label>
                    <table className='compare-table' border='2'>  {/*績效資訊*/}
                        <tr>
                            <td width='150px'>sharp</td>
                            <td width='300px'>{this.state.recent_sharpe}%</td>
                            <td width='300px'>{this.state.recent_sharpe_2}%</td>
                            <td width='300px'>{this.state.recent_sharpe_3}%</td>
                        </tr>
                        <tr>
                            <td width='150px'>treynor</td>
                            <td width='300px'>{this.state.recent_treynor}%</td>
                            <td width='300px'>{this.state.recent_treynor_2}%</td>
                            <td width='300px'>{this.state.recent_treynor_3}%</td>
                        </tr>
                    </table>
                    <label className='compare-label'>報酬資訊</label>
                    <table className='compare-table' border='2'>  {/*報酬資訊*/}
                        <tr>
                            <td width='150px'>三個月</td>
                            <td width='300px'>{this.state.History_ROI_3M}%</td>
                            <td width='300px'>{this.state.History_ROI_3M_2}%</td>
                            <td width='300px'>{this.state.History_ROI_3M_3}%</td>
                        </tr>
                        <tr>
                            <td width='150px'>六個月</td>
                            <td width='300px'>{this.state.History_ROI_6M}%</td>
                            <td width='300px'>{this.state.History_ROI_6M_2}%</td>
                            <td width='300px'>{this.state.History_ROI_6M_3}%</td>
                        </tr>
                        <tr>
                            <td width='150px'>一年</td>
                            <td width='300px'>{this.state.History_ROI_12M}%</td>
                            <td width='300px'>{this.state.History_ROI_12M_2}%</td>
                            <td width='300px'>{this.state.History_ROI_12M_3}%</td>
                        </tr>
                    </table>
                </div>
            </Row>
            </Container>
            </div>
            )}</div>
        );
    }
}
export default CompareFund;

function chart_net() {  //顯示淨值
    var config_net = {

        chart : {
            backgroundColor: '#fffafa',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderRadius: 10,
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        yAxis: {
            title: {
                text: '單位',
            }
        },
        credits:{
            enabled:false
        },
        xAxis:{
            categories:fund_day,//['2010','2011','2012','2013','2014','2015','2016','2017'], //這裡要從資料庫讀
            labels:{  
                //step: 30
                enabled:false //不顯示X軸
            }
        },
        series: [{    //這裡要從資料庫讀
            name: fund_name_1,
            data: fund_net_1//[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: fund_name_2,
            data: fund_net_2//[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        },{
            name: fund_name_3,
            data: fund_net_3//[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }],
        };
    ReactDOM.render( //猜想：更新DOM的部分，參考：https://reurl.cc/0orjYb
        <ReactHighcharts config={config_net}/>,
      document.getElementById('comparechart')
    );
}

function chart_sharpe() {  //顯示sharpe
    var config_sharpe = {

        chart : {
            backgroundColor: '#fffafa',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderRadius: 10,
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        yAxis: {
            title: {
                text: '單位',
            }
        },
        credits:{
            enabled:false
        },
        xAxis:{
            categories:performance_day,//['2010','2011','2012','2013','2014','2015','2016','2017'], //這裡要從資料庫讀
            labels:{  //參考連結：https://reurl.cc/ar2eGX
                //step: 30
                enabled:false //不顯示X軸
            }
        },
        series: [{    //這裡要從資料庫讀
            name: fund_name_1,
            data: performance_sharpe_1//[20, 10, 99, 30, 20, 1, 50, 70]
        }, {
            name: fund_name_2,
            data: performance_sharpe_2//[5, 1, 3, 3, 2, 1, 5, 1]
        }, {
            name: fund_name_3,
            data: performance_sharpe_3//[5, 1, 3, 3, 2, 1, 5, 1]
        }],
        };
    ReactDOM.render( //猜想：更新DOM的部分，參考：https://reurl.cc/0orjYb
        <ReactHighcharts config={config_sharpe}/>,
      document.getElementById('comparechart')
    );
}

function chart_trenyor() {  //顯示trenyor
    var config_trenyor = {

        chart : {
            backgroundColor: '#fffafa',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderRadius: 10,
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        yAxis: {
            title: {
                text: '單位',
            }
        },
        credits:{
            enabled:false
        },
        xAxis:{
            categories:performance_day,//['2010','2011','2012','2013','2014','2015','2016','2017'], //這裡要從資料庫讀
            labels:{  //參考連結：https://reurl.cc/ar2eGX
                //step: 30
                enabled:false //不顯示X軸
            }
        },
        series: [{    //這裡要從資料庫讀
            name: fund_name_1,
            data: performance_treynor_1,//[10, 10, 99, 30, 20, 1, 50, 100]
        }, {
            name: fund_name_2,
            data: performance_treynor_2//[50, 44, 3, 30, 20, 10, 50, 70]
        }, {
            name: fund_name_3,
            data: performance_treynor_3//[50, 44, 3, 30, 20, 10, 50, 70]
        }],
        };
    ReactDOM.render( //猜想：更新DOM的部分，參考：https://reurl.cc/0orjYb
        <ReactHighcharts config={config_trenyor}/>,
      document.getElementById('comparechart')
    );
}

function chart_beta() {  //顯示beta
    var config_beta = {

        chart : {
            backgroundColor: '#fffafa',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderRadius: 10,
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        yAxis: {
            title: {
                text: '單位',
            }
        },
        credits:{
            enabled:false
        },
        xAxis:{
            categories:performance_day,//['2010','2011','2012','2013','2014','2015','2016','2017'], //這裡要從資料庫讀
            labels:{  //參考連結：https://reurl.cc/ar2eGX
                //step: 30
                enabled:false //不顯示X軸
            }
        },
        series: [{    //這裡要從資料庫讀
            name: fund_name_1,
            data: risk_beta_1,//[10, 10, 99, 30, 20, 1, 50, 100]
        }, {
            name: fund_name_2,
            data: risk_beta_2//[50, 44, 3, 100, 20, 10, 60, 20]
        }, {
            name: fund_name_3,
            data: risk_beta_3//[50, 44, 3, 100, 20, 10, 60, 20]
        }],
        };
    ReactDOM.render( //猜想：更新DOM的部分，參考：https://reurl.cc/0orjYb
        <ReactHighcharts config={config_beta}/>,
      document.getElementById('comparechart')
    );
}

function chart_SD() {  //顯示SD
    var config_SD = {

        chart : {
            backgroundColor: '#fffafa',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderRadius: 10,
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        yAxis: {
            title: {
                text: '單位',
            }
        },
        credits:{
            enabled:false
        },
        xAxis:{
            categories:performance_day,//['2010','2011','2012','2013','2014','2015','2016','2017'], //這裡要從資料庫讀
            labels:{  //參考連結：https://reurl.cc/ar2eGX
                //step: 30
                enabled:false //不顯示X軸
            }
        },
        series: [{    //這裡要從資料庫讀
            name: fund_name_1,
            data: risk_SD_1//[10, 120, 99, 30, 20, 1, 50, 150]
        }, {
            name: fund_name_2,
            data: risk_SD_2//[50, 44, 3, 200, 70, 10, 60, 20]
        }, {
            name: fund_name_3,
            data: risk_SD_3//[50, 44, 3, 200, 70, 10, 60, 20]
        }],
        };

        //window.scrollTo(0, 100);
    ReactDOM.render( //猜想：更新DOM的部分，參考：https://reurl.cc/0orjYb
        <ReactHighcharts config={config_SD}/>,
      document.getElementById('comparechart')
    );
}
