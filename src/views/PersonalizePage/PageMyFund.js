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
        // this.getTrack = this.getTrack.bind(this);

        console.log(props)
        this.state = {
          //fields: {},
            errors: {},
            all_data:[],
            flag:false,
            filter_content:false,
            columns:[
            {title: '基金統編', field: 'Fund_fld022' },
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
      window.scrollTo(0, 0);
      this.getAllFundData();
      // this.getTrack();
    }

      getAllFundData(){
        let fund_info=[];
        //除淨值的資料
        const url = "http://140.115.87.192:8090/getFundInfo";////////改url
        //console.log(data)
        fetch(url, {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        //取得全部fund
                        fld022: -1,
                  })
                  
            })
            .then((response) => {return response.json();})
            .then((jsonData) => { 
              if(jsonData.StatusCode==200){
                console.log(jsonData);
                fund_info=JSON.parse(jsonData.fund_info)
                console.log(fund_info);
    
                this.state.all_data=fund_info
                this.setState({all_data:this.state.all_data,flag:true})
            }
              else{
              this.state.all_data=[]
              }
            })
          //抓取淨值資料
          const url2 = "http://140.115.87.192:8090/getFundInfo";////////改url
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
            alert("success")  //有回傳，取得成功
          }
          else{ 
            alert("error")  //無回傳，取得失敗或查無資料
          }
        })
      }


      getTrack(){  //取得追蹤基金
      let fund_info=[];
      let id = (this.props.match.params.fundid.split('='))[1]; //抓現在頁面的fundid
      const url = "http://140.115.87.192:8090/getTrack";
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
        // fund_info=JSON.parse(jsonData.fund_info)
        if(jsonData.StatusCode==200){ 
          var track_info = [];

          try{
            track_info=JSON.parse(jsonData.track_info)
            this.state.fund_info=track_info
            this.setState({track_info:this.state.fund_info})
          }

          catch (d){
            this.state.track_info=[]
          }
        }
        else{ 
          this.state.track_info=[]
        }

      })
      const url2 = "http://140.115.87.192:8090/getFundInfo"
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

        <div className="card-personalize1">
            <h4><font color="#E76F51" size="6" face="微軟正黑體"><b>我的基金</b></font></h4>

            <div className="fund-follows">
                <span style={{fontWeight:"bold"}}>追蹤基金</span>
            </div><br/>

            <div className="following-funds-table">
                <MaterialTable
                icons={tableIcons}
                title="Following Funds"
                columns={this.state.columns}
                data={this.state.all_data}
                // data={this.state.track_info} 
                //onChangePage={()=>this.scroll}       
                
                options={{
                sorting: true,
                headerStyle: {
                    backgroundColor: '#e26d5c',
                    color: '#F8EDEB',
                    width: 100,
                    maxWidth: 100,
                    whiteSpace:'nowrap',
                    position: 'sticky', 
                    top: 0,
                    padding: 10 ,
                    fontFamily: '微軟正黑體',
                    fontWeight: '800',
                    fontSize: 16
                },

                toolbar: false,

                cellStyle:{ 
                    width: 100,
                    maxWidth: 100,
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
                maxBodyHeight: '420px'
                }}
                actions={[
                { 
                    
                    //hidden:true,
                    icon: () => <SearchIcon color="action" />,
                    tooltip: 'SEEFUND',
                    onClick: (event, rowData) =>  this.props.history.push({
                
                    pathname: '/detailfund-page/fundid='+rowData.Fund_fld022,
                    
                    })
                
                }    
                ]}
                
                localization={{
                    header: {
                    actions: '詳細資料'
                }
                }}
                />
            </div>

            <div className="fund-favorite">
                <span style={{fontWeight:"bold"}}>最愛基金</span>
            </div>
                <div className='sub-sub-all'>
                    <table id='fund-menu' border='2'>
                    <tr>
                        <th width="30%">基金名稱</th>
                        <th>地區</th>
                        <th>最新淨值</th>
                        <th>漲跌</th>
                        <th>累積報酬</th>
                        <th>成立日期</th>
                    </tr>
                    <tr>
                        <td><a href="#all-fund">瀚亞高科技基金</a></td>
                        <td>台灣</td>
                        <td>66.3400</td>
                        <td>2.50%</td>
                        <td>NULL</td>
                        <td>1994/11/14</td>
                    </tr>
                    </table>
                </div>
        </div>


    </div> 
        
        

    </Container>

    </div>
    
    );
    }
    }

    export default PageMyFund;