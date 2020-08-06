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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


//處理訊息框


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
const columns_vote=
[
    {title: 'TAG', field: 'tagContent' },
    {title: '總投票數',field: 'Vote'},
    {title: '建立時間',field: 'Create_Date'},
    
];



                    

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
        //新增TAG
        this.handleSubmit = this.handleSubmit.bind(this);
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
        
        
        this.state = {
          errors: {},
          needFixed: false,
          open:false,
          data_thisWeek:[],
          data_history:[],
          data_allthisWeek:[],
      }
    
    }
    componentDidMount() {
        //跳到頁首
        window.scrollTo(0, 0)
        this.getFundName();
    }
    //處理對話框方法
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

    //處理訊息框方法
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

    //新增tag
    handleSubmit(){
        let errors = {}; 
        //取消DOM的預設功能
        window.event.preventDefault();
        if(!isEmpty(this.state.new_tag)){
        let fund_id = (this.props.match.params.fundid.split('='))[1];
        this.setState({fund_id: this.state.in_fund_id});
        const url = "http://140.115.87.192:8090/GenerateNewTag";////////改url
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        member_id: load_cookies("member_id"),
                        fld_022: fund_id,
                        content:this.state.new_tag,
                
                
                })
                
            
            })
        .then((response) => {return response.json();})
        .then((jsonData) => {
            //新增成功
            if(jsonData.StatusCode==200){
            alert("新增成功")
            //重新整理畫面
            //刷新頁面
            this.setState();
            window.location.reload(true);

            }
            else{
            alert("handleSubmit_error")}
            
        })}
        else {
            errors["tag_new_is_errors"] = true;
            errors["tag_new"]="TAG內容不能為空白"
        }
        this.setState({errors: errors});
    }

    handleChange = name => event =>{
        this.setState({
          [name]: event.target.value,
    })}

 //(1) 顯示基金名字
 getFundName(){
    //取得基金資料
    let fund_info=[];
    let id = (this.props.match.params.fundid.split('='))[1];
    const url = "http://140.115.87.192:8090/getFundInfo";////////改url
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
    this.getTagWeekRank();
 }

 //處理是否按讚過的資料
 filterlike(data){
     this.state.filter_getTagWeekRank=data
 }

 //(2) tag本周排行(weekly like - weekly unlike)
getTagWeekRank(){
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
    var tag_info = [];
    
  try{
    for(var i = 0; i < jsonData.tag_info.length; i++){
        tag_info.push(JSON.parse(jsonData.tag_info[i]))
    }
    
    this.state.data_thisWeek=tag_info
    this.setState({data_thisWeek:this.state.data_thisWeek})
    
  }
  
  catch (d){
    this.state.data_thisWeek=[]
    alert("catch")
    
  }
  
}
else{ //statuscode=1000 >>沒有tag
  this.state.data_thisWeek=[]
  //alert("statuscode=1000")
  
}
this.getHistoryTagData()
});
}

//(3) 歷史tag排行
getHistoryTagData(){
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
            member_id: -1,
            tag_id:-1,
            fld022:id
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
    this.state.data_history=tag_info
    this.setState({data_history:this.state.data_history,flag:true})
    
  }
  
  catch (d){
    this.state.data_history=[]
    alert("catch")
  }
  
}
else{
    this.state.data_history=[]
}
this.getNewTag()
})}

//(4) 展示本周新增全部的tag
getNewTag(){
    let id = (this.props.match.params.fundid.split('='))[1];
    const url = "http://140.115.87.192:8090/getNewTag";
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
    var tag_info = [];
    
  try{
    tag_info=JSON.parse(jsonData.Newtag_info)
    this.state.data_allthisWeek=tag_info
    this.setState({data_allthisWeek:this.state.data_allthisWeek})
  }
  
  catch (d){
    this.state.data_allthisWeek=[]
    
  }
}
else{
  
  this.state.data_allthisWeek=[]
  
}
this.HandleVote();
})
}

//(5) 取得按讚紀錄
getLike(in_tableid,in_tagid,in_like){
    var like=0;
    var unlike=0;
    //如果按的地方是"讚"
    if(in_like==1){
        like=1;
        unlike=0
    }
    else{
        like=0;
        unlike=1
    }
    const url = "http://140.115.87.192:8090/getLike";
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
        console.log(info[0].islike)
        console.log(in_like)
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
                alert("取消讚")
                this.Like(in_tagid,-1,0,0)
            }
            //要取消"倒讚"
            else if(info[0].islike==2){
                alert("取消倒讚")
                this.Like(in_tagid,0,-1,0)
            }
        }
        else{
            alert("你要先取消你原本的設置，才能再按like或unlike。")
        }
    
    }}
    catch(e){
        //如果data是null,也是可以進行按讚的
        this.Like(in_tagid,like,unlike,in_like)
    }
    
  }

  else{
    alert("HandleLike() error")
  }
  
  
  })
}

//(6) 處理按讚紀錄的問題
HandleLike(in_tagid,_islike){
    
    const url = "http://140.115.87.192:8090/UserLikeRecord";
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
  if(jsonData.StatusCode==200){
    alert("HandleLike() 成功")
      
  }
  else{
    alert("HandleLike() error")
  }
  })}

//(7) 按讚
Like(in_tagid,like,unlike,is_like_setting){

    //判斷是按讚還是倒讚
    const url = "http://140.115.87.192:8090/UpdateTag";
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
    //紀錄按讚狀況
    this.HandleLike(in_tagid,is_like_setting)
    alert("Like()sucess")
   
}
else{
  alert("按讚error")
}

})
.then(()=>{this.setState();window.location.reload(true);})
}

//(8) 處理最多只能投三票的的問題
HandleVote(){
    let member_info=[];
    const url = "http://140.115.87.192:8090/check_LoginStatus";
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
    const url = "http://140.115.87.192:8090/UpdateNewTag";
    let member_id = load_cookies("member_id");
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
        if(jsonData.StatusCode==200){
            this.HandleVote();
            
            this.handleClose();
            this.handleClickOpen_M()
            //重新整理畫面，刷新頁面
            setTimeout(() =>{
                window.location.reload(true);
            },2500)
            
        }
        else{
        alert("投票error")
        }})
    }
    //若無法投票
    else if(this.state.vote_valid==1){
        //this.HandleVote()
        this.setState({message:"您本周投票已達三票，無法再做投票！"});
        this.handleClose()
        this.handleClickOpen_M()
    }

}



    render(){

        return(
            <div className='tag-menu'>
            <Container>
            <IndexNavbar></IndexNavbar>
            <Row>
                <label className='tag-title'>{this.state.fund_name}</label>
            </Row>
            <Row>
                <Col>
                <div className="rank-header">
                    <span>TAG歷史排行</span>
                </div>
                
                <div className="rank-content">
                        <MuiThemeProvider theme={THEME}>
                            <MaterialTable
                            icons={tableIcons}
                            title="TAG歷史排行"
                            columns={columns_history_rank}
                            data={this.state.data_history}                         
                            options={{
                            
                            paging: false,
                            toolbar: false,
                            headerStyle: {
                                backgroundColor: '#e26d5c',
                                color: '#F8EDEB',
                                width:500,
                                maxWidth: 500,
                                whiteSpace:'nowrap',
                                position: 'sticky', 
                                top: 0,
                                fontSize: 17,
                                textAlign:'center',
                                fontWeight: 'bold',
                            },
                            search: false,
                            minBodyHeight: 500,
                            cellStyle:{ 
                                width:500,
                                maxWidth:500,
                                textAlign:'center',
                                backgroundColor: '#F8EDEB',
                                color: '#e26d5c',
                                
                            },
                            actionsCellStyle: {
                                backgroundColor: '#F8EDEB'
                            },
                            maxBodyHeight: 600,
                            actionsColumnIndex: -1,
                            }}
                            actions={[
                                {
                                    icon: () => <ThumbUpIcon color="action"/>,
                                    tooltip: 'like',
                                    onClick: (event, rowData) => {
                
                                        this.getLike(rowData.tableData.id,rowData.tagID,1)

                                        
                                    }
                                  },
                                  {
                                      icon: () => <ThumbDownIcon color="action"/>,
                                      tooltip: 'unlike',
                                      onClick: (event, rowData) => {
                                    
                                        this.getLike(rowData.tableData.id,rowData.tagID,2)

                                        
                                    }
                                    },
                              ]}
                            localization={{ 
                                body:{ emptyDataSourceMessage:<h4 style={{marginTop:'6%', position:'absolute', top:'16%', textAlign:'center',color: '#e26d5c'}}>還沒有人新增TAG...</h4> },
                                header: {
                                    actions: ''
                                }
                            }}
                        />
                        </MuiThemeProvider>
                    </div>
                </Col>
                <Col>
                    <div className="rank-header">
                        <span>TAG本週即時排行</span>
                    </div>
                    
                    <div className="rank-content">
                    <MuiThemeProvider theme={THEME}>
                        <MaterialTable
                            icons={tableIcons}
                            title="TAG本週即時排行"
                            columns={columns_week_rank}
                            data={this.state.data_thisWeek}
                            options={{
                            sorting: false,
                            paging: false,
                            toolbar: false,
                            headerStyle: {
                                backgroundColor: '#e26d5c',
                                color: '#F8EDEB',
                                width:500,
                                maxWidth: 500,
                                whiteSpace:'nowrap',
                                position: 'sticky', 
                                top: 0,
                                fontSize: 17,
                                textAlign:'center',
                                fontWeight: 'bold',
                            },
                            search: false,
                            minBodyHeight: 500,
                            cellStyle:{ 
                                width:500,
                                maxWidth:500,
                                //whiteSpace:'nowrap',
                                backgroundColor: '#F8EDEB',
                                color: '#e26d5c',
                                textAlign:'center',
                                
                            },
                            actionsCellStyle: {
                                backgroundColor: '#F8EDEB'
                            },
                            maxBodyHeight: 600,
                            actionsColumnIndex: -1,
                            }}
                            actions={[
                                {
                                    icon: () => <ThumbUpIcon color="action"/>,
                                    //icon: (event, rowData) => {(event, rowData)=>{(rowData.tagID>1)?<ThumbUpIcon color="action"/>:<ThumbUpIcon color="primary"/>}},
                                    tooltip: 'like',
                                    onClick: (event, rowData) => {
                                        this.getLike(rowData.tableData.id,rowData.tagID,1)
                                    }
                                },
                                  {
                                      icon: () => <ThumbDownIcon color="action"/>,
                                      tooltip: 'unlike',
                                      onClick: (event, rowData) => {
                                        this.getLike(rowData.tableData.id,rowData.tagID,2)
                                    }
                                    },
                              ]}
                            localization={{ 
                                body:{ emptyDataSourceMessage:<h4 style={{marginTop:'6%', position:'absolute', top:'16%', textAlign:'center',color: '#e26d5c'}}>還沒有人新增TAG...</h4> },
                                header: {
                                    actions: ''
                                }
                            }}
                        />
                        </MuiThemeProvider>
                        </div>
                </Col>
            </Row>
            <Row>
            <TextField
                id="new_tag"
                label="新增TAG"
                margin="normal"
                onChange={this.handleChange('new_tag')}
                variant="outlined"
                fullWidth
                className='margin'    
                //color="secondary"  
                required    
                error={this.state.errors["tag_new_is_errors"]}
                helperText={this.state.errors["tag_new"]}  
                inputProps={{
                    maxLength: 8,
                  }}                                          
              />      
            <button className='new-tag-btn' onClick={this.handleSubmit}>submit</button>
            </Row>
            <Row>
            <div className="rank-header">
                <span>本周新增TAG 投票區</span>
            </div>
            </Row>
            <Row>   
            <div className="rank-vote-content">
                <MuiThemeProvider theme={THEME}>
                    <MaterialTable
                            icons={tableIcons}
                            title="本周新增TAG 投票區"
                            columns={columns_vote}
                            data={this.state.data_allthisWeek} 
                                 
                            options={{
                            toolbar: false,
                            headerStyle: {
                                backgroundColor: '#e26d5c',
                                color: '#F8EDEB',
                                width:500,
                                maxWidth: 500,
                                whiteSpace:'nowrap',
                                position: 'sticky', 
                                top: 0,
                                fontSize: 17,
                                textAlign:'center',
                                fontWeight: 'bold',
                            },
                            search: false,
                            minBodyHeight: 500,
                            cellStyle:{ 
                                width:500,
                                maxWidth:500,
                                textAlign:'center',
                                backgroundColor: '#F8EDEB',
                                color: '#e26d5c',
                                
                            },
                            actionsCellStyle: {
                                backgroundColor: '#F8EDEB'
                            },
                            maxBodyHeight: 600,
                            actionsColumnIndex: -1,
                            }}
                            actions={[
                                {
                                    icon: () => <HowToVoteIcon color="action"/>,
                                    tooltip: 'vote',
                                    onClick: (event, rowData) => {
                                        this.handleClickOpen()
                                        this.setState({
                                            in_vote_id: rowData.tagID
                                        });
                                        
                                    }
                                  },
                              ]}
                            localization={{ 
                                body:{ emptyDataSourceMessage:<h4 style={{marginTop:'6%', position:'absolute', top:'16%', textAlign:'center',color: '#e26d5c'}}>還沒有人新增TAG...</h4> },
                                header: {
                                    actions: ''
                                }
                            }}
                />
                </MuiThemeProvider>
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
                        Are you sure to vote the tag?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                            No
                    </Button>
                    <Button onClick={() => this.Vote(this.state.in_vote_id)} color="primary" >
                            Yes
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.open_M}
                    keepMounted
                    onClose={this.handleClose_M}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                        <DialogTitle id="alert-dialog-slide-title">{"Message"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.message}
                        </DialogContentText>
                        </DialogContent>
                </Dialog>
                
            </div> 
            </Row>
            </Container>
            </div>
        );
    }
}
export default Tag;