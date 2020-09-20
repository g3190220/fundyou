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

//liff套件
import liff from '@line/liff';

var performance_sharpe = [];
var performance_treynor = [];
var performance_day = [];
var risk_beta = [];
var risk_SD = [];
var liff_userid="";
var member_ID="";
var id ="";
var tag1_id=0;
var tag2_id=0;

// core components
class LineDetailFund extends React.Component{

      state = {
    }
    

    constructor(props) { //待搞懂
        super(props)
        //this.getLiffid = this.getLiffid.bind(this);
        //this.ChangeLiffid=this.ChangeLiffid.bind(this);
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
        fundid:(this.props.match.params.fundid.split('='))[1],
      };
      
      this.handleClick1 = chart_performance.bind(this); //綁定事件，參考：https://reurl.cc/pdkgQ8
      this.handleClick2 = chart_risk.bind(this); //綁定事件
      //this.handleClickTAG = this.tag_link.bind(this);
      this.trackstate = this.trackstate.bind(this); //追蹤基金事件(綁定track按鈕)
      this.togglestate = this.togglestate.bind(this);
      this.CreateTrack = this.CreateTrack.bind(this);
      this.getMyTag=this.getMyTag.bind(this);
      this.getTag=this.getTag.bind(this);
      this.handleChange=this.handleChange.bind(this);
      this.getAllData=this.getAllData.bind(this);
      this.getnet=this.getnet.bind(this);
      this.getROI=this.getROI.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.delete=this.delete.bind(this);
      this.handleClickOpen=this.handleClickOpen.bind(this);
      this.handleClose=this.handleClose.bind(this);
      this.handleClickOpenAdd=this.handleClickOpenAdd.bind(this);
      this.handleCloseAdd=this.handleCloseAdd.bind(this);
      

    }
    componentDidMount() {
        console.log("start getLiffid")
        this.getAllData();
       
        // liff.init({
        //     liffId: "1654887866-eVrD8JaW" // Use own liffId
        // })
        // .then(() => {
        //     if (liff.isLoggedIn()) {
        //         liff.getProfile()
        //         .then(profile => {
        //             let userId = profile.userId;
        //             liff_userid = userId;
        //             console.log("getLiffid() end")
        //             console.log(liff_userid)
        //         })
        //         .then(()=>{
        //             this.ChangeLiffid(liff_userid)
        //         })
                
        //         }
        //     else{
        //         alert("取得失敗")
        //     }
        //     })
    }
    //處理setState的方法
    handleChange = name => event =>{
        console.log("enter_chanfe")
        this.setState({
          [name]: event.target.value,
    })}

    getAllData(){

        console.log(this.props.location.state.member_ID)
        //alert(member_id)
        let fund_info=[];
        console.log("getAllData()")
        //console.log(this.props)
        //console.log(this.props.location.pathname)
        //console.log(this.props.location.pathname.split('='));
        id = (this.props.location.pathname.split('='))[1];
        //id="971976";
        //id = this.props.location.state.fundid;
        console.log(id)
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
            console.log("getAllData()")
            console.log(jsonData)
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
            .then(()=>{this.trackstate();})

    }

    trackstate(){    //看此user有沒有追蹤過此筆基金，並改變追蹤狀態
        console.log(this.state.member_ID)
        console.log(id)
        id = (this.props.location.pathname.split('='))[1];
        let fund_info=[];
        const url = "https://fundu.ddns.net:8090/getTrack";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: this.props.location.state.member_ID,
                //userid: member_ID,
                fld022: id,
            })
        })
        .then((response) => {return response.json();})
        .then((jsonData) => {
            console.log("trackstate()")
            console.log(id)
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
        const url = "https://fundu.ddns.net:8090/CreateTrack";
        id = (this.props.location.pathname.split('='))[1];
        console.log(id)
        console.log(this.props.location.state.member_ID)
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: this.props.location.state.member_ID,
                //userid: member_ID,
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

    getTag(){
        console.log(id)
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
            console.log("getTag()")
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
        //let member_id=load_cookies("member_id")
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
                member_id: this.props.location.state.member_ID,
                //member_id: member_ID,
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
            console.log("getnet()")
            console.log(jsonData)
            
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
            console.log("getROI")
            console.log(jsonData)
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
                            initial:true,
                            };
                });
            }
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
                        member_id: this.props.location.state.member_ID,
                        //member_id: member_ID,
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
            //alert(this.props.location.state.member_ID)
            //alert(in_tagid)
            //alert(in_fld022)
            const url = "https://fundu.ddns.net:8090/DeleteTag";
            fetch(url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    //取得全部fund
                    member_id: this.props.location.state.member_ID,
                    //member_id:member_ID,
                    tag_id:in_tagid,
                    fld022:in_fld022
              })
              
        })
      .then((response) => {return response.json();})
      .then((jsonData) => { 
        if(jsonData.StatusCode==200){
            console.log("delete 200")
            console.log(jsonData)
          this.handleClose()
          alert("刪除成功！")
          //重新整理畫面s
          //刷新頁面
          this.setState();
          window.location.reload(true);
        }
        else{
          alert("error")
        }
      })
    
    }

    //獲取liff id
    // getLiffid(){
    //     alert("hi-getliffid")
    //     console.log(this.props.location.state)
    //     console.log(this.props.location.state.member_ID)
    //     liff.init({
    //         liffId: "1654887866-eVrD8JaW" // Use own liffId
        
    //     })
    //     .then(() => {
    //     if (liff.isLoggedIn()) {
    //         liff.getProfile()
    //         .then(profile => {
    //             let userId = profile.userId;
    //             liff_userid = userId;
    //             console.log("getLiffid() end")
    //             console.log(liff_userid)
    //         })
    //         .then(()=>{
    //             this.ChangeLiffid(liff_userid)
    //         })
            
    //         }
    //     else{
    //         alert("取得失敗")
    //     }
    //     })
    //this.ChangeLiffid("Uabcd7eb5beccfbac50a8434c2e4072fc")
    
    
    // }
    //檢查Liff有無連接，並回傳userid
    // ChangeLiffid(in_liff_userid){
    //     //alert("start ChangeLiffid")
    //     let member_info=[];
    //     const url = "https://fundu.ddns.net:8090/LineLogin";////////改url
    //     //console.log(data)
    //     fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                     //取得全部fund
    //                     lineid: in_liff_userid,
    //             })
                
    //         })
    //         .then((response) => {return response.json();})
    //         .then((jsonData) => { 
    //         console.log(jsonData)
    //             if(jsonData.StatusCode==200){
    //                 alert("before parse")
    //                 alert(jsonData.member_info)
    //                 member_info=JSON.parse(jsonData.member_info)
    //                 alert(member_info.member_id)
    //                 //取得系統id了
    //                 //this.state.member_id=member_info.member_id
    //                 member_id=member_info.member_id
                    
                
    //             }
    //             else{
    //                 alert("您尚未與系統連結，無法使用此功能。即將跳轉至連結頁面！")
    //                 this.props.history.push({
    //                     pathname: "/liff-linking"
    //                 })
                
    //             }
    //         })
    //         .then(() => { 
    //             alert("取得member-id")
    //             console.log(member_id)
    //             this.getAllData();
    //         });

    // }
    

    render(){     //render的意義為何??(待查清) //猜想：render預設的渲染方式，網頁一開始執行的
        
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
            !this.state.initial ? (<LoadingIndicator></LoadingIndicator>): 
            (
            <div className='allfund-menu'>
            <Container>
            <div className='sub-menu' id='ino_parent'>
            <Row>
                <div className='sub-sub-detail'  id='info'>
                <Row >
                    <Col xs={12} md={9}><label className='fund-name'>{this.state.fund_name}</label></Col>  {/*從資料庫讀取基金的名字*/}
                    <Col xs={12} md={3}>
                    <div className='button-position'>
                        <input type="button" className={this.state.track_state==1 ? "followBtnTrue" : "followBtnFalse"} onClick={this.togglestate,this.CreateTrack} value={this.state.track_state==1 ? "√ 已追蹤" : "+ 追蹤"}></input>
                    </div> 
                    </Col>
                </Row> 
                {/* <Row>
                    <div className='button-position'>
                        <input type="button" className={this.state.track_state==1 ? "followBtnTrue" : "followBtnFalse"} onClick={this.togglestate,this.CreateTrack} value={this.state.track_state==1 ? "√ 已追蹤" : "+ 追蹤"}></input>
                    </div> 
                </Row> */}
                <Row>
                    <div className='tag-position'>
                        <Row>
                            <Col xs={12} md={12}>
                            <div className='tag-label-position'><label className='tag-label' style={{display: this.state.showtag3 ? 'inline' : 'none', color:"#444444"}}><a className="delete-tag" >{this.state.tag3}</a></label></div>
                                <div className='tag-label-position'><label className='tag-label' style={{display: this.state.showtag4 ? 'inline' : 'none',color:"#444444"}}><a className="delete-tag" >{this.state.tag4}</a></label></div>
                                <div className='tag-label-position'><label className='tag-label' style={{display: this.state.showtag2 ? 'inline' : 'none', color:"#CD5C5C"}}><a className="delete-tag"  onClick={()=>this.handleClickOpen(tag2_id,this.state.fundid)} style={{cursor: 'pointer'}}>{this.state.tag2}</a></label></div>
                                <div className='tag-label-position'><label className='tag-label' style={{display: this.state.showtag1 ? 'inline' : 'none',color:"#CD5C5C"}}><a className="delete-tag" onClick={()=>this.handleClickOpen(tag1_id,this.state.fundid)} style={{cursor: 'pointer'}}>{this.state.tag1}</a></label></div></Col>
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
                    <Button onClick={() => this.delete(this.state.tag_in_id,this.state.fundid)} color="primary" >
                        是
                    </Button>
                    </DialogActions>
                </Dialog>     
                    </div>
                </Row>  
                <div className="detatil-background">
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
                </div>
            </Row>
            <Row>
                <div className='sub-sub-tag'>
                <Row>
                    <Col xs={12} md={12}><div className='input-tag-btn'><button className='tag-btn' onClick={this.handleClickOpenAdd} >新增自己的TAG➥</button></div></Col>
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
                </Row>    
                </div>
            </Row>
            <Row></Row>

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
            </div>
            </Container>
            </div>
            )}
            </div>
        )};

}    
export default LineDetailFund;
//export default withRouter(LineDetailFund);


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