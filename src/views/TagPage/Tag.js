import React from "react";
import 'react-multi-carousel/lib/styles.css';
import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import { Card, Form, Input, Container, Row, Col} from "reactstrap";
import { TextField } from "@material-ui/core";
import { load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import isEmpty from "views/Function/isEmpty.js"

//Table 套件
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import FindInPageIcon from '@material-ui/icons/PageviewOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import HowToVoteIcon from '@material-ui/icons/HowToVote';

//替代style
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//處理對話框
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';


//loading page
import LoadingIndicator from "views/Function/LoadingIndicator.js";
import LoadingIndicator_small from "views/Function/LoadingIndicator_small.js";

//分頁
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

//覆寫CSS
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

//覆寫CSS
const styles = () => ({
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
  

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  FindInPageIcon:forwardRef((props, ref) => <FindInPageIcon {...props} ref={ref} />)
};
const THEME = createMuiTheme({
    typography: {
     "fontFamily": `"Microsoft JhengHei", "Helvetica", "Arial", sans-serif`,
    }
  });

const columns_week_rank = [
    {title: '排行', field: 'Rank' ,render: rowData => rowData.tableData.id + 1},
    {title: 'TAG', field: 'tagContent' },
    {title: '本周按讚數',field: 'Weekly_like'},
    {title: '本周倒讚數',field: 'Weekly_unlike'},
];
const columns_history_rank=
[
    {title: '排行', field: 'Rank' ,render: rowData => rowData.tableData.id + 1},
    {title: 'TAG', field: 'tagContent' },
    {title: '總按讚數',field: 'History_like'},
    {title: '總倒讚數',field: 'History_unlike'},
    
];
const columns_history_recent=
[
    {title: '排行', field: 'Rank' ,render: rowData => rowData.tableData.id + 1},
    {title: 'TAG', field: 'tagContent' },
    {title: '總按讚數',field: 'History_like'},
    {title: '總倒讚數',field: 'History_unlike'},
    {title: '建立時間',field: 'Create_Date'},
    
];

const columns_vote=
[
    {title: 'TAG', field: 'tagContent' },
    {title: '總投票數',field: 'Vote'},
    {title: '建立時間',field: 'Create_Date'},
    
];

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));



var islike_info=[]

                    

class Tag extends React.Component{
    
    
    state = {
    }
    constructor(props) {
        super(props)
        //處理對話框
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleClickOpen_M=this.handleClickOpen_M.bind(this);
        this.handleClose_M=this.handleClose_M.bind(this);
        //處理分頁
        this.handleClick_Menu=this.handleClick_Menu.bind(this);
        this.handleClose_Menu=this.handleClose_Menu.bind(this);

        //排行分頁
        this.Change_rank = this.Change_rank.bind(this);
        //顯示
        this.getTagWeekRank = this.getTagWeekRank.bind(this);
        this.getFundName=this.getFundName.bind(this);
        this.getNewTag=this.getNewTag.bind(this);
        this.getHistoryTagData=this.getHistoryTagData.bind(this);
        //按讚和投票
        this.Like=this.Like.bind(this);
        this.HandleLike=this.HandleLike.bind(this);
        this.getLike=this.getLike.bind(this);
        this.Vote=this.Vote.bind(this);
        this.HandleVote=this.HandleVote.bind(this);
        this.filterlike=this.filterlike.bind(this);
        
        
        this.state = {
          errors: {},
          needFixed: false,
          open:false,
          data_thisWeek:[],
          data_history:[],
          data_allthisWeek:[],
          flag:false,
          selected_data:[],
          selected_columns:columns_history_rank
      }
    
    }
    componentDidMount() {
        //跳到頁首
        window.scrollTo(0, 0)
        this.getFundName();
    }
    /*********************************處理對話框方法*********************************/
    handleClick_Menu = () =>{
        this.setState({
            AnchorEl: this.currentTarget
        });
    }
      
    handleClose_Menu(){
        this.setState({
            AnchorEl: null
        });
    }
    /*********************************處理對話框方法*********************************/


    /*********************************處理對話框方法*********************************/
    handleClickOpen(){
        this.setState({
            open: true
        });
    }
      
    handleClose(){
        this.setState({
            open: false
        });
    }
    /*********************************處理對話框方法*********************************/

    /*********************************處理訊息框方法*********************************/
    handleClickOpen_M(){
        this.setState({
            open_M: true
        });
    }
    handleClose_M(){
        this.setState({
            open_M: false
        });
    }
    /*********************************處理訊息框方法*********************************/

    /*******************************處理setState方法********************************/
    handleChange = name => event =>{
        this.setState({
          [name]: event.target.value,
    })}
    /*******************************處理setState方法********************************/

    /*********************************關於TAG的方法*********************************/

    //(1) 顯示基金名字
    getFundName(){
        //取得基金資料
        let fund_info=[];
        let id = (this.props.match.params.fundid.split('='))[1];
        const url = "https://fundu.ddns.net:8090/getFundInfo";////////改url
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
            fund_info=JSON.parse(jsonData.fund_info)
            if(jsonData.StatusCode==200){
                //更新state並獲得以下資料
                this.setState((state, props) => {
                    return {counter: state.counter + props.step,
                            fund_name:fund_info[0].Fund_CH_Name,//基金名字
                            fund_fld022:fund_info[0].Fund_fld022,//基金統編
                            fund_id:fund_info[0].FundID,//基金ID
                            initial:true};
                });  
            
            }
            })
        .then(()=>{this.getfilter()})
        
        
    }

    //(2) 取得會員對此基金有按過的tag的紀錄
    getfilter(){
        const url = "https://fundu.ddns.net:8090/getLike";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fundid:this.state.fund_id,
                userid:load_cookies("member_id"),
                tagid:-2,//取得該會員針對該筆基金，總共有按過哪些tag的讚
            })
            
    })
    .then((response) => {return response.json();})
    .then((jsonData) => { 
        
        //console.log(jsonData)
        if(jsonData.StatusCode==200){
            //console.log(jsonData.info)
            try{
                islike_info=JSON.parse(jsonData.info)}
            catch(e){
                //console.log("catch:還沒有按過tag讚")
                islike_info=[{"tagID": 0, "fundID": 0, "islike": 0, "tblDate": "0", "memberID": 0}]
            }
    }
    //console.log("取得會員對此基金有按過的tag的紀錄")
    //console.log(islike_info)
    

    })
    .then(()=>{this.getTagWeekRank();}) 
    }

    //(3) 將tag資料做篩選，每個row加上is_like_byuser資料
    filterlike(filter_data){
        // console.log("islike_info")
        // console.log(filter_data)
        // console.log(islike_info)
        // console.log("長度")
        // console.log(filter_data.length)
        for(var i = 0; i < filter_data.length; i++) { 
            var check=0;
            for(var j = 0;j < islike_info.length; j++){
                if(filter_data[i].tagID == islike_info[j].tagID && check==0) {
                    check=1;
                    // console.log(i)
                    // console.log(j)
                    // console.log(filter_data[i])
                    switch (islike_info[j].islike) {
                        case 0:
                            
                            filter_data[i].is_like_byuser=0;
                            break;
                        case 1:   
                            
                            filter_data[i].is_like_byuser=1;
                            break;
                        case 2:   
                               
                            filter_data[i].is_like_byuser=2;
                            break;
                        default:
                            console.log("error no record");
                            break;        
                    } 
                    break;                
                }
                else{
                    continue;
                }
                
            }
            if(check==0){filter_data[i].is_like_byuser=0;}//沒有記錄過
        }
        //console.log("將tag資料做篩選，每個row加上is_like資料")    
        //篩選過後的資料丟到
        //console.log(filter_data)
        return filter_data
        
    }

    //(4) tag本周排行(weekly like - weekly unlike)
    getTagWeekRank(){
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
        // console.log("tag本周排行")
        // console.log(jsonData)
        
    if(jsonData.StatusCode==200){
        var tag_info = [];
        for(var i = 0; i < jsonData.tag_info.length; i++){
            tag_info.push(JSON.parse(jsonData.tag_info[i]))
        }
        
        this.state.data_thisWeek=this.filterlike(tag_info);
        this.setState({data_thisWeek:this.state.data_thisWeek})

        // console.log("本周tag資料")
        // console.log(this.state.data_thisWeek)
    
    }
    else{ //statuscode=1000 >>沒有tag
    this.state.data_thisWeek=[]
    }
    })
    .then(()=>{this.getHistoryTagData()})
    }

    //(5) 歷史tag排行
    getHistoryTagData(){
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
                member_id: -1,
                tag_id:-1,
                fld022:id
        })
        
    })
    .then((response) => {return response.json();})
    .then((jsonData) => { 
    if(jsonData.StatusCode==200){
    var tag_info = [];
    for(var i = 0; i < jsonData.tag_info.length; i++){
        tag_info.push(JSON.parse(jsonData.tag_info[i]))
    }
    this.state.data_history=this.filterlike(tag_info)
    // console.log("歷史tag資料")
    // console.log(this.state.data_history)
    this.setState({data_history:this.state.data_history,flag:true})
    this.setState({selected_data:this.state.data_history})
    
    }
    else{
        this.state.data_history=[]
    }

    })
    .then(()=>{this.getNewTag()})
    }

    //(6) 展示本周新增全部的tag
    getNewTag(){
        console.log("getNewTag()")
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
                member_id: -3,
                tag_id:-3,
                fld022:id,
        })
        
    })
    .then((response) => {return response.json();})
    .then((jsonData) => { 
        
    if(jsonData.StatusCode==200){
        var tag_info = [];
        
    try{
        for(var i = 0; i < jsonData.tag_info.length; i++){
            tag_info.push(JSON.parse(jsonData.tag_info[i]))
        }
        console.log(tag_info)
        this.state.data_recently=this.filterlike(tag_info)
        this.setState({data_recently:this.state.data_recently})
    }
    
    catch (d){
        this.state.data_recently=[]
        
    }
    }
    else{
    
    this.state.data_recently=[]
    
    }

    })
    .then(()=>{this.setState({flag:true})})
    }

    //(7) input: 按的tagID及按的是倒讚還是讚 ----> 取得每個tag的按讚紀錄
    getLike(in_tagid,in_like){
        var like=0;
        var unlike=0;
        //如果按的地方是"讚"
        if(in_like==1){
            like=1;
            unlike=0
        }
        //如果按的地方是"倒讚"
        else{
            like=0;
            unlike=1
        }
        const url = "https://fundu.ddns.net:8090/getLike";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fundid:this.state.fund_id,
                userid:load_cookies("member_id"),
                tagid:in_tagid,
            })
            
    })
    .then((response) => {return response.json();})
    .then((jsonData) => { 
    if(jsonData.StatusCode==200){
        let info= [];
        try{
            info=JSON.parse(jsonData.info)
            //console.log(info[0].islike)
            //console.log(in_like)
        //開始檢查是否可以按讚
        //如果islike=0,可以按讚
        if(info[0].islike==0){
            this.Like(in_tagid,like,unlike,in_like)
            
        }
        else{
        //已有按讚紀錄，要取消按讚或按倒讚
            if(in_like==info[0].islike){
                //要取消"讚"
                if(info[0].islike==1){
                    //console.log("取消讚")
                    this.Like(in_tagid,-1,0,0)
                }
                //要取消"倒讚"
                else if(info[0].islike==2){
                    //console.log("取消倒讚")
                    this.Like(in_tagid,0,-1,0)
                }
            }
            else{
                alert("你要先取消你原本的設置，才能再按like或unlike。")
            }
        
        }}
        catch(e){
            //如果按讚紀錄為null,也是可以進行按讚的
            this.Like(in_tagid,like,unlike,in_like)
        }
        
    }

    else{
        alert("HandleLike() error")
    }
    
    
    })
    }

    //(6) 更新個人按讚紀錄的問題
    HandleLike(in_tagid,_islike){
        const url = "https://fundu.ddns.net:8090/UserLikeRecord";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fundid:this.state.fund_id,
                userid:load_cookies("member_id"),
                tagID:in_tagid,
                islike:_islike
                //(1) is_like=0 取消(目前沒有按讚或倒讚此tag)
                //(2) is_like=1 紀錄已按讚
                //(3) is_like=2 紀錄已按倒讚
                
            })
            
        })
    .then((response) => {return response.json();})
    .then((jsonData) => { 
        //console.log(jsonData)
        if(jsonData.StatusCode==200){
            console.log("HandleLike() 成功更該islike")
            //console.log(_islike)
            
        }
        else{
            console.log("HandleLike() error")
        }
    })
    .then(()=>{this.setState();window.location.reload(true);})
}

    //(7) 對TAG按讚
    Like(in_tagid,like,unlike,is_like_setting){

        //判斷是按讚還是倒讚
        const url = "https://fundu.ddns.net:8090/UpdateTag";
        fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                //取得全部fund
                like: like,
                unlike:unlike,
                tagid:in_tagid,
        })
        
    })
    .then((response) => {return response.json();})
    .then((jsonData) => { 
        if(jsonData.StatusCode==200){
            console.log("Like()sucess")
        
        }
        else{
        alert("按讚error")
        }

    })
    .then(()=>{this.HandleLike(in_tagid,is_like_setting)})
    
    }

    //(8) 處理最多只能投三票的的問題
    HandleVote(){
        let member_info=[];
        const url = "https://fundu.ddns.net:8090/check_LoginStatus";
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        userid: load_cookies("member_id"),
                        userSession:load_cookies("member_session")
                })
                
            
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            
                if(jsonData.StatusCode==200){
                
                    member_info=JSON.parse(jsonData.member_info)
                    //獲得以下資料
                    
                    if(member_info.member_vote_count>0){
                        let _vote=member_info.member_vote_count.toString() 
                        this.setState({vote_valid:0,vote_count:_vote})//票數還夠，可以投票
                        
                    }
                    else{
                        let _vote=member_info.member_vote_count.toString()
                        this.setState({vote_valid:1,vote_count:_vote})//本周票數不夠了，不能投
                        
                    }
                    let message ="投票成功，您本周還剩"+this.state.vote_count+"次投票機會"
                    this.setState({message:message})
                    
                }
            })
    }

    //(9) 投票
    Vote(in_tagid){
        const url = "https://fundu.ddns.net:8090/UpdateNewTag";
        //檢查，會設定 vote_valid = TRUE or FLASE
        if(this.state.vote_valid==0){
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        tagid:in_tagid,
                        memberid:load_cookies("member_id"),
                })
                
            })
            .then((response) => {return response.json();})
            .then((jsonData) => { 
            console.log(jsonData)
            if(jsonData.StatusCode==200){
                console.log("投票成功")
            }
            else{
            alert("投票error")
            }
            })
            .then(()=>{this.HandleVote();})
            .then(()=>{this.handleClose();this.handleClickOpen_M()})
            .then(()=>{window.location.reload(true);})
        }
        //若無法投票
        else if(this.state.vote_valid==1){
            //this.HandleVote()
            this.setState({message:"您本周投票已達三票，無法再做投票！"});
            this.handleClose()
            this.handleClickOpen_M()
        }

    }

    //(10)改變分頁
    Change_rank(selected){
        if(selected==1){
            this.setState({selected_data:this.state.data_history})
            this.setState({selected_columns:columns_history_rank})
            
        }
        else if(selected==2){
            this.setState({selected_data:this.state.data_thisWeek})
            this.setState({selected_columns:columns_week_rank})
            
        }
        else if(selected==3){
            this.setState({selected_data:this.state.data_recently})
            this.setState({selected_columns:columns_history_recent})
            
        }
    }
   
    render(){
        const {classes} = this.props;
        return(
            <div>
            {!this.state.flag ? (<LoadingIndicator></LoadingIndicator>):(
            <div className='tag-menu'>
            <Container>
            <IndexNavbar></IndexNavbar>
                <div className="tag-menu-1">
                    <Row>
                        <Col xs={12} md={7}>
                            <div>
                                <a className='tag-title' href="javascript:history.back()" style={{cursor: 'pointer'}}>{this.state.fund_name}</a>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className='button-center'>
                                <div className='button-center-1'><button className='tag-btn'  onClick={()=>this.Change_rank(1)}>歷史TAG排行</button></div>
                                <div className='button-center-1'><button className='tag-btn'  onClick={()=>this.Change_rank(2)}>本週TAG排行</button></div>
                                <div className='button-center-1'><button className='tag-btn'  onClick={()=>this.Change_rank(3)}>最新TAG排行</button></div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={classes.customTable}>
                    <Row> 
                        <div className="rank-content">
                        <MuiThemeProvider theme={THEME}>
                            <MaterialTable
                                icons={tableIcons}
                                title="TAG排行"
                                columns={this.state.selected_columns}
                                data={this.state.selected_data}
                                options={{
                                sorting: false,
                                paging: false,
                                toolbar: false,
                                headerStyle: {
                                    backgroundColor: '#004487',
                                    color: '#f6f6f6',
                                    width:120,
                                    maxWidth: 120,
                                    whiteSpace:'nowrap',
                                    position: 'sticky', 
                                    top: 0,
                                    fontSize: 17,
                                    textAlign:'center',
                                    fontFamily: '微軟正黑體',
                                    fontWeight: '800'
                                },
                                search: false,
                                minBodyHeight: 400,
                                cellStyle:{ 
                                    width:120,
                                    maxWidth:120,
                                    //whiteSpace:'nowrap',
                                    backgroundColor: '#f6f6f6',
                                    color: '#000000',
                                    textAlign:'center',
                                    fontFamily: '微軟正黑體',
                                    fontWeight: '700'
                                    
                                },
                                actionsCellStyle: {
                                    backgroundColor: '#f6f6f6'
                                },
                                maxBodyHeight: '420px',
                                actionsColumnIndex: -1,
                                }}
                                actions={[
                                    rowData =>({
                                        icon: () => (rowData.is_like_byuser==1)?<ThumbUpIcon color="secondary"/>:<ThumbUpIcon color="action"/>,
                                        
                                        tooltip: 'like',
                                        onClick: (event, rowData) => {
                                            
                                            this.getLike(rowData.tagID,1)
                                        }
                                    }),
                                    rowData =>({
                                        icon: () => (rowData.is_like_byuser==2)?<ThumbDownIcon color="primary"/>:<ThumbDownIcon color="action"/>,
                                        tooltip: 'unlike',
                                        onClick: (event, rowData) => {
                                            
                                            this.getLike(rowData.tagID,2)
                                        }
                                    }),
                                ]}
                                localization={{ 
                                    body:{ emptyDataSourceMessage:<h4 style={{marginTop:'6%', position:'absolute', top:'16%', textAlign:'center',color: '#004487'}}>尚無TAG資料...</h4> },
                                    header: {
                                        actions: ''
                                    }
                                }}
                            />
                            </MuiThemeProvider>
                            </div>
                    
                    
                    
                </Row>
                </div>
            
            </Container>
            </div>
        )}</div>
        );
    }
}
Tag.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Tag);
//export default Tag;