import React from "react";
import ReactDOM from 'react-dom';
import 'react-multi-carousel/lib/styles.css';
import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import _ from "underscore";
import ReactHighcharts from'react-highcharts'; //基金圖表套件，參考：https://reurl.cc/0ored6
import {browserHistory} from 'react-router';
import { load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import { TextField } from "@material-ui/core";
import isEmpty from "views/Function/isEmpty.js"
import VerticalTabs from "views/FundPage/VerticalTab.js"
import CheckLogin from "views/Function/CheckLogin.js"
import BorderColorIcon from '@material-ui/icons/BorderColor';

//覆寫CSS
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { forwardRef } from 'react';


//處理對話框
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

// reactstrap components
import { Button2, Card, Form, Input, Container, Row, Col} from "reactstrap";
import { string } from "prop-types";

//loading page
import LoadingIndicator from "views/Function/LoadingIndicator.js";

var performance_sharpe = [];
var performance_treynor = [];
var performance_day = [];
var risk_beta = [];
var risk_SD = [];
var fundid="";
var tag1_id=0;
var tag2_id=0;

const styles = () => ({
    customDialogTitle: {
      backgroundColor: "#f8f5c4",
      '& h2': {
        fontFamily:"Microsoft JhengHei",
        fontWeight: 900,
        fontSize:25,
        // backgroundColor: "#f8f5c4"
      },
    },
    customDialogContent:{
      backgroundColor: "#f8f5c4",
      '& p': {
        fontFamily:"Microsoft JhengHei",
        fontWeight: 600,
        fontSize:18,
        color: "#4d4d4d",
      }

    },
    customDialogActions:{
      backgroundColor: "#f8f5c4",
      '& button': {
        backgroundColor: "#bba57d",
        borderColor: "#bba57d",
      },
    },
    customTable: {
      "& .MuiPaper-elevation2": {
        color: "rgba(0, 0, 0, 0.87)",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        backgroundColor: "#fff",
        width: "100%",
        fontFamily:"微軟正黑體",
      }
      
    }
});


// core components
class DetailFund extends React.Component{

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
        showtag3:false,
        showtag4:false,
        colortag1:true,
        colortag2:true,
        fund_net_CSS:'fund-value-red',
        fund_percentage_CSS:'fund-percentage-red',
        teach1:true,
        teach2:false,
        teach3:false,
      };
      
      this.handleClick1 = chart_performance.bind(this); //綁定事件，參考：https://reurl.cc/pdkgQ8
      this.handleClick2 = chart_risk.bind(this); //綁定事件
      this.handleClickTAG = this.tag_link.bind(this);
      this.trackstate = this.trackstate.bind(this); //追蹤基金事件(綁定track按鈕)
      this.togglestate = this.togglestate.bind(this);
      this.CreateTrack = this.CreateTrack.bind(this);
      this.CreateMemo = this.CreateMemo.bind(this);
      this.getMemo = this.getMemo.bind(this);
      this.handleClickOpenMemo = this.handleClickOpenMemo.bind(this);
      this.handleCloseMemo = this.handleCloseMemo.bind(this);
      this.getMyTag=this.getMyTag.bind(this);
      this.getTag=this.getTag.bind(this);
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.delete=this.delete.bind(this);
      this.handleClickOpen=this.handleClickOpen.bind(this);
      this.handleClose=this.handleClose.bind(this);
      this.handleClickOpenAdd=this.handleClickOpenAdd.bind(this);
      this.handleCloseAdd=this.handleCloseAdd.bind(this);

    }
    componentDidMount() {
        //取得基金資料
        let fund_info=[];
        console.log(this.props.match.params.fundid.split('='));
        let id = (this.props.match.params.fundid.split('='))[1];
        fundid=id;
        const url = "https://fundu.ddns.net:8090/getFundInfo";////////改url
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
        const url = "https://fundu.ddns.net:8090/getTrack";
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
        const url = "https://fundu.ddns.net:8090/CreateTrack";
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

    CreateMemo(){
        let id = (this.props.match.params.fundid.split('='))[1]; //抓現在頁面的id
        const url = "https://fundu.ddns.net:8090/Memo";
        fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              content: this.state.new_content,
              userid: load_cookies("member_id"),
              fld022: id,
            //   fld022: this.state.fund_fld022_track,
          })
          
        })
        .then((response) => {return response.json();})
        .then((jsonData) => {
          console.log(jsonData)
          if(jsonData.StatusCode==200){
            alert("成功更新備忘錄！")
            window.location.reload(true)  //更新狀態後重新整理頁面
          }
          else{
            alert("error")
          }
        })
  
      }
  

    getMemo(fld022,chname){
        const url = "https://fundu.ddns.net:8090/getMemo";
        console.log(fld022)
        console.log(chname)
        fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userid: load_cookies("member_id"),
              fld022: this.state.fund_fld022_track,
            //   fld022: fld022,
          })
          
        })
        .then((response) => {return response.json();})
        .then((jsonData) => {
          console.log(jsonData)
          if(jsonData.StatusCode==200){
            var memo_info=[];
            
            //memo_info=JSON.parse(jsonData.info)
            for(var i = 0; i < jsonData.info.length; i++){
                memo_info.push(JSON.parse(jsonData.info[i]))
            }
            if(isEmpty(memo_info[0][0].content)){
              this.setState({original_content:"您尚未新增備忘錄！"})
            }
            else{
              this.setState({original_content:memo_info[0][0].content})
            }
           
           this.setState({fund_fld022_track:fld022})
           this.setState({chname:chname})
            
  
          }
          else{
            this.setState({original_content:"您尚未新增備忘錄！"})
            this.setState({fund_fld022_track:fld022})
            this.setState({chname:chname})
          }
        })
        .then(()=>{this.handleClickOpenMemo()})
    }

    handleClickOpenMemo(){
        this.setState({
          openMemo: true
        });
      }
    handleCloseMemo(){
        this.setState({
          openMemo: false
        });
      }
    getTag(){
        let id = (this.props.match.params.fundid.split('='))[1];
        const url = "https://fundu.ddns.net:8090/getTag";
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
            console.log(jsonData)
            if(jsonData.StatusCode==200){
                var tag_info = [];
                try{
                    for(var i = 0; i < jsonData.tag_info.length; i++){
                        tag_info.push(JSON.parse(jsonData.tag_info[i]))
                    }
                    this.setState({tag3:tag_info[0].tagContent})
                    this.setState({showtag3:"visable"})
                    console.log(tag_info.length)
                
                if(tag_info.length>1){
                    this.setState({tag4:tag_info[1].tagContent})
                    this.setState({showtag4:"visable"})
                }
                }
                
                catch (d){
                    console.log("管理員沒有創建tag")
                   
                }
            }
        })
        .then(() => { this.getMyTag();})

    }

    //取得會員自己創建之TAG，顯示首頁(若沒有TAG，就顯示熱門的)
    getMyTag(){
        let member_id=load_cookies("member_id")
        let id = (this.props.match.params.fundid.split('='))[1];
        const url = "https://fundu.ddns.net:8090/getTag";
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
                console.log(jsonData.tag_info)
                tag_info=JSON.parse(jsonData.tag_info)
                this.setState({tag1:tag_info[0].tagContent})
                //this.setState({tag1_id:tag_info[0].tagID})
                tag1_id=tag_info[0].tagID;
                this.setState({showtag1:"visable"})
                this.setState({colortag1:true})
                console.log(tag_info.length)
            //如果只有一個自創TAG
            // if(tag_info.length==1){
            //         const url = "https://fundu.ddns.net:8090/getTag";
            //         fetch(url, {
            //         method: 'POST',
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //                 //取得全部fund
            //                 member_id: -1,
            //                 tag_id:-1,
            //                 fld022:id,
            //         })
                    
            //         })
            //         .then((response) => {return response.json();})
            //         .then((jsonData) => { 
            //         if(jsonData.StatusCode==200){
            //                 var info = [];
            //                 var j=0;
            //                 var _break=true;
            //                 for(var i = 0; i < jsonData.tag_info.length; i++){
            //                     info.push(JSON.parse(jsonData.tag_info[i]))
            //                 }
            //                 console.log()
            //                 do {
            //                     if(info[j].memberID!=member_id){
            //                         this.setState({tag2:info[j].tagContent})
            //                         this.setState({showtag2:"visable"})
            //                         this.setState({colortag2:false})//另外一個非自己建立的TAG
            //                         _break=false;
            //                     }
            //                     j++;
            //                  } while (j<info.length&&_break==true);
                                
                        
            //             }
            //             else{ //statuscode=1000 >>沒有tag
            //                 console.log("no tag")
            //                 }
            //         })
            // }
            if(tag_info.length==2){
                this.setState({tag2:tag_info[1].tagContent})
                //this.setState({tag2_id:tag_info[1].tagID})
                tag2_id=tag_info[1].tagID
                this.setState({showtag2:"visable"})
                this.setState({colortag2:true})
            }
            }
            
            catch (d){
                console.log("一個自己創建的tag都沒有")
                // let id = (this.props.match.params.fundid.split('='))[1];
                // const url = "https://fundu.ddns.net:8090/getTag";
                // fetch(url, {
                // method: 'POST',
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({
                //         //取得全部fund
                //         member_id: -2,
                //         tag_id:-2,
                //         fld022:id,
                // })
                
                // })
                // .then((response) => {return response.json();})
                // .then((jsonData) => { 
                //     if(jsonData.StatusCode==200){
                //         var info = [];
                //         var count=0;
                //         for(var i = 0; i < jsonData.tag_info.length; i++){
                //             info.push(JSON.parse(jsonData.tag_info[i]));
                //             count=i+1; 
                //             var string =`tag${count}`;
                //             var showstring = `show${string}`
                //             var showcolor = `color${string}`
                //             console.log("showstring:",showstring)
                //             this.setState({[string]:info[i].tagContent})
                //             this.setState({[showstring]:"visable"})
                //             this.setState({[showcolor]:false})
                //         }
                    
                //     }
                //     else{ //statuscode=1000 >>沒有tag
                //         console.log("no tag")
                //         }
                // })
            }
        }
        })
        .then(() => { this.getnet();})
}


    getnet(){
        let fund_net=[];
        let id = (this.props.match.params.fundid.split('='))[1];
        const url2 = "https://fundu.ddns.net:8090/getNetWorth";////////改url
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
                    this.setState((state, props) => {
                        return {fund_net_CSS:'fund-value-red',
                                fund_percentage_CSS:'fund-percentage-red',
                        };
                    });
                }
                else if(minus<0){
                    minus = '▼'+minus;
                    percent = '▼'+percent;
                    console.log('負')
                    this.setState((state, props) => {
                        return {fund_net_CSS:'fund-value-green',
                                fund_percentage_CSS:'fund-percentage-green',
                        };
                    });
                    
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
        const url2 = "https://fundu.ddns.net:8090/getReturn";////////改url
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
        const url3 = "https://fundu.ddns.net:8090/getNetWorth";////////改url
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
        const url4 = "https://fundu.ddns.net:8090/getPerformance";////////改url
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
        // let path = '/page-tag/member_id='+ member_id +'/fundid='+fund_id;
        let path = '/page-tag/fundid='+fund_id;

        
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
        const url = "https://fundu.ddns.net:8090/GenerateTag";
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
                alert("您的TAG已達上限2筆，請先將TAG做刪除，才能再做新增！")
                console.log("handleSubmit_error")}   
        })}
        else {
            // errors["tag_new_is_errors"] = true;
            // errors["tag_new"]="TAG內容不能為空白"
            alert("TAG內容不能為空白")
        }
        //this.setState({errors: errors});
    }

 

    //處理對話框方法
    handleClickOpen=(in_tagid)=>{
        this.setState({tag_in_id:in_tagid});
        this.setState({open: true,});
    }
  
    handleClose(){
        this.setState({
          open: false
        });
    }

      //處理對話框方法
    handleClickOpenAdd(){
        this.setState({open_add: true,});
    }
  
      handleCloseAdd(){
        this.setState({
          open_add: false
        });
      }

    //刪除TAG
    delete = (in_tagid,in_fld022) => {
            const url = "https://fundu.ddns.net:8090/DeleteTag";
            fetch(url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    //取得全部fund
                    member_id: load_cookies("member_id"),
                    tag_id:in_tagid,
                    fld022:in_fld022
              })
              
        })
      .then((response) => {return response.json();})
      .then((jsonData) => { 
          console.log(jsonData)
        if(jsonData.StatusCode==200){
          this.handleClose()
          alert("刪除成功！")
          //重新整理畫面
          //刷新頁面
          this.setState();
          window.location.reload(true);
        }
        else{
          alert("error")
        }
      })
    
    }

    

    render(){     //render的意義為何??(待查清) //猜想：render預設的渲染方式，網頁一開始執行的
        const {classes} = this.props;

        var config_net = {

            chart : {
                backgroundColor: '#f6f6f6',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                borderRadius: 5,
                shadow:true
            },
            // color :{
            //         colors: ['#00008b', '#00008b', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655',
            //     '#FFF263', '#6AF9C4']
            // },
            title: {
                text: ''
            },
            subtitle: {
                text: ' '
            },
            yAxis: {
                title: {
                    text: '淨值單位'
                },
                gridLineColor:'#000000',
                gridLineWidth:'0.5',

            },
            credits:{
                enabled:false
            },
            xAxis:{
                categories:this.state.history_day,//['2010','2011','2012','2013','2014','2015','2016','2017'] //這裡要從資料庫讀
                labels:{  //參考連結：https://reurl.cc/ar2eGX
                    //step: 30
                    enabled:false //不顯示X軸
                },

                //gridLineWidth:'1'
            },
            series: [{    //這裡要從資料庫讀
                name: '淨值',
                data:this.state.history_net// //[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }],
            };

        var config_performance = {

            chart : {
                backgroundColor: '#f6f6f6',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                borderRadius: 5,
                shadow:true
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
                },
                gridLineColor:'#000000',
                gridLineWidth:'0.5'
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
            {
            isEmpty(load_cookies("member_id")) ? <CheckLogin></CheckLogin> :
            !this.state.initial ? (<LoadingIndicator></LoadingIndicator>): 
            (
            <div className='allfund-menu'>
            <Container>
            <IndexNavbar></IndexNavbar>
            <div className='sub-menu' id='ino_parent'>
            <Row>
                <div className='sub-sub-detail'  id='info'>
                <Row >
                    <Col xs={7} md={9}> <label className='fund-name'>{this.state.fund_name}
                    <BorderColorIcon className="memo" onClick={this.getMemo}/>
                    </label>  {/*從資料庫讀取基金的名字*/}
                    </Col>

                <div className="memo_content">
                  <Dialog   
                    open={this.state.openMemo} 
                    keepMounted
                    onClose={this.handleCloseMemo} 
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'xs'}
                    classes={{root: classes.customDialog}}
                   >
                     
                    <DialogTitle 
                      id="form-dialog-title" 
                      classes={{root: classes.customDialogTitle}}
                    >
                      <BorderColorIcon></BorderColorIcon>{this.state.fund_name}
                      <hr className="hr"></hr>
                      </DialogTitle>
                      
                    <DialogContent classes={{root: classes.customDialogContent}}>
                      <DialogContentText >
                          {this.state.original_content}
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="請輸入備忘錄內容"
                        multiline
                        rowsMax={4}
                        type="string"
                        // defaultValue={this.state.content}
                        onChange={this.handleChange('new_content')} //更新新增內容
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions classes={{root: classes.customDialogActions}}>
                      <Button onClick={this.handleCloseMemo} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={this.CreateMemo} color="primary">
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>

                    <Col xs={5} md={3}>
                        <div className='button-position'>
                            <input type="button" className={this.state.track_state==1 ? "followBtnTrue" : "followBtnFalse"} onClick={this.togglestate,this.CreateTrack} value={this.state.track_state==1 ? "√ 已追蹤" : "+ 追蹤"}></input>
                        </div> 
                    </Col>
                </Row> 
                <Row>
                    <div className='tag-position'>
                        <Row>
                            <Col xs={12} md={12}>
                                <div className='tag-label-position'><label className='tag-label' style={{display: this.state.showtag3 ? 'inline' : 'none', color:"#444444"}}><a className="delete-tag" onClick={this.handleClickTAG} style={{cursor: 'pointer'}}>{this.state.tag3}</a></label></div>
                                <div className='tag-label-position'><label className='tag-label' style={{display: this.state.showtag4 ? 'inline' : 'none',color:"#444444"}}><a className="delete-tag" onClick={this.handleClickTAG} style={{cursor: 'pointer'}}>{this.state.tag4}</a></label></div>
                                <div className='tag-label-position'><label className='tag-label' style={{display: this.state.showtag2 ? 'inline' : 'none', color:"#CD5C5C"}}><a className="delete-tag"  onClick={()=>this.handleClickOpen(tag2_id,fundid)} style={{cursor: 'pointer'}}>{this.state.tag2}</a></label></div>
                                <div className='tag-label-position'><label className='tag-label' style={{display: this.state.showtag1 ? 'inline' : 'none',color:"#CD5C5C"}}><a className="delete-tag" onClick={()=>this.handleClickOpen(tag1_id,fundid)} style={{cursor: 'pointer'}}>{this.state.tag1}</a></label></div></Col>
                        </Row> 
                    <Dialog
                        open={this.state.open}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Confirm"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    你想要刪除此TAG嗎？
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={() => this.delete(this.state.tag_in_id,fundid)} color="primary" >
                        是
                    </Button>
                    </DialogActions>
                </Dialog>   
                    </div>
                </Row>  
                <Row >
                    <Col xs={12} md={{size: 5}}>
                        <div className='fund-currency-position'>
                            <label className={this.state.fund_net_CSS}>{this.state.new_net}<span className='fund-currency'>{this.state.fund_currency}</span></label>
                        </div> {/*從資料庫讀取基金的淨值*/}
                    </Col>
                    <Col xs={12} md={{size: 5}}>
                        <div className='fund-percentage-position'>
                            <label className={this.state.fund_percentage_CSS}>{this.state.fund_percent}%​<p></p>{this.state.fund_gain}</label>
                        </div>
                    </Col>
                </Row> 
                <Row  className='fund-data'>
                    <span><label>績效：3月：</label><label>{this.state.History_ROI_3M}%</label><label>&nbsp;&nbsp;&nbsp;</label><label>6月：</label><label>{this.state.History_ROI_6M}%</label><label>&nbsp;&nbsp;&nbsp;</label><label>1年：</label><label>{this.state.History_ROI_12M}%</label></span>
                </Row>
                <Row className='fund-data'>
                    <span><label> 成立日期：</label><label>{this.state.fund_startdate}</label></span>
                </Row>
                <Row className='fund-data'>
                    <span><label>基金規模：</label><label>{this.state.fund_currency} {this.state.fund_scale}</label></span>
                </Row>
                </div>
            </Row>
                        
            <Row>
                <div className='sub-sub-tag'>
                <Row>
                    <Col xs={6} md={6}><div className='input-tag-btn'><button className='tag-btn' onClick={this.handleClickOpenAdd} >新增自己的TAG➥</button></div></Col>
                    {/* <Col xs={6} md={9}><div className='input-tag'><input onChange={this.handleChange('new_tag')} className='input-fieled' size="8" maxlength="8"></input></div></Col>        */}
                    <Dialog
                                open={this.state.open_add}
                                keepMounted
                                onClose={this.handleCloseAdd}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Confirm"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            請輸入你想要新增的TAG
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="tag_contnt"
                                label="TAG內容"
                                fullWidth
                                onChange={this.handleChange('new_tag')} //更新新增內容
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={this.handleCloseAdd} color="primary">
                                取消
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary" >
                                是
                            </Button>
                            </DialogActions>
                        </Dialog>
                    <Col xs={6} md={6}><div className='input-tag-btn'></div><button className='tag-btn' onClick={this.handleClickTAG}>TAG評價➥</button></Col>
                </Row>    
                </div>
            </Row>
            <Row>
                <div className='sub-sub-graphics'>
                <Row>
                    <div className='sub-sub-graphics-title'><label className='net-worth-label'>淨值走勢</label></div>
                </Row>
                <Row>              
                    <div className='chart'>    {/*參考網址：https://reurl.cc/lVxRlv*/}
                        <ReactHighcharts config={config_net}  /> 
                    </div>
                </Row>
                <Row>
                    
                        <div className='sub-sub-graphics-title'><label className='net-worth-label'>單筆比較</label>
                    
                    
                        <div className='sub-sub-graphics-btn'>
                            <button id='performance-btn' onClick={this.handleClick1}>績效</button>
                            <button id='risk-btn' onClick={this.handleClick2}>風險</button>
                        </div>
                        </div>
                </Row>
                
                <Row>
                    <div className='chart' id='chartid'  ref='change'>
                        <ReactHighcharts config={config_performance}/>
                    </div>
                </Row>
                </div>              
            </Row>

            <Row>
                <div className='sub-sub-basic-info'>               
                    <table className='fund-basic-info' border='2' cellpadding="4">
                        <tr>
                            <th>基金名稱</th>
                            <td>{this.state.fund_name}</td>
                        </tr>
                        <tr>
                            <th>基金名稱（英文）</th>
                            <td>{this.state.fund_EN_name}</td>
                        </tr>
                        <tr>
                            <th>基金統編</th>
                            <td>{this.state.fund_fld022}</td>  
                        </tr>
                        <tr>
                            <th>國際證券識別碼</th>
                            <td>{this.state.fund_ISINcode}</td>
                        </tr>
                        <tr>
                            <th>管理公司</th>
                            <td>{this.state.company_name}</td>
                        </tr>
                        <tr>
                            <th>經理人</th>
                            <td>{this.state.manager_name}</td>
                        </tr>
                        <tr>
                            <th>基金規模</th>
                            <td>{this.state.fund_currency} {this.state.fund_scale}</td>
                        </tr>
                        <tr>
                            <th>風險評等</th>
                            <td>{this.state.fund_riskRank}</td>
                        </tr>
                        <tr>
                            <th>計價幣別</th>
                            <td>{this.state.fund_currency}</td>
                        </tr>
                        <tr>
                            <th>成立時間</th>
                            <td>{this.state.fund_startdate}</td>
                        </tr>
                        <tr>
                            <th>基金類別</th>
                            <td>{this.state.fund_type}</td>
                        </tr>
                        <tr>
                            <th>目標</th>
                            <td>{this.state.fund_Target}</td>
                        </tr>
                    </table>
                </div>
            </Row>
            <Row>
                <div className="sub-sub-fund-introduce">
            {/* <Row>
                <Col sm={3}><label className='fund-introduce-label'>基金各指標含意</label></Col>
                <Col sm={9}>
                    <div className='teach-btn-position'>
                        <button className='teach-btn' onClick={()=>this.setState({teach1:true,teach2:false,teach3:false})}>淨值</button>
                        <button className='teach-btn' onClick={()=>this.setState({teach2:true,teach1:false,teach3:false})}>績效</button>
                        <button className='teach-btn' onClick={()=>this.setState({teach3:true,teach2:false,teach1:false})}>風險</button>
                    </div>
                </Col>
            </Row> */}
            <Row>
                <Col md={4}><div className='introduce-label-position'><label className='fund-introduce-label'>基金各指標含意</label></div></Col>
                <Col md={8}>
                    <div className='teach-btn-position-1'>
                        <div className='teach-btn-position'><button className='teach-btn' onClick={()=>this.setState({teach1:true,teach2:false,teach3:false})}>淨值</button></div>
                        <div className='teach-btn-position'><button className='teach-btn' onClick={()=>this.setState({teach2:true,teach1:false,teach3:false})}>績效</button></div>
                        <div className='teach-btn-position'><button className='teach-btn' onClick={()=>this.setState({teach3:true,teach2:false,teach1:false})}>風險</button></div>
                    </div>
                </Col>
                
                
                
            </Row>
            
            <Row>
                <div className='teach-content' style={{display: this.state.teach1 ? 'inline' : 'none'}}>
                <table className='fund-introduce-info'>
                    <tr>
                        <th width="28%">淨值</th>
                        <td height="80px">該基金之單位淨值；歷史資料為各月底數值，但當月份至月底前係採用目前該檔基金最近一日的資料。</td>
                    </tr>
                </table>
                </div>
                <div className='teach-content' style={{display: this.state.teach2 ? 'inline' : 'none'}}>
                    <table className='fund-introduce-info' style={{border:"0"}}>
                        <tr>
                            <th width="33%">Sharpe Ratio</th>
                            <td height="80px">夏普指數，為衡量基金承擔每單位總風險所得之超額報酬。</td>
                        </tr>
                        <tr>
                            <th width="33%">Treynor Ratio</th>
                            <td height="80px">崔納指數，為衡量基金承擔每單位市場風險所得之超額報酬。</td>
                        </tr>
                    </table>
                </div>
                <div className='teach-content' style={{display: this.state.teach3 ? 'inline' : 'none'}}>
                    <table className='fund-introduce-info' style={{border:"0"}}>
                        <tr>
                            <th width="28%">Beta</th>
                            <td height="80px">為衡量基金相較於市場報酬率波動的幅度，此處以近12個月該基金單月ROI與市場(Y9999加權指數)單月ROI所計算之值。</td>
                        </tr>
                        <tr>
                            <th width="28%">SD(Standard Deviation)</th>
                            <td height="80px">以近12個月的單月報酬率所計算之年化標準差；成立未滿12個月者不予計算。</td>
                        </tr>
                    </table>
                </div>
                
            </Row>
            </div>
            </Row>
            </div>
            </Container>
            </div>
            )}
            </div>
        )};

}
DetailFund.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(DetailFund);

// export default DetailFund;

function chart_performance() {  //顯示績效

    var config_performance = {

        chart : {
            backgroundColor: '#f6f6f6',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderRadius: 5,
            shadow:true
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
            },
            gridLineColor:'#000000',
            gridLineWidth:'0.5'
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
            backgroundColor: '#f6f6f6',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderRadius: 5,
            shadow:true
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
            },
            gridLineColor:'#000000',
            gridLineWidth:'0.5'
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
