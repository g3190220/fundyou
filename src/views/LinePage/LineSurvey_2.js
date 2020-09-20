import React from "react";
import 'react-multi-carousel/lib/styles.css';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import { load_cookies, survey_score, survey_answer} from 'views/Function/Cookie_function.js' // 引入cookies

class Surveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            factor:'',
            purpose:'',
            time:'',
            method:'',
            Single:null, //願意投資的金額
            method_css:'method_space',
            method_type:'您單筆想要投資多少錢？',
            score:load_cookies("score_1"),
            score_page:0
        };

        this.handlesummit = this.handlesummit.bind(this)
        this.handleprevious = this.handleprevious.bind(this)
        this.valueChange = this.valueChange(this)
      }

    componentDidMount() {
        window.scrollTo(0, 0);  //頁面置頂
        
    }
    //-------------------下一頁------------------------------
    handlesummit(){

        if(isNaN(this.state.Single) || (this.state.Single==null)){ //判斷輸入的投資金額是否為數字
            alert('請輸入數字！');
        }
        else{
            if((this.state.factor!='')&&(this.state.purpose!='')&&(this.state.time!='')&&(this.state.method!='')){
                const member_id=load_cookies("member_id");
                // const path=`/page-survey-3/id=${member_id}`
                const path=`/liff-survey3`

                //--------投資年份------------
                let year = 0;
                if(this.state.time=='8'){
                    year = 0.5;
                }
                else if(this.state.time=='6'){
                    year = 2.5;
                }
                else if(this.state.time=='4'){
                    year = 7.5;
                }
                else if(this.state.time=='2'){
                    year = 10;
                }
                //-------------------------------

                //將此頁的分數紀錄到cookie
                let arr = []
                let money = [];
                arr.push(this.state.score);
                arr.push(this.state.score_page);
                money.push(this.state.Single)
                money.push(this.state.method)
                money.push(year)
                survey_score(arr)
                survey_answer(money) //使用者願意投資的金額以及方式
                console.log(money)

                this.props.history.push({
                    pathname: path,
                    state: { member_ID: this.props.location.state.member_ID }
                })
            }
            else{
                alert('請完全填選後再按下一頁！')
            }
        }

    }
    //-------------------上一頁------------------------------
    handleprevious(){
        const member_id=load_cookies("member_id");
        // const path=`/page-survey/id=${member_id}`
        const path=`/liff-survey`
        this.props.history.push({
            pathname: path 
        })
    }
    
    //---------------取得點選的值--------------------------
    handleChange = (event) => {
        //**event.target.name-->取得點擊的RadioGroup的name
        //**event.target.value-->取得點擊的值

        if(event.target.name=='factor'){
            this.state.factor = event.target.value;
        }
        else if(event.target.name=='purpose'){
            this.state.purpose = event.target.value;
        }
        else if(event.target.name=='time'){
            this.state.time = event.target.value;

        }
        else if(event.target.name=='method'){
            this.state.method = event.target.value;

            if(event.target.value=='單筆'){
                this.setState((state, props) => {
                    return {method_type:'您單筆想要投資多少錢？',
                            method_css:'problem_space'
                    };
                });
            }
            else if(event.target.value=='定期定額'){
                this.setState((state, props) => {
                    return {method_type:'您想要定期定額每年投資多少錢？',
                            method_css:'problem_space'
                    };
                });
            }
        }

        this.state.score_page = parseInt(this.state.factor)+parseInt(this.state.time);
    };

    valueChange = name => event => {   //不太懂，問湘琪

        this.state.Single=event.nativeEvent.target.value;
    }
    

    render() {

        return(
            <div className='surveypage'>
                <Row>
                    <div className='survey_title'>投資目的</div><div className='notice_title'>※本網站不會將資料以任何形式外洩，僅用分析使用者投資偏好</div>
                </Row>
                    <div className='survey_title_line'></div>
                <Row>
                </Row>
                <div id='survey_page'>
                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>請問您投資金融商品最主要的考量因素為何？</FormLabel>
                        <RadioGroup row={true} aria-label="factor" name="factor" onChange={this.handleChange}>
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="儲蓄（保本不虧錢）" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="有穩定收入（賺小錢）" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="賺大錢" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>請問您投資目的為何？</FormLabel>
                        <RadioGroup row={true} aria-label="purpose" name="purpose" onChange={this.handleChange}>
                        <FormControlLabel value="養老基金" control={<Radio color="primary" />} label="養老基金" />
                        <FormControlLabel value="結婚基金" control={<Radio color="primary" />} label="結婚基金" />
                        <FormControlLabel value="教育基金" control={<Radio color="primary" />} label="教育基金" />
                        <FormControlLabel value="購屋基金" control={<Radio color="primary" />} label="購屋基金" />
                        <FormControlLabel value="其他" control={<Radio color="primary" />} label="其他" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>您希望在多久以內達到期望報酬</FormLabel>
                        <RadioGroup row={true} aria-label="time" name="time" onChange={this.handleChange}>
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="1年以下" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="1〜5年" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="5〜10年" />
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="10年以上" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>您想要的投資方式</FormLabel>
                        <RadioGroup row={true} aria-label="method" name="method" onChange={this.handleChange}>
                        <FormControlLabel value="單筆" control={<Radio color="primary" />} label="單筆" />
                        <FormControlLabel value="定期定額" control={<Radio color="primary" />} label="定期定額" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>
                <div className={this.state.method_css}>
                <Row> 
                     <span className='problem_title'>{this.state.method_type}</span>
                </Row>
                <Row>
                    <TextField 
                        id="standard-search" 
                        ref="myField"
                        //label="Search field"
                        value={this.state.Single}
                        onChange={this.valueChange} 
                        type="search"
                        color="primary" 
                    />
                    <span className='dollar'>TWD</span>
                </Row>
                </div>
                
                <Row>
                    <button className='previous-btn' onClick={this.handleprevious}>previous</button>
                    <button className='submit-btn' onClick={this.handlesummit}>next</button>
                </Row>
                </div>
            </div>
        );
    }
}
export default Surveys;
