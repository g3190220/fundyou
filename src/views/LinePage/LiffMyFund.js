import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'reactstrap';
import MaterialTable from 'material-table'; //基金表格

import isEmpty from 'views/Function/isEmpty.js'


import 'react-multi-carousel/lib/styles.css';

//覆寫CSS
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { forwardRef } from 'react';

//基金Table套件
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
import SearchIcon from '@material-ui/icons/Search';
import NotesIcon from '@material-ui/icons/Notes';
//備忘錄套件
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BorderColorIcon from '@material-ui/icons/BorderColor';
//liff套件
import liff from '@line/liff';

var liff_userid="";
var member_id="";


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


  
class LiffMyFund extends React.Component{
    state = {
    }
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTrackData = this.getTrackData.bind(this);
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.CreateMemo=this.CreateMemo.bind(this);
        this.getMemo=this.getMemo.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.getLiffid = this.getLiffid.bind(this);
        this.ChangeLiffid=this.ChangeLiffid.bind(this);


        console.log(props)
        this.state = {
          //fields: {},
            open:false,
            // setOpen:false,
            errors: {},
            all_data:[],
            // original_content:"您尚未新增備忘錄",
            flag:false,
            filter_content:false,
            columns:[
            {title: '基金統編', field: 'fund_fld022_track' },
            {title: '基金名稱', field: 'Fund_CH_Name' },
            {title: '最新淨值',field: 'History_NetWorth'},
            {title: '漲跌(%)',field: 'Ups_and_Downs'},
            {title: '三個月報酬(%)',field: 'History_ROI_3M'},
            {title: '追蹤日期',field: 'fund_track_date'},
            ],
            fld022: "",
            name: "",
            currency:"",
            zone: "",
            agent: "",
            fundtype: "",
            roi3M: "",
            RR: "",
      }
      
    }

    //處理setState的方法
    handleChange = name => event =>{
      console.log("enter_chanfe")
      this.setState({
        [name]: event.target.value,
    })}

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
  
    componentDidMount() {
      window.scrollTo(0, 0);  //頁面置頂
      this.getLiffid()
      
    }

    getTrackData(){  //取得追蹤基金
      const url = "https://fundu.ddns.net:8090/getTrack";
      fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userid: member_id,
              fld022: "all",
          })
      })
      .then((response) => {return response.json();})
      .then((jsonData) => { 
        console.log(jsonData)
        if(jsonData.StatusCode==200){
          try{
              var track_info=[];
              var info=[]
              track_info=JSON.parse(jsonData.info)
              // for(var i = 0; i < jsonData.info.length; i++){
              //     track_info.push(JSON.parse(jsonData.info[i]))
              //   }
              // }
              console.log(track_info[0].track)
              for(var i = 0; i < track_info.length; i++){
                console.log(track_info[i])
                if(track_info[i].track==1){
                  console.log(track_info[i])
                  info.push(track_info[i])
                }
              }
              console.log(info)
              this.state.all_data=info
              this.setState({all_data:this.state.all_data,flag:true})
              console.log(this.state.all_data)
          }
          catch(e){
              this.state.all_data=[]
          }
      }
        else{
          this.state.all_data=[]
        }
      })
      .then(()=>{
        //獲取liff id
        this.getLiffid()
      })

    }
      

    scroll(){
      alert("scroll")
    }

    //點擊去頁面
    handleSubmit(){
      this.props.history.push("/personal-data-page")
    }


    CreateMemo(){
      const url = "https://fundu.ddns.net:8090/Memo";
      fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: this.state.new_content,
            userid: member_id,
            fld022: this.state.fund_fld022_track,
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
            userid: member_id,
            fld022: fld022,
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
      .then(()=>{this.handleClickOpen()})
    }


  //獲取liff id
  getLiffid(){
    let liff_userid;
    liff.init({
      liffId: "1654887866-W1p36BZ4" // Use own liffId
    })
    .then(() => {
      if (liff.isLoggedIn()) {
          liff.getProfile()
          .then(profile => {
            const userId = profile.userId
            //取得liff_userid;
            liff_userid=userId;
          })
          .then(()=>{this.setState({liff_userid:liff_userid,flag:true})})
          .then(()=>{
           //獲取liff id
           console.log("getLiffid()後")
           console.log(this.state.liff_userid)
            this.ChangeLiffid()
           })
        }
      else{
        alert("取得失敗")
      }
    })
    
  }
  //檢查Liff有無連接，並回傳userid
  ChangeLiffid(){
    let member_info=[];
    const url = "https://fundu.ddns.net:8090/LineLogin";////////改url
    //console.log(data)
    fetch(url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    //取得全部fund
                    lineid: this.state.liff_userid,
              })
              
        })
        .then((response) => {return response.json();})
        .then((jsonData) => { 
          //console.log(jsonData)
          if(jsonData.StatusCode==200){
            member_info=JSON.parse(jsonData.member_info)
            //取得系統id了
            member_id=member_info.member_id
            //alert(this.state.member_id)
            console.log(member_id)
            
            
          }
          else{
            alert("您尚未與系統連結，無法使用此功能。請先登入！")
            liff.closeWindow();
          
          }
        })
        .then(()=>{this.getTrackData()})

  }



    
    
    render(){
      const {classes} = this.props;
      
    return(
    <div className="card-personalize-myfund">
    <Container>
    <Row>
        <div className="card-personalize1">
            <div className="card-personalize1-title">追蹤基金</div>
        <div className="following-funds-table">
        <div className={classes.customTable}>
                <MaterialTable
                icons={tableIcons}
                title=""
                columns={this.state.columns}
                data={this.state.all_data}
                //onChangePage={()=>this.scroll}       
                
                options={{
                sorting: true,
                headerStyle: {
                    backgroundColor: '#004487',
                    color: '#f6f6f6',
                    width: 140,
                    maxWidth: 140,
                    whiteSpace:'nowrap',
                    position: 'sticky', 
                    top: 0,
                    padding: 10 ,
                    fontFamily: '微軟正黑體',
                    fontWeight: '800',
                    fontSize: 16
                },

                // toolbar: false, //隱藏標題和搜尋欄

                cellStyle:{ 
                    width: 140,
                    maxWidth: 140,
                    wordWrap:'break-word',
                    backgroundColor: '#f6f6f6',
                    color: '#000000',
                    fontFamily: '微軟正黑體',
                    fontWeight: '700',
                    fontSize: 15,
                    padding: 10
                },
                actionsCellStyle: {
                    backgroundColor: '#f6f6f6',
                },
                maxBodyHeight: '360px',
                actionsColumnIndex: 0,
                
                }}
                actions={[
                  { 
                    //hidden:true,
                    icon: () => <SearchIcon color="action" />,
                    tooltip: 'SEEFUND',
                    onClick: (event, rowData) =>  this.props.history.push({
                      pathname: '/detailfund-page/fundid='+rowData.fund_fld022_track,
                    })
                  },
                  {
                    icon: () => <BorderColorIcon color="action" />,
                    tooltip: 'MEMO' ,
                    onClick: (event, rowData) => {
                      this.getMemo(rowData.fund_fld022_track,rowData.Fund_CH_Name)
                    },
                     
                  },    
                ]}
                
                localization={{
                    header: {
                    actions: ''
                }
                }}
                />
                  <div className="memo_content">
                  <Dialog 
                    open={this.state.open} 
                    keepMounted
                    onClose={this.handleClose} 
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'xs'}
                    classes={{root: classes.customDialog}}
                   >
                     
                    <DialogTitle 
                      id="form-dialog-title" 
                      classes={{root: classes.customDialogTitle}}
                    >
                      <BorderColorIcon></BorderColorIcon>{this.state.chname}
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
                      <Button onClick={this.handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={this.CreateMemo} color="primary">
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                  </div>
              </div>
                  
            </div>
      </div>
    </Row>
    </Container>
  </div> 
   
    
    );
    }
    }

    LiffMyFund.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    export default withStyles(styles)(LiffMyFund);
    //export default PageMyFund;