import React from "react";
import 'react-multi-carousel/lib/styles.css';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import { load_cookies, survey_score } from 'views/Function/Cookie_function.js' // 引入cookies

class Surveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experience:'',
            product:'',
            score:load_cookies("score_1"),
            score_2:load_cookies("score_2"),
            score_page:0
        };

        this.handlesummit = this.handlesummit.bind(this)
        this.handleprevious = this.handleprevious.bind(this)
      }

    componentDidMount() {
        window.scrollTo(0, 0);  //頁面置頂
        
    }
    //-------------------下一頁------------------------------
    handlesummit(){

            if((this.state.experience!='')&&(this.state.product!='')){
                 const member_id=load_cookies("member_id");
                //  const path=`/page-survey-4/id=${member_id}`
                 const path=`/liff-survey4`
                 //將此頁的分數紀錄到cookie
                 let arr = []
                 arr.push(this.state.score);
                 arr.push(this.state.score_2);
                 arr.push(this.state.score_page);
                 survey_score(arr)

                 this.props.history.push({
                     pathname: path,
                     state: { member_ID: this.props.location.state.member_ID }
                 })
            }
            else{
                alert('請完全填選後再按下一頁！')
            }

    }
        //-------------------上一頁------------------------------
    handleprevious(){
        const member_id=load_cookies("member_id");
        // const path=`/page-survey-2/id=${member_id}`
        const path=`/liff-survey2`
        this.props.history.push({
            pathname: path 
        })
    }
        
    //---------------取得點選的值--------------------------
    handleChange = (event) => {
        //**event.target.name-->取得點擊的RadioGroup的name
        //**event.target.value-->取得點擊的值

        if(event.target.name=='experience'){
            this.state.experience = event.target.value;
        }
        else if(event.target.name=='product'){
            this.state.product = event.target.value;
        }

        this.state.score_page = parseInt(this.state.experience)+parseInt(this.state.product);
    };

    render() {

        return(
            <div className='surveypage'>
                <Row>
                    <div className='survey_title'>投資經驗</div><div className='notice_title'>※本網站不會將資料以任何形式外洩，僅用分析使用者投資偏好</div>
                </Row>
                    <div className='survey_title_line'></div>
                <Row>
                </Row>
                <div id='survey_page'>
                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>請問您的投資基金的經驗為何？</FormLabel>
                        <RadioGroup row={true} aria-label="experience" name="experience" onChange={this.handleChange}>
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="沒有經驗" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="1年以下" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="1〜5年" />
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="6〜10年" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="10年（含）以上" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>請問您曾經或現在投資過那些金融商品(可複選)？</FormLabel>
                        <RadioGroup row={true} aria-label="product" name="product" onChange={this.handleChange}>
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="台外幣存款、貨幣型基金、儲蓄型保險" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="債券、債券型基金" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="股票、股票型基金" />
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="結構型商品、投資型保單" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="期貨、選擇權或其他衍生性金融商品" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>
                
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
