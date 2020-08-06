import React from "react";
import 'react-multi-carousel/lib/styles.css';
import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";

//table
import MaterialTable from 'material-table';
//icon
import { forwardRef } from 'react';
// import { TextField } from "@material-ui/core";

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
import Checkbox from '@material-ui/core/Checkbox';

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";

// select component
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

//cookies
import {load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies
import isEmpty from "views/Function/isEmpty.js"

//loading page
import LoadingIndicator from "views/Function/LoadingIndicator.js";
import LoadingIndicator_small from "views/Function/LoadingIndicator_small.js";

//compare page
import ComparePage from "views/ComparePage/OneComparePage.js"

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
  FindInPageIcon:forwardRef((props, ref) => <FindInPageIcon {...props} ref={ref} />),
  Checkbox:forwardRef((props, ref) => <Checkbox {...props} ref={ref} />)
};

  
//currency 選項
const currency_ = [
  {
    value:"",
    label:"-全部-",
  },
  {
    value:'TWD',
    label: '新台幣 TWD',
  },
  {
    value:'USD',
    label: '美金 USD',        
  },
  {
    value:'CNY',
    label: '人民幣 CNY', 
  },
  {
    value:'EUR',
    label: '歐元 EUR', 
  },
  {value:'AUD',
  label: '澳幣 AUD',
  },
  {
    value:'ZAR',
    label: '南非幣 ZAR',

  },
  {
    value:'NZD',
    label:'紐西蘭幣 NZD',
  },
];
//agent 選項
const agent_ = [
  {
    value:"",
    label:"-全部-",
  },
  {
    value:'瀚亞證券',
    label: '瀚亞證券投資信託股份有限公司',
  },
  {
    value:'兆豐國際證券',
    label: '兆豐國際證券投資信託股份有限公司',        
  },
  {
    value:'第一金證券',
    label: '第一金證券投資信託股份有限公司', 
  },
  {
    value:'匯豐中華證券',
    label: '匯豐中華證券投資信託股份有限公司', 
  },
  {value:'元大證券',
  label: '元大證券投資信託股份有限公司',
  },
  {
    value:'景順證券',
    label: '景順證券投資信託股份有限公司',

  },
  {
    value:'新光證券',
    label:'新光證券投資信託股份有限公司',
  },
  {
    value:'群益證券',
    label:'群益證券投資信託股份有限公司',
  },
  {
    value:'瑞銀證券',
    label:'瑞銀證券投資信託股份有限公司',
  },
  {
    value:'保德信證券',
    label:'保德信證券投資信託股份有限公司',
  },
  {
    value:'統一證券',
    label:'統一證券投資信託股份有限公司',
  },
  {
    value:'富邦證券',
    label:'富邦證券投資信託股份有限公司',
  },
  {
    value:'摩根證券',
    label:'摩根證券投資信託股份有限公司',
  },
  {
    value:'華南永昌證券',
    label:'華南永昌證券投資信託股份有限公司',
  },
  {
    value:'復華證券',
    label:'復華證券投資信託股份有限公司',
  },
  {
    value:'台中銀證',
    label:'台中銀證券投資信託股份有公司',
  },
  {
    value:'聯博證券',
    label:'聯博證券投資信託股份有限公司',
  },
  {
    value:'日盛證券',
    label:'日盛證券投資信託股份有限公司',
  },
  {
    value:'柏瑞證券',
    label:'柏瑞證券投資信託股份有限公司',
  },
  {
    value:'鋒裕匯理',
    label:'鋒裕匯理證券投資信託股份有限公司',
  },
  {
    value:'永豐證券',
    label:'永豐證券投資信託股份有限公司',
  },
  {
    value:'中國信託證券',
    label:'中國信託證券投資信託股份有限公司',
  },
  {
    value:'宏利證券',
    label:'宏利證券投資信託股份有限公司',
  },
  {
    value:'貝萊德證券',
    label:'貝萊德證券投資信託股份有限公司',
  },
  {
    value:'野村證券',
    label:'野村證券投資信託股份有限公司',
  },
  {
    value:'聯邦證券',
    label:'聯邦證券投資信託股份有限公司',
  },
  {
    value:'安本標準證券',
    label:'安本標準證券投資信託股份有限公司',
  },
  {
    value:'安聯證券',
    label:'安聯證券投資信託股份有限公司',
  },
  {
    value:'國泰證券',
    label:'國泰證券投資信託股份有限公司',
  },
  {
    value:'富達證券',
    label:'富達證券投資信託股份有限公司',
  },
  {
    value:'德銀遠東證券',
    label:'德銀遠東證券投資信託股份有限公司',
  },
  {
    value:'凱基證券',
    label:'凱基證券投資信託股份有限公司',
  },
  {
    value:'施羅德證券',
    label:'施羅德證券投資信託股份有限公司',
  },
  {
    value:'街口證券',
    label:'街口證券投資信託股份有限公司',
  },
  {
    value:'富蘭克林華美證券',
    label:'富蘭克林華美證券投資信託股份有限公司',
  },
  {
    value:'台新證券',
    label:'台新證券投資信託股份有限公司',
  },
  {
    value:'合作金庫證券',
    label:'合作金庫證券投資信託股份有限公司',
  },
  {
    value:'大華銀證券',
    label:'大華銀證券投資信託股份有限公司',
  },
  {
    value:'路博邁證券',
    label:'路博邁證券投資信託股份有限公司',
  },
];
//fundtype 選項
const fundtype_=[
  {
    value:"",
    label:"-全部-",
  },
  {
    value:"AA",
    label:"AA 股票型",
  },
  {
    value:"AB",
    label:"AB 平衡型",
  },
  {
    value:"AC",
    label:"AC 固定收益型",
  },
  {
    value:"AC11",
    label:"AC11 類貨幣市場型",
  },
  {
    value:"AD",
    label:"AD 貨幣市場基金",
  },
  {
    value:"AE",
    label:"AE 組合型",
  },
  {
    value:"AF",
    label:"AF 保本型",
  },
  {
    value:"AG",
    label:"AG 不動產證券化型",
  },
  {
    value:"AG",
    label:"AG 不動產證券化型",
  },
  {
    value:"AH",
    label:"AH 指數股票型",
  },
  {
    value:"AG",
    label:"AG 不動產證券化型",
  },
  {
    value:"AI",
    label:"AI 指數型",
  },
  {
    value:"AJ",
    label:"AJ 多重資產型",
  },
  {
    value:"AKETF",
    label:"AKETF 連結基金",
  },


];
//roi3M 選項
const roi3M_=[
  {
    value:"",
    label:"-全部-",
  },
  {
    value: 1,
    label: '-5%~5%',
  },
  {
    value: 2,
    label: '5%~10%',
  },
  {
    value: 3,
    label: '10%~15%',
  },
  {
    value: 4,
    label: '15%~20%',
  },
  {
    value: 5,
    label: '20%up',
  },
];
//RR 選項
const RR_=[
  {
    value:"",
    label:"-全部-",
  },
  {
    value:"RR1",
    label:"RR1",
  },
  {
    value:"RR2",
    label:"RR2",
  },
  {
    value:"RR3",
    label:"RR3",
  },
  {
    value:"RR4",
    label:"RR4",
  },
  {
    value:"RR5",
    label:"RR5",
  },
]

class AllFund extends React.Component {
  state = {
  }
  constructor(props) {
      super(props)
      this.getAllFundData=this.getAllFundData.bind(this);
      //this.handleSelectChange = this.handleSelectChange.bind(this);
      this.filterShow=this.filterShow.bind(this);
      //this.scroll=this.scroll.bind(this);
      this.state = {
        fund_id1:'',
        fund_id2:'',
        fund_id3:'',
        counters:0,
        errors: {},
        all_data:[],
        flag:false,
        filter_content:false,
        columns:[
          {title: '基金統編', field: 'Fund_fld022' },
          {title: '基金名稱', field: 'Fund_CH_Name' },
          {title: '幣別',field: 'Fund_Currency'},
          {title: '基金類型',field: 'Fund_Type'},
          {title: '最新淨值',field: 'History_NetWorth'},
          {title: '漲跌(%)',field: 'Ups_and_Downs'},
          {title: '累積報酬(%)',field: 'History_ROI_YB'},
          {title: '三個月報酬(%)',field: 'History_ROI_3M'},
          {title: '最新日期',field: 'Last_Update'},
          
        ],
        fld022: "",
        name: "",
        currency:"",
        zone: "",
        agent: "",
        fundtype: "",
        roi3M: "",
        RR: "",
        //搜尋功能name、fld022
    }
      //console.log(this.state) 
  }
  componentDidMount() {
    this.getAllFundData();
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
  getNetWorth(){
    
  }

  //處理filter、select value
  handleSelectChange = name2 => event =>{
    this.setState({
      [name2]: event.target.value,
    }, function () {
    console.log(this.state.fundtype);
    this.state.filter_content=true
    this.setState({filter_content:this.state.filter_content})
    this.filterShow()
    });
    
  }
  //篩選基金顯示
  filterShow(){
    let fund_info=[];
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://140.115.87.192:8090/Search_Fund";////////改url
    //console.log(data)
    fetch(proxyurl + url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fund_fld022: this.state.fld022,
                fund_name: this.state.name,
                fund_currency: this.state.currency,
                fund_zone: this.state.zone,//數值 1,2
                fund_company: this.state.agent,
                fund_type: this.state.fundtype,//數值 1~2
                history_roi_3M: this.state.roi3M,
                fund_risk_rank:this.state.RR
          })
              
        })
        
        .then((response) => {return response.json();})
        .then((jsonData) => {
          
          console.log(jsonData)
          if(jsonData.StatusCode==200){
            this.state.filter_content=false
            this.setState({filter_content:this.state.filter_content})
            //篩選無結果資料
            console.log(jsonData.data[0])
            fund_info=JSON.parse(jsonData.data) 
            //alert("成功取得！");
            this.state.all_data=fund_info;
            this.setState({all_data:this.state.all_data});
          }
          else if(jsonData.StatusCode==1000){
            alert("篩選後無資料！")
            this.state.filter_content=false
            this.setState({filter_content:this.state.filter_content})
            this.state.all_data=[];
            this.setState({all_data:this.state.all_data});

          }
          else{
            alert("error!");
          }
        })
  }
  handleselect(fund_id){  //勾選比較基金
    if(this.state.counters < 3){
      this.Update_comparebar(fund_id);
    }
    else{
      alert('最多只可比較三筆基金！')
    }

  }
  cancelhandleselect(fund_id){  //取消勾選比較基金

    console.log(fund_id)
    console.log(this.state.fund_id1)
    this.state.counters--;
    if(fund_id== this.state.fund_id1){
      this.setState((state, props) => {
        return {fund_id1:this.state.fund_id2,
                fund_id2:this.state.fund_id3,
                fund_id3:'',

        };
    });
    console.log('取消勾選')
    }
    else if(fund_id == this.state.fund_id2){
      this.setState((state, props) => {
        return {fund_id2:this.state.fund_id3,
                fund_id3:'',
        };
    }); 
    }
    else if(fund_id == this.state.fund_id3){
      this.setState((state, props) => {
        return {fund_id3:'',
        };
    });
    }
  }
  //切到下一頁，頁面
  scroll(){
    alert("scroll")
  }

  Update_comparebar(fund_id) {  //更新下方的比較bar

    //判別選取到第幾個比較基金
    if(this.state.counters == 0){
      this.setState((state, props) => {
        return {fund_id1:fund_id};
    });
    }
    else if(this.state.counters == 1){
      this.setState((state, props) => {
        return {fund_id2:fund_id};
    });
    }
    else if(this.state.counters == 2){
      this.setState((state, props) => {
        return {fund_id3:fund_id};
    });
    }

    this.state.counters++;
  }
  
  render() {
      return (
        <div>
        {!this.state.flag ? (<LoadingIndicator></LoadingIndicator>): 
        ( <div className='allfund-menu'>
        <Container>
        <IndexNavbar></IndexNavbar>
        
        <div className='sub-menu'>
        <Row>
          <Col>
            <div className='sub-sub-ranking'>
            <div className='fund-ranking'>Top 10 Fund Rankings</div>
            <div class="link-top"></div>
            <table>
            </table>
            </div>
          </Col>
          <Col>
            <div className='sub-sub-ranking'>
            <div className='fund-ranking'>Our Recommendation</div>
            <div class="link-top"></div>
            <table>
            </table>
            </div>
          </Col>
        </Row>
        <Row>
        
          <div className='sub-sub-search'>
            {/* <div>
              <form>
              <input id='search' placeholder="Search" type="search" /><input id='search-button' type="submit" value="search"></input>
              </form>
            </div> */}
            <div>
              <label className='search-font'>條件篩選基金</label>{!this.state.filter_content ? (<span></span>):(<LoadingIndicator_small></LoadingIndicator_small>)}
            </div>
        <Row>
        <Col sm>
            <TextField
                id="currency"
                label="請選擇 貨幣"
                select
                value={this.state.currency}
                margin="normal"
                onChange={this.handleSelectChange('currency')}
                fullWidth
                autoComplete='off'
              >
              {currency_.map((option) => (
              <MenuItem key={option.value} value={option.value} >
                {option.label}
              </MenuItem>
            ))}
            </TextField>
          </Col>
            <Col sm>
            <TextField
                id="agent"
                label="請選擇 公司"
                select
                value={this.state.agent}
                margin="normal"
                onChange={this.handleSelectChange('agent')}
                fullWidth
                autoComplete='off'
              >
              {agent_.map((option) => (
              <MenuItem key={option.value} value={option.value} >
                {option.label}
              </MenuItem>
            ))}
            </TextField>
            </Col>
            <Col sm>
            <TextField
                id="fundtype"
                label="請選擇 種類"
                select
                value={this.state.fundtype}
                margin="normal"
                onChange={this.handleSelectChange('fundtype')}
                fullWidth
                autoComplete='off'
              >
              {fundtype_.map((option) => (
              <MenuItem key={option.value} value={option.value} >
                {option.label}
              </MenuItem>
            ))}
            </TextField>
            </Col>
            <Col sm>
            <TextField
                id="roi3M"
                label="請選擇 三個月報酬區間"
                select
                value={this.state.roi3M}
                margin="normal"
                onChange={this.handleSelectChange('roi3M')}
                fullWidth
                autoComplete='off'
              >
              {roi3M_.map((option) => (
              <MenuItem key={option.value} value={option.value} >
                {option.label}
              </MenuItem>
            ))}
            </TextField>
            </Col>
            <Col sm>
            <TextField
                id="RR"
                label="請選擇 RR風險"
                select
                value={this.state.RR}
                margin="normal"
                onChange={this.handleSelectChange('RR')}
                fullWidth
                autoComplete='off'
              >
              {RR_.map((option) => (
              <MenuItem key={option.value} value={option.value} >
                {option.label}
              </MenuItem>
            ))}
            </TextField>
            </Col>
            
          </Row>
          <div><label className='search-font'>熱門TAG</label><br/></div>
          <Row>
              
          </Row>
        </div> 
        </Row>   
        <div>
        <Row>
          <MaterialTable
            icons={tableIcons}
            title="ALL FUNDS"
            columns={this.state.columns}
            data={this.state.all_data} 
            //onChangePage={()=>this.scroll}       
            
            options={{
              sorting: true,
              headerStyle: {
                backgroundColor: '#e26d5c',
                color: '#F8EDEB',
                width:120,
                maxWidth: 120,
                whiteSpace:'nowrap',
                position: 'sticky', 
                top: 0
              },
              cellStyle:{ 
                width:120,
                maxWidth:120,
                //whiteSpace:'nowrap',
                backgroundColor: '#F8EDEB',
                color: '#e26d5c',
              },
              actionsCellStyle: {
                backgroundColor: '#F8EDEB'
              },
              maxBodyHeight: '420px'
            }}
            actions={[
              { 
                
                //hidden:true,
                icon: () => <FindInPageIcon />,
                tooltip: 'SEEFUND',
                onClick: (event, rowData) =>  this.props.history.push({
               
                pathname: '/detailfund-page/fundid='+rowData.Fund_fld022,
                  
                })
               
              },
              { //這邊改比較基金按鈕
                
                //hidden:true,
                icon: () =><Checkbox/>,
                tooltip: 'Compare Fund',

                onClick: (event, rowData) =>  {
                     if(event.target.checked && this.state.counters < 3){  //確認是否為**勾選**而非取消勾選
                        this.handleselect(rowData.Fund_fld022);
                     }
                     else{
                        if(event.target.checked){
                          event.target.checked = false; //選取個數超過最大限制，因此就算選擇了也不會打勾
                          this.handleselect(rowData.Fund_fld022);
                        }
                        else{  //取消點選
                          this.cancelhandleselect(rowData.Fund_fld022);
                        }    
                     }
                  },
              }  
            ]}
            
            localization={{
                header: {
                  actions: ''
              }
            }}
          />
          
        </Row>
        </div>
        <Row><ComparePage fund_id_1={this.state.fund_id1} fund_id_2={this.state.fund_id2} fund_id_3={this.state.fund_id3}></ComparePage></Row>
        </div>
        </Container>
        </div>
      )}</div>
  )};

  }
  
  export default AllFund;