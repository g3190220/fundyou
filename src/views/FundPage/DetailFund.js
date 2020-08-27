import React from "react";
import ReactDOM from 'react-dom';
import 'react-multi-carousel/lib/styles.css';
import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import _ from "underscore";
import ReactHighcharts from'react-highcharts'; //基金圖表套件，參考：https://reurl.cc/0ored6
import {browserHistory} from 'react-router';
import { load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import FollowFund from 'views/FundPage/FollowFund.js';
import { TextField } from "@material-ui/core";
import isEmpty from "views/Function/isEmpty.js"

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";
import { string } from "prop-types";

//loading page
import LoadingIndicator from "views/Function/LoadingIndicator.js";

var performance_sharpe = [];
var performance_treynor = [];
var performance_day = [];
var risk_beta = [];
var risk_SD = [];

// core components
class DetailFund extends React.Component{
//function DetailFund() {

 /*   document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("detail-fund-page");
        return function cleanup() {
          document.body.classList.remove("detail-fund-page");
        };
      });  */
      state = {
    }
    constructor(props) { //待搞懂
        super(props)
        this.state = {
          //fields: {},
        errors: {},
        initial:false,
        showtag1:false,
        showtag2:false,
        colortag1:true,
        colortag2:true,
      };
      
      this.handleClick1 = chart_performance.bind(this); //綁定事件，參考：https://reurl.cc/pdkgQ8
      this.handleClick2 = chart_risk.bind(this); //綁定事件
      this.handleClickTAG = this.tag_link.bind(this);
      this.trackstate = this.trackstate.bind(this); //追蹤基金事件(綁定track按鈕)
      this.togglestate = this.togglestate.bind(this);
      this.CreateTrack = this.CreateTrack.bind(this);
      this.getTag=this.getTag.bind(this);
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);

    }
    componentDidMount() {
        //取得基金資料
        let fund_info=[];
        console.log(this.props.match.params.fundid.split('='));
        let id = (this.props.match.params.fundid.split('='))[1];
        const url = "http://140.115.87.192:8090/getFundInfo";////////改url
        //console.log(data)
        fetch( url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: id,
                })
            
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_info)
            fund_info=JSON.parse(jsonData.fund_info)
            if(jsonData.StatusCode==200){
                
                console.log(fund_info[0]);

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            fund_name:fund_info[0].Fund_CH_Name,
                            fund_EN_name:fund_info[0].Fund_EN_Name,
                            company_name:fund_info[0].Company_Name,
                            fund_startdate: fund_info[0].Fund_StartDate,
                            fund_type:fund_info[0].Fund_Type, //類型
                            fund_fld022:fund_info[0].Fund_fld022,//基金統編
                            fund_ISINcode:fund_info[0].Fund_ISINcode,
                            fund_currency:fund_info[0].Fund_Currency,//貨幣
                            fund_scale:fund_info[0].Fund_Scale,
                            fund_riskRank:fund_info[0].Fund_RiskRank, //風險評等
                            manager_name:fund_info[0].Manager_Name,
                            fund_Target:fund_info[0].Fund_Target,

                            };
                });
            }
            })
            .then(() => { this.trackstate();})
    }
    //處理setState的方法
    handleChange = name => event =>{
        console.log("enter_chanfe")
        this.setState({
          [name]: event.target.value,
    })}

    trackstate(){    //看此user有沒有追蹤過此筆基金，並改變追蹤狀態
        let fund_info=[];
        let id = (this.props.match.params.fundid.split('='))[1];
        const url = "http://140.115.87.192:8090/getTrack";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: load_cookies("member_id"),
                fld022: id,
            })
        })
        .then((response) => {return response.json();})
        .then((jsonData) => {
            console.log(jsonData); 
            try{
            fund_info=JSON.parse(jsonData.info)
            if(jsonData.StatusCode==200){ 
                console.log(fund_info)
                this.setState((state, props) => {
                return {
                  userid:fund_info[0].MemberID, //userid
                  fund_fld022_track:fund_info[0].fund_fld022_track, //基金統編
                  track_state:fund_info[0].track, //追蹤狀態，1:已追蹤，0:未追蹤
                 
                }
              })
            }}
            catch(e){
                this.setState({track_state:0})  //未追蹤的狀況

            }
          })
          .then(() => { this.getTag();})
          

    }


    togglestate(){  //點擊追蹤按鈕，切換狀態
        if(this.state.track_state==1){  
            this.setState({track_state:0})
        }
        else{
            this.setState({track_state:1})
        }
    }


    CreateTrack(){  //建立追蹤基金
        let id = (this.props.match.params.fundid.split('='))[1]; //抓現在頁面的id
        const url = "http://140.115.87.192:8090/CreateTrack";
        //console.log(data)
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: load_cookies("member_id"),
                fld022: id,
            })
        })
        .then((response) => {return response.json();})
        .then((jsonData) => { 
            if(jsonData.StatusCode==200){ 
                console.log("成功更新追蹤狀態")
                this.setState();window.location.reload(true);
            }
            else{
                alert("你已追蹤超過13筆上限的基金！")
            }
        })
        //.then(()=>{this.setState();window.location.reload(true);})  //更新狀態後重新整理頁面
    }

    //取得會員TAG，顯示首頁(若沒有TAG，就顯示熱門的)
    getTag(){
        let member_id=load_cookies("member_id")
        let id = (this.props.match.params.fundid.split('='))[1];
        const url = "http://140.115.87.192:8090/getTag";
        fetch(url, {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({
                //取得全部fund
                member_id: member_id,
                tag_id:-1,
                fld022:id
        })
            
        })
        .then((response) => {return response.json();})
        .then((jsonData) => { 
        if(jsonData.StatusCode==200){
            var tag_info = [];
            try{
                tag_info=JSON.parse(jsonData.tag_info)
                this.setState({tag1:tag_info[0].tagContent})
                this.setState({showtag1:"visable"})
                this.setState({colortag1:true})
                console.log(tag_info.length)
            //如果只有一個自創TAG
            if(tag_info.length==1){
                    const url = "http://140.115.87.192:8090/getTag";
                    fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                            //取得全部fund
                            member_id: -1,
                            tag_id:-1,
                            fld022:id,
                    })
                    
                    })
                    .then((response) => {return response.json();})
                    .then((jsonData) => { 
                    if(jsonData.StatusCode==200){
                            var info = [];
                            var j=0;
                            var _break=true;
                            for(var i = 0; i < jsonData.tag_info.length; i++){
                                info.push(JSON.parse(jsonData.tag_info[i]))
                            }
                            console.log()
                            do {
                                if(info[j].memberID!=member_id){
                                    this.setState({tag2:info[j].tagContent})
                                    this.setState({showtag2:"visable"})
                                    this.setState({colortag2:false})//另外一個非自己建立的TAG
                                    _break=false;
                                }
                                j++;
                             } while (j<info.length&&_break==true);
                                
                        
                        }
                        else{ //statuscode=1000 >>沒有tag
                            console.log("no tag")
                            }
                    })
            }
            else if(tag_info.length==2){
                this.setState({tag2:tag_info[1].tagContent})
                this.setState({showtag2:"visable"})
                this.setState({colortag2:true})
            }
            }
            
            catch (d){
                let id = (this.props.match.params.fundid.split('='))[1];
                const url = "http://140.115.87.192:8090/getTag";
                fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        //取得全部fund
                        member_id: -2,
                        tag_id:-2,
                        fld022:id,
                })
                
                })
                .then((response) => {return response.json();})
                .then((jsonData) => { 
                    if(jsonData.StatusCode==200){
                        var info = [];
                        var count=0;
                        for(var i = 0; i < jsonData.tag_info.length; i++){
                            info.push(JSON.parse(jsonData.tag_info[i]));
                            count=i+1; 
                            var string =`tag${count}`;
                            var showstring = `show${string}`
                            var showcolor = `color${string}`
                            console.log("showstring:",showstring)
                            this.setState({[string]:info[i].tagContent})
                            this.setState({[showstring]:"visable"})
                            this.setState({[showcolor]:false})
                        }
                    
                    }
                    else{ //statuscode=1000 >>沒有tag
                        console.log("no tag")
                        }
                })
            }
        }
        })
        .then(() => { this.getnet();})
}


    getnet(){
        let fund_net=[];
        let id = (this.props.match.params.fundid.split('='))[1];
        const url2 = "http://140.115.87.192:8090/getNetWorth";////////改url
        //console.log(data)
        fetch(url2, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: id,
                    seltype: 1
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.fund_net)
            fund_net=JSON.parse(jsonData.fund_net)
            if(jsonData.StatusCode==200){
                
                //console.log(fund_net[0])
                //console.log(fund_net[1])

                let minus = ((fund_net[1].History_NetWorth)-(fund_net[0].History_NetWorth)).toFixed(4);
                let percent = ((minus/fund_net[1].History_NetWorth)*100).toFixed(2);
                if(minus>0){
                    minus = '▲ '+minus;
                    percent = '▲ '+percent;
                    console.log('正')
                }
                else if(minus<0){
                    minus = '▼'+minus;
                    percent = '▼'+percent;
                    console.log('負')
                }
                else{
                    console.log('平')
                }

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            new_net:(fund_net[1].History_NetWorth).toFixed(4), //參考網址：https://reurl.cc/9E2DKa
                            fund_gain:minus,
                            fund_percent:percent,
                            };
                });
            }
            })
            .then(() => { this.getROI();})
    }

    getROI(){
        let fund_return=[];
        let id = (this.props.match.params.fundid.split('='))[1];
        const url2 = "http://140.115.87.192:8090/getReturn";////////改url
        //console.log(data)
        fetch(url2, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: id,
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
                            };
                });
            }
            })
            .then(() => {this.netgraph();})
    }

    netgraph(){
        let fund_net=[];
        let net=[];
        let day = [];
        let i = 0;
        let id = (this.props.match.params.fundid.split('='))[1];
        const url3 = "http://140.115.87.192:8090/getNetWorth";////////改url
        //console.log(data)
        fetch(url3, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: id,
                    seltype: 2
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData)
            fund_net=JSON.parse(jsonData.fund_net)
            if(jsonData.StatusCode==200){
                
                //console.log(fund_net[0])

                for(i = 0; i < fund_net.length; i++){
                    net.push(fund_net[i].History_NetWorth);
                    day.push(fund_net[i].History_Datatime)
                }

                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            history_net:net,
                            history_day:day,
                            };
                });

            }
            })
            .then(() => {this.performancegraph();})

    }

    performancegraph(){
        let fund_performance=[];
        let sharpe=[];
        let treynor = [];
        let jensen = [];
        let beta = [];
        let SD = [];
        let day = [];
        let i = 0;
        let id = (this.props.match.params.fundid.split('='))[1];
        const url4 = "http://140.115.87.192:8090/getPerformance";////////改url
        //console.log(data)
        fetch(url4, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fld022: id,
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
                performance_sharpe = sharpe;
                performance_treynor = treynor;
                performance_day = day;
                risk_beta = beta;
                risk_SD = SD;

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
            }
            })
    }

    tag_link(){
        let fund_id = (this.props.match.params.fundid.split('='))[1];
        let member_id = load_cookies("member_id");
        let path = '/page-tag/member_id='+ member_id +'/fundid='+fund_id;
        
        this.props.history.push({
            pathname: path
  })
    }
    
    //新增TAG功能
    handleSubmit(){
        let errors = {}; 
        //取消DOM的預設功能
        window.event.preventDefault();
        if(!isEmpty(this.state.new_tag)){
        let fld022 = (this.props.match.params.fundid.split('='))[1];
        const url = "http://140.115.87.192:8090/GenerateTag";
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        member_id: load_cookies("member_id"),
                        fld022: fld022,
                        content:this.state.new_tag,
                })
                
            
            })
        .then((response) => {return response.json();})
        .then((jsonData) => {
            if(jsonData.StatusCode==200){
                console.log(jsonData)
                alert("新增成功")
                //重新整理畫面,刷新頁面
                this.setState();
                window.location.reload(true);
            }
            else{
                alert("您的TAG已達上限，請先至個人TAG管理頁面做刪除，才能再做新增！")
                console.log("handleSubmit_error")}   
        })}
        else {
            // errors["tag_new_is_errors"] = true;
            // errors["tag_new"]="TAG內容不能為空白"
            alert("TAG內容不能為空白")
        }
        //this.setState({errors: errors});
    }


    render(){     //render的意義為何??(待查清) //猜想：render預設的渲染方式，網頁一開始執行的
        
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
                text: ' '
            },
            yAxis: {
                title: {
                    text: '淨值單位'
                }
            },
            credits:{
                enabled:false
            },
            xAxis:{
                categories:this.state.history_day,//['2010','2011','2012','2013','2014','2015','2016','2017'] //這裡要從資料庫讀
                labels:{  //參考連結：https://reurl.cc/ar2eGX
                    //step: 30
                    enabled:false //不顯示X軸
                }
            },
            series: [{    //這裡要從資料庫讀
                name: '淨值',
                data:this.state.history_net// //[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }],
            };

        var config_performance = {

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
                categories: this.state.history_performance_day,//這裡要從資料庫讀
                labels:{  //參考連結：https://reurl.cc/ar2eGX
                    //step: 30
                    enabled:false //不顯示X軸
                }
            },
            series: [{    //這裡要從資料庫讀
                name: 'sharpe ratio',
                data: this.state.history_sharpe
            }, {
                name: 'trenyor ratio',
                data: this.state.history_treynor
            }],
            };

        return(
            
            <div>
            {!this.state.initial ? (<LoadingIndicator></LoadingIndicator>): 
            (
            <div className='allfund-menu'>
            <Container>
            <IndexNavbar></IndexNavbar>
            <div className='sub-menu' id='ino_parent'>
            <Row>
                <div className='sub-sub-detail'  id='info'>
                <Row >
                    <label className='fund-name'>{this.state.fund_name}</label>  {/*從資料庫讀取基金的名字*/}
                    <label className='tag-label' style={{visibility: this.state.showtag2 ? 'visible' : 'hidden', color:this.state.colortag2 ? "#CD5C5C" : "	#444444"}}>{this.state.tag2}</label>
                    <label className='tag-label' style={{display: this.state.showtag1 ? 'visible' : 'hidden',color:this.state.colortag1 ? "#CD5C5C" : "	#444444"}}>{this.state.tag1}</label>
                   {/* <button className='Compare-btn'><a href='#page-compare'>去比較</a></button>*/}
                   <input type="button" className={this.state.track_state==1 ? "followBtnTrue" : "followBtnFalse"} onClick={this.togglestate,this.CreateTrack} value={this.state.track_state==1 ? "√ 已追蹤" : "+ 追蹤"}></input>
                </Row>   
                <Row >
                    <label className='fund-value'>{this.state.new_net}</label> {/*從資料庫讀取基金的淨值*/}
                    <label className='fund-currency'>{this.state.fund_currency}</label>
                    <label className='fund-percentage'>{this.state.fund_percent}%​<p></p>{this.state.fund_gain}</label>
                </Row> 
                <Row  className='fund-data'>
                    <span><label>績效：3月：</label><label>{this.state.History_ROI_3M}%</label><label>&nbsp;&nbsp;&nbsp;</label><label>6月：</label><label>{this.state.History_ROI_6M}%</label><label>&nbsp;&nbsp;&nbsp;</label><label>1年：</label><label>{this.state.History_ROI_12M}%</label></span>
                </Row>
                <Row className='fund-data'>
                    <span><label> 成立日期：</label><label>{this.state.fund_startdate}</label><label>&nbsp;&nbsp;&nbsp;</label><label>基金規模：</label><label>{this.state.fund_currency} {this.state.fund_scale}</label></span>
                </Row>
                </div>
            </Row>
            <Row>
                <div className='sub-sub-graphics'>
                <Row>
                    <label className='net-worth-label'>淨值走勢</label>
                </Row>
                <Row>              
                    <div className='chart'>    {/*參考網址：https://reurl.cc/lVxRlv*/}
                        <ReactHighcharts config={config_net}  /> 
                    </div>
                </Row>
                <Row>
                    <label className='net-worth-label'>單筆比較</label>
                </Row>
                    <button id='performance-btn' onClick={this.handleClick1}>績效</button>
                    <button id='risk-btn' onClick={this.handleClick2}>風險</button>
                <Row>
                    <div className='chart' id='chartid'  ref='change'>
                        <ReactHighcharts config={config_performance}/>
                    </div>
                </Row>
                </div>              
            </Row>
            
            <Row>
                <div className='sub-sub-tag'>
                    <button className='tag-btn' onClick={this.handleSubmit} >新增TAG</button><div className='input-tag'><input onChange={this.handleChange('new_tag')} className='input-fieled' size="8" maxlength="8"></input></div>
                    <button className='tag-btn-hidden' onClick={this.handleClickTAG}>去看看所有TAG➥</button>   
                </div>
            </Row>
            <Row>
                <div className='sub-sub-basic-info'>               
                    <table className='fund-basic-info' border='2' cellpadding="4">
                    <tr  width="30%">
                        <th>基金名稱</th>
                        <th>基金名稱（英文）</th>
                        <th>基金統編</th> 
                        <th>國際證券識別碼</th>
                        <th>管理公司</th>
                        <th>經理人</th>
                        <th>基金規模</th>
                        <th>風險評等</th>
                        <th>計價幣別</th>
                        <th>成立時間</th>
                        <th>基金類別</th>
                        <th height='300px'>目標</th>
                    </tr>
                    <tr> {/*從資料庫讀取*/}
                        <td rowspan="2">{this.state.fund_name}</td>
                        <td rowspan="2">{this.state.fund_EN_name}</td>
                        <td rowspan="2">{this.state.fund_fld022}</td> 
                        <td rowspan="2">{this.state.fund_ISINcode}</td>
                        <td rowspan="2">{this.state.company_name}</td>
                        <td rowspan="2">{this.state.manager_name}</td>
                        <td rowspan="2">{this.state.fund_currency} {this.state.fund_scale}</td>
                        <td>{this.state.fund_riskRank}</td>
                        <td>{this.state.fund_currency}</td>
                        <td>{this.state.fund_startdate}</td>
                        <td>{this.state.fund_type}</td>
                        <td height='300px'>{this.state.fund_Target}</td>
                    </tr>
                    </table>
                    </div>
                </Row>
            <Row>
            </Row>
            </div>
            </Container>
            </div>
            )}
            </div>
        )};

}    
export default DetailFund;

function chart_performance() {  //顯示績效

    var config_performance = {

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
            name: 'sharpe ratio',
            data: performance_sharpe
        }, {
            name: 'trenyor ratio',
            data: performance_treynor
        }],
        };
    ReactDOM.render(
        <ReactHighcharts config={config_performance}/>,
      document.getElementById('chartid')
    );
}
function chart_risk() {  //顯示風險
    var config_risk = {

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
            name: 'beta',
            data: risk_beta//[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: 'SD(Standard Deviation)',
            data: risk_SD//[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }],
        };
    ReactDOM.render( //猜想：更新DOM的部分，參考：https://reurl.cc/0orjYb
        <ReactHighcharts config={config_risk}/>,
      document.getElementById('chartid')
    );
}
