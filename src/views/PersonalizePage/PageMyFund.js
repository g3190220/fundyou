import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'reactstrap';
import PersonalizeMenu from "views/PersonalizePage/PersonalizeMenu.js"; //左側選單
import MaterialTable from 'material-table'; //基金表格
import { load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies

import 'react-multi-carousel/lib/styles.css';

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
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotesIcon from '@material-ui/icons/Notes';


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

class PageMyFund extends React.Component{
    state = {
    }
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTrackData = this.getTrackData.bind(this);

        console.log(props)
        this.state = {
          //fields: {},
            errors: {},
            all_data:[],
            flag:false,
            filter_content:false,
            columns:[
            {title: '基金統編', field: 'fund_fld022_track' },
            {title: '基金名稱', field: 'Fund_CH_Name' },
            {title: '最新淨值',field: 'History_NetWorth'},
            {title: '漲跌(%)',field: 'Ups_and_Downs'},
            {title: '三個月報酬(%)',field: 'History_ROI_3M'},
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
  
    componentDidMount() {
      window.scrollTo(0, 0);  //頁面置頂
      this.getTrackData();
    }

    getTrackData(){  //取得追蹤基金
      const url = "http://140.115.87.192:8090/getTrack";
      fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userid: load_cookies("member_id"),
              fld022: "all",
          })
      })
      .then((response) => {return response.json();})
      .then((jsonData) => { 
        console.log(jsonData)
        if(jsonData.StatusCode==200){
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
        else{
          this.state.all_data=[]
        }
      })
    }
      

    scroll(){
      alert("scroll")
    }

    //點擊去頁面
    handleSubmit(){
      this.props.history.push("/personal-data-page")
    }
    
    render(){
    
    return(
    <div className="page-header" style={{backgroundColor: '#ffcdb2',}}>
    <Container>
    <div className="card-personalize-myfund">

    <PersonalizeMenu></PersonalizeMenu>
      <Row>
        <div className="card-personalize1">
            <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>我的基金</b></font></h4>

          
          <div className="fund-follows">
                <span style={{fontWeight:"bold"}}>追蹤基金</span>
            </div><br/>

        <Row>
            <div className="following-funds-table">
                <MaterialTable
                icons={tableIcons}
                title="Following Funds"
                columns={this.state.columns}
                data={this.state.all_data}
                //onChangePage={()=>this.scroll}       
                
                options={{
                sorting: true,
                headerStyle: {
                    backgroundColor: '#e26d5c',
                    color: '#F8EDEB',
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

                toolbar: false, //隱藏標題和搜尋欄

                cellStyle:{ 
                    width: 140,
                    maxWidth: 140,
                    wordWrap:'break-word',
                    backgroundColor: '#F8EDEB',
                    color: '#e26d5c',
                    fontFamily: '微軟正黑體',
                    fontWeight: '700',
                    fontSize: 15,
                    padding: 10
                },
                actionsCellStyle: {
                    backgroundColor: '#F8EDEB',
                },
                maxBodyHeight: '420px',
                actionsColumnIndex: 0,
                
                }}
                actions={[
                  {
                    icon: () => <FavoriteIcon color="disabled" />,
                    tooltip: 'FAVORITE',
                    
                    onClick: (event, rowData) =>  this.props.history.push({
                
                    // pathname: '/detailfund-page/fundid='+rowData.Fund_fld022,
                    
                    })
                  },
                  { 
                    //hidden:true,
                    icon: () => <SearchIcon color="action" />,
                    tooltip: 'SEEFUND',
                    onClick: (event, rowData) =>  this.props.history.push({
                      pathname: '/detailfund-page/fundid='+rowData.fund_fld022_track,
                    })
                  },
                  {
                    icon: () => <NotesIcon color="action" />,
                    tooltip: 'MEMO' ,

                  },    
                ]}
                
                localization={{
                    header: {
                    actions: ''
                }
                }}
                />
            </div>
          </Row>
            
          <Row>
          <div className="fund-favorite">
                <span style={{fontWeight:"bold"}}>最愛基金</span>
            </div><br/>

            <div className="favorite-funds-table">
                <MaterialTable
                icons={tableIcons}
                title="Favorite Funds"
                columns={this.state.columns}
                data={this.state.all_data}
                //onChangePage={()=>this.scroll}       
                
                options={{
                sorting: true,
                headerStyle: {
                    backgroundColor: '#e26d5c',
                    color: '#F8EDEB',
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

                toolbar: false, //隱藏標題和搜尋欄

                cellStyle:{ 
                    width: 140,
                    maxWidth: 140,
                    wordWrap:'break-word',
                    backgroundColor: '#F8EDEB',
                    color: '#e26d5c',
                    fontFamily: '微軟正黑體',
                    fontWeight: '700',
                    fontSize: 15,
                    padding: 10
                },
                actionsCellStyle: {
                    backgroundColor: '#F8EDEB',
                },
                maxBodyHeight: '420px',
                actionsColumnIndex: 0,
                
                }}
                actions={[
                  {
                    icon: () => <FavoriteIcon color="action" />,
                    tooltip: 'FAVORITE',
                    
                    // onClick: (event, rowData) =>  this.props.history.push({
                
                    // pathname: '/detailfund-page/fundid='+rowData.Fund_fld022,
                    
                    // })
                  },
                  { 
                    //hidden:true,
                    icon: () => <SearchIcon color="action" />,
                    tooltip: 'SEEFUND',
                    onClick: (event, rowData) =>  this.props.history.push({
                      pathname: '/detailfund-page/fundid='+rowData.fund_fld022_track,
                    })
                  },
                  {
                    icon: () => <NotesIcon color="action" />,
                    tooltip: 'MEMO' ,

                  },    
                ]}
                
                localization={{
                    header: {
                    actions: ''
                }
                }}
                />
            </div>
          </Row>
                
        </div>

      </Row>
    </div> 
        
        

    </Container>

    </div>
    
    );
    }
    }

    export default PageMyFund;