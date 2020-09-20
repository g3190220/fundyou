import React from 'react';
// import IndexNavbar from "views/FundPage/IndexNavbar_Fund.js";
import { Container, Row, Col, Button, Card } from 'reactstrap';
import Caculate from "views/Function/Caculate.js";
import Caculate2 from "views/Function/Caculate2.js";
import Caculate3 from "views/Function/Caculate3.js";
import PersonalizeMenu from "views/PersonalizePage/PersonalizePage.js";
import MaterialTable from 'material-table'; //基金表格
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

import { forwardRef } from 'react';

import 'react-multi-carousel/lib/styles.css';

import { load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies

//替代style
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
    },
  });

class PagePig extends React.Component{
    state = {
    }
    constructor(props) {
        super(props)
        this.Change_rank=this.Change_rank.bind(this);
        console.log(props)
        this.state = {
          //fields: {},
          errors: {},
          recommendation_text:'您尚未做過性格分析測驗，此推薦僅依據績效預測排名。如需個人化推薦，請至性格分析頁面完成性格分析問券即可取得個人化的基金投資推薦。',
          is_recommendation:false, //預設未做過性格分析測驗
          method:'',
          roi:'',
          columns:[
            {title: '基金統編', field: '3' },
            {title: '基金名稱',field: '0'},
            {title: '風險指標（標準差）',field: '1'},
            {title: '預期報酬',field: '2'},
          ],
          selected:1
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gototop=this.gototop.bind(this);
    this.gotocaculate=this.gotocaculate.bind(this);
    this.all_fund_data=this.all_fund_data.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  //頁面置頂
        this.getresult();
    }
    //轉變FUND 資料
    all_fund_data(fund_info){
        console.log("all_fund_data")
        console.log(fund_info)
        let fund_info_href=[]
        for(var i=0;i<Object.keys(fund_info).length;i++){
                fund_info_href.push(
                {
                    '3':fund_info[i][3],
                    '0':<a style={{color:'black',fontWeight:'500'}} href={'/detailfund-page/fundid=' + fund_info[i][3]}>{fund_info[i][0]}</a>,
                    '1':fund_info[i][1],
                    '2':fund_info[i][2],
        
                    });
                };
            console.log(fund_info_href)
            return fund_info_href
    }
    gototop(){
        window.scrollTo(0, 0); 
    }
    
    gotocaculate(){
        window.scrollTo(100, 0); 
    }
  
    //點擊去頁面
    handleSubmit(){
      this.props.history.push("/personal-data-page")
    }

    //(10)改變分頁
    Change_rank(selected){
        if(selected==1){
            this.setState({selected:1})
            
        }
        else if(selected==2){
            this.setState({selected:2})
            
        }
        else if(selected==3){
            this.setState({selected:3})
            
        }
    }

      //---------取得性格分析結果------------------------------------------
      getresult(){
        //若使用者做過性格分析，則會改變為不同的注釋，告知使用者期基金推薦是透過AI及性格分析的結為做為推薦基準

        let data = []
        const url = "https://fundu.ddns.net:8090/getCharacteristic";////////改url
        //console.log(data)
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberID: load_cookies("member_id")
                })
            })
            .then((response) => {return response.json();})
            .then((jsonData) => {
            //console.log(this)
            console.log(jsonData.info)
            try{
                data=JSON.parse(jsonData.info)
                if(jsonData.StatusCode==200){
                    
                    //console.log(data[0].Member_characteristic)
    
                    //更新state並獲得以下資料
                    this.setState((state, props) => {
                        return {counter: state.counter + props.step,
                                method:data[0].Member_characteristic,
                                roi:data[0].Member_exceptedreturn,
                                recommendation_text:'本系統透過性格分析測驗以及AI預測基金的結果提供使用者最適配的基金。',
                                };
                    });
                }
            }
            catch(e){ //若是沒有做過性格分析測驗則只給純預測淨值排名
            }
            })
            .then(() => { this.getFundData();})
            
            
      }
      //-------------------------------------------------------------------

      //------------取得推薦基金--------------------------------------------
      getFundData(){
        console.log('123'+this.state.method)
        let fund_info=[];
        const url = "https://fundu.ddns.net:8090/fundrecommendation";

        fetch(url, {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        risk:this.state.method, //風險分級
                        roi:this.state.roi      //預期報酬
                  })
                  
            })
            .then((response) => {return response.json();})
            .then((jsonData) => { 
              if(jsonData.StatusCode==200){

                console.log('取得推薦')
                fund_info=jsonData.recommendation;
                console.log(fund_info);
    
                this.state.all_data=this.all_fund_data(fund_info)
                this.setState({all_data:this.state.all_data,flag:true})
            }
              else{
              this.state.all_data=[]
              }
            })
    }
    //-------------------------------------------------------------------

    render(){
    
    return(
    <div className="card-personalize-pig">
    <PersonalizeMenu></PersonalizeMenu>
    <Container>
    <Row>       
        <div className="card-personalize1">
            <Row>
                <Col><div className="card-personalize1-title">豬豬小助理</div></Col>
                {/* <Col><div className="card-personalize1-title">基金推薦</div></Col>
                <Col><div className="card-personalize1-title">基金試算器</div></Col> */}
            </Row>
            
            <Row>
                <div className="fund-recommendation">基金推薦</div>
            </Row>
            <Row>
                <span className='sub-fund-recommendation'>{this.state.recommendation_text}</span>
            </Row>
            <Row>
                <div className='recommendation-div'> 
                <MuiThemeProvider theme={THEME}>
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
                            width: 223,
                            maxWidth: 223,
                            // width:200,
                            // maxWidth: 200,
                            whiteSpace:'nowrap',
                            position: 'sticky', 
                            top: 0,
                            padding: 10 ,
                            fontFamily: '微軟正黑體',
                            fontWeight: '800',
                            fontSize: 16,
                            textAlign:'center',
                        },

                        // toolbar: false, //隱藏標題和搜尋欄

                        cellStyle:{ 
                            width: 223,
                            maxWidth: 223,
                            // width:200,
                            // maxWidth: 200,
                            wordWrap:'break-word',
                            backgroundColor: '#f6f6f6',
                            color: '#000000',
                            fontFamily: '微軟正黑體',
                            fontWeight: '700',
                            fontSize: 15,
                            padding: 10,
                            textAlign:'center',
                        },
                        actionsCellStyle: {
                            backgroundColor: '#f6f6f6',
                        },
                        maxBodyHeight: '360px',
                        actionsColumnIndex: 0,
                        
                        }}
                        // actions={[
                        // { 
                        //     //hidden:true,
                        //     icon: () => <SearchIcon color="action" />,
                        //     tooltip: 'SEEFUND',
                        //     onClick: (event, rowData) =>  this.props.history.push({
                        //     pathname: '/detailfund-page/fundid='+rowData[3], //rowData後接field的名字
                        //     }) 
                        // },    
                        // ]}
                        
                        // localization={{
                        //     header: {
                        //     actions: ''
                        // }
                        // }}
                        />
                </MuiThemeProvider>
                </div>
            </Row>
            <Row>
                <Col xs={12} sm={6}>
                    <div className="dollor-cost-average">基金試算器</div>
                </Col>

                <Col xs={12} sm={6}>
                    <div className='button-center'>
                    <button className='tag-btn'  onClick={()=>this.Change_rank(1)}>單筆投資</button>
                    {/* <button className='tag-btn'  onClick={()=>this.Change_rank(2)}>每月定期定額</button> */}
                    <button className='tag-btn'  onClick={()=>this.Change_rank(3)}>每年定期定額</button>
                    </div>
                </Col>
            </Row>
            <Row>
                {this.state.selected==1?(<Caculate></Caculate>):(this.state.selected==3?(<Caculate2></Caculate2>):(<Caculate3></Caculate3>))}
            </Row>
        </div>
    </Row>     
    </Container>
    </div>
    
    );
    }
    }

    export default PagePig;