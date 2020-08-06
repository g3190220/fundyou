import React from 'react';
// import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'reactstrap';
import PersonalizeMenu from "views/PersonalizePage/PersonalizeMenu.js";

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
  {title: 'TAG名稱', field: 'tagContent' },
  {title: '累積投票數', field: 'Vote' },
  {title: '創建時間',field: 'Create_Date'},

];

const column_history=[
  {title: '基金統編', field: 'fld022'},
  {title: 'TAG名稱', field: 'tagContent' },
  {title: '累積投票數', field: 'History_like' },
  {title: '創建時間',field: 'Create_Date'},

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
      this.getNewTagData();
      
    }

  //本周新增的tag顯示
  getNewTagData(){
        
        const url = "http://140.115.87.192:8090/getNewTag";
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
        this.state.data_thisWeek=tag_info
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
  DeleteTag(in_tagid){
    
    let tag_info=[];
        const url = "http://140.115.87.192:8090/DeleteNewTag";
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
          })
          
    })
  .then((response) => {return response.json();})
  .then((jsonData) => { 
    //console.log(jsonData);
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
        
    const url = "http://140.115.87.192:8090/getTag";
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
    this.state.data_history=tag_info
    this.setState({data_history:this.state.data_history,flag:true})
    console.log(this.state.data_history)
  }
  
  catch (d){
    this.state.data_history=[]
    alert("近來歷史")
  }
  
}
else{
  alert("error")
}
  })}


    
  render(){
    return(
    <div className="page-header" style={{backgroundColor: '#ffcdb2',}}>
    <Container>
    <div className="card-personalize-mytag">

    <PersonalizeMenu></PersonalizeMenu>

      <div className="card-personalize5">
        <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>我的TAG</b></font></h4>

        <div className="week-new-tag-title">
          <span style={{fontWeight:"bold"}}>本週新增TAG</span>
        </div>

            <div>
            <MuiThemeProvider theme={THEME}>
            <MaterialTable
            icons={tableIcons}
            title="本週新增TAG"
            columns={column_week}
            data={this.state.data_thisWeek} 
            //onChangePage={()=>this.scroll}       
            
            options={{
              sorting: true,
              headerStyle: {
                backgroundColor: '#e26d5c',
                color: '#F8EDEB',
                width:150,
                maxWidth: 150,
                whiteSpace:'nowrap',
                position: 'sticky', 
                top: 0,
                fontSize: 17,
                textAlign:'left',
                fontWeight: 'bold',
              },
              toolbar: false,
          
              cellStyle:{ 
                width:150,
                maxWidth:150,
                //whiteSpace:'nowrap',
                backgroundColor: '#F8EDEB',
                color: '#e26d5c',
                textAlign:'left',
                
              },
              actionsCellStyle: {
                backgroundColor: '#e26d5c'
              },
              maxBodyHeight: '420px'
            }}
            actions={[
              { 
                
                //hidden:true,
                icon: () => <DeleteOutline />,
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                  this.handleClickOpen()
                  this.setState({
                    in_tagid: rowData.tagID
                  });
                 

                },
                
               
              }    
            ]}
            localization={{
                header: {
                  actions: ''
              }
            }}
          />
          </MuiThemeProvider>
          </div>

        <div className="history-new-tag-title">
          <span style={{fontWeight:"bold"}}>歷史新增TAG</span>
        </div>

        <div>
            <MuiThemeProvider theme={THEME}>
            <MaterialTable
            icons={tableIcons}
            title="歷史新增TAG"
            columns={column_history}
            data={this.state.data_history} 
            //onChangePage={()=>this.scroll}       
            
            options={{
              sorting: true,
              headerStyle: {
                backgroundColor: '#e26d5c',
                color: '#F8EDEB',
                width:150,
                maxWidth: 150,
                whiteSpace:'nowrap',
                position: 'sticky', 
                top: 0,
                fontSize: 17,
                textAlign:'center',
                fontWeight: 'bold',
              },
              toolbar: false,
          
              cellStyle:{ 
                width:150,
                maxWidth:150,
                backgroundColor: '#F8EDEB',
                color: '#e26d5c',
                textAlign:'center',
                
              },

              actionsCellStyle: {
                backgroundColor: '#e26d5c',
              },
              maxBodyHeight: '420px',
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
          <Button onClick={() => this.DeleteTag(this.state.in_tagid)} color="primary" >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
          </div>

      </div>
    </div> 
    </Container>

    </div>
    
    );
    }
    
    }

    export default PageMyTag;