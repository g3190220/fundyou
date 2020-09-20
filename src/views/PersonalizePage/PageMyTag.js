import React from 'react';
// import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'reactstrap';
import PersonalizeMenu from "views/PersonalizePage/PersonalizePage.js";

import { makeStyles } from '@material-ui/core/styles';
import 'react-multi-carousel/lib/styles.css';

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
import SearchIcon from '@material-ui/icons/Search';


//替代style
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//import cookies
import { load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies

//功能
import isEmpty from 'views/Function/isEmpty.js';

//處理對話框
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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


const column_week=[
  {title: '基金統編', field: 'fld022'},
  {title: '基金名稱', field: 'Fund_CH_Name' },
  {title: 'TAG名稱', field: 'tagContent' },
  {title: '累積投票數', field: 'Vote' },
  {title: '創建時間',field: 'Create_Date'},

];

const column_history=[
  {title: '基金統編', field: 'fld022'},
  // {title: '基金名稱', field: 'Fund_CH_Name' },
  {title: 'TAG名稱', field: 'tagContent' },
  // {title: '累積讚數', field: 'History_like' },
  // {title: '累積倒讚數', field: 'History_unlike' },
  {title: '創建日期',field: 'Create_Date'},

];

class PageMyTag extends React.Component{
    state = {
    }
    constructor(props) {
        super(props);
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.getNewTagData=this.getNewTagData.bind(this);
        this.getHistoryTagData=this.getHistoryTagData.bind(this);
        this.DeleteTag=this.DeleteTag.bind(this);
        this.all_fund_data=this.all_fund_data.bind(this);

        this.state = {
          //fields: {},
          errors: {},
          data_thisWeek:[],
          data_history:[],
          open:false,
          in_tagid:0,
    
    }}
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

    componentDidMount(){
      window.scrollTo(0, 0);  //頁面置頂
      this.getNewTagData();
      
    }

  //本周新增的tag顯示
  getNewTagData(){       
        const url = "https://fundu.ddns.net:8090/getNewTag";
        fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
                //取得全部fund
                member_id: load_cookies("member_id"),
                tag_id:-1,
                fld022:-1
          })
          
    })
  .then((response) => {return response.json();})
  .then((jsonData) => { 
    if(jsonData.StatusCode==200){
      var tag_info = [];
      try{
        tag_info=JSON.parse(jsonData.Newtag_info)
        console.log(jsonData);
        this.state.data_thisWeek=this.all_fund_data(tag_info)
        this.setState({data_thisWeek:this.state.data_thisWeek})
        //console.log(this.state.data_thisWeek)
        this.getHistoryTagData();
      }
      
      catch (d){
        this.state.data_thisWeek=[]
        this.getHistoryTagData();
        
      }
      
  }
    else{
      //console.log(jsonData)
      alert("error")
    }
  })}

  //本周tag刪除
  DeleteTag(in_tagid,in_fld022){
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
    if(jsonData.StatusCode==200){
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
  })}

  //歷史新增tag顯示
  getHistoryTagData(){
        
    const url = "https://fundu.ddns.net:8090/getTag";
    fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            //取得全部fund
            member_id: load_cookies("member_id"),
            tag_id:-1,
            fld022:-2
      })
      
})
.then((response) => {return response.json();})
.then((jsonData) => { 
if(jsonData.StatusCode==200){
  var tag_info = [];
  console.log(jsonData);
  try{
    
  tag_info=JSON.parse(jsonData.tag_info)
  
    console.log(tag_info);
    this.state.data_history=this.all_fund_data(tag_info)
    this.setState({data_history:this.state.data_history,flag:true})
    console.log(this.state.data_history)
  }
  
  catch (d){
    this.state.data_history=[]
    //alert("近來歷史")
  }
  
}
else{
  alert("error")
}
  })}

  //轉變FUND 資料
  all_fund_data(fund_info){
    console.log("all_fund_data")
    console.log(fund_info)
    let fund_info_href=[]
    for(var i=0;i<Object.keys(fund_info).length;i++){
            fund_info_href.push(
              {
                'fld022':<a style={{color:'black',fontWeight:'500'}} href={'/detailfund-page/fundid=' + fund_info[i].fld022}>{fund_info[i].fld022}</a>,
                'tagContent':fund_info[i].tagContent,
                'Create_Date':fund_info[i].Create_Date
      
                });
            };
        console.log(fund_info_href)
        return fund_info_href
  }
 
  render(){
    return(
    <div className="card-personalize-myfund">
    <PersonalizeMenu></PersonalizeMenu>
    <Container>
    <Row>
      <div className="card-personalize1">
            <div className="card-personalize1-title">我的TAG</div>
      <div className="following-funds-table">
        
            <MuiThemeProvider theme={THEME}>
            <MaterialTable
            icons={tableIcons}
            title=""
            columns={column_history}
            data={this.state.data_history}
            options={{
              sorting: true,
              headerStyle: {
                backgroundColor: '#004487',
                color: '#f6f6f6',
                width:200,
                maxWidth: 200,
                whiteSpace:'nowrap',
                position: 'sticky', 
                top: 0,
                padding: 10,
                fontSize: 16,
                textAlign:'center',
                fontFamily: '微軟正黑體',
                fontWeight: '800'
              },
          
              cellStyle:{ 
                width:200,
                maxWidth:200,
                backgroundColor: '#f6f6f6',
                color: '#000000',
                textAlign:'center',
                fontFamily: '微軟正黑體',
                fontWeight: '700',
                fontSize: 15,
                padding: 10,
                
              },
              actionsCellStyle: {
                backgroundColor: '#f6f6f6'
              },
              maxBodyHeight: '360px'
            }}
            actions={[
              // {
              //   icon: () => <SearchIcon color="action" />,
              //   tooltip: 'SEEFUND',
              //   onClick: (event, rowData) =>  this.props.history.push({
              //     pathname: '/detailfund-page/fundid='+rowData.fld022,
              //   })

              // },

              { 
                
                //hidden:true,
                icon: () => <DeleteOutline color="action"/>,
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                  this.handleClickOpen()
                  this.setState({
                    in_tagid: rowData.tagID,
                    _fld022:rowData.fld022
                  });
                 

                },
                
               
              },
            ]}
            localization={{
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
          Are you sure to delete the tag?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No
          </Button>
          <Button onClick={() => this.DeleteTag(this.state.in_tagid,this.state._fld022)} color="primary" >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
          </div>
      </div>
    
    </Row>
    </Container>

    </div>
    
    );
    }
    
    }

    export default PageMyTag;