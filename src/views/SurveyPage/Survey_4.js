import React from "react";
import 'react-multi-carousel/lib/styles.css';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import { load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies

class Surveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lose:'',
            affect:'',
            profit:''
        };

        this.handlesummit = this.handlesummit.bind(this)
        this.handleprevious = this.handleprevious.bind(this)
      }
    //-------------------下一頁------------------------------
    handlesummit(){

            if((this.state.lose!='')&&(this.state.affect!='')&&(this.state.profit!='')){
                 const member_id=load_cookies("member_id");
                 const path=`/page-survey-5/id=${member_id}`
                 this.props.history.push({
                     pathname: path 
                 })
            }
            else{
                alert('請完全填選後再按下一頁！')
            }

    }
        //-------------------上一頁------------------------------
    handleprevious(){
        const member_id=load_cookies("member_id");
        const path=`/page-survey-3/id=${member_id}`
        this.props.history.push({
            pathname: path 
        })
    }
        
    //---------------取得點選的值--------------------------
    handleChange = (event) => {
        //**event.target.name-->取得點擊的RadioGroup的name
        //**event.target.value-->取得點擊的值

        if(event.target.name=='lose'){
            this.state.lose = event.target.value;
        }
        else if(event.target.name=='affect'){
            this.state.affect = event.target.value;
        }
        else if(event.target.name=='profit'){
            this.state.profit = event.target.value;
        }
    };

    render() {

        return(
            <div className='surveypage'>
                <Row>
                    <div className='survey_title'>風險承受力評估</div><div className='notice_title'>※本網站不會將資料以任何形式外洩，僅用分析使用者投資偏好</div>
                </Row>
                    <div className='survey_title_line'></div>
                <Row>
                </Row>
                <div id='survey_page'>
                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>假如你今天有(100萬元)要拿去投資基金，請問你最多可以接受多少錢的損失？</FormLabel>
                        <RadioGroup row={true} aria-label="lose" name="lose" onChange={this.handleChange}>
                        <FormControlLabel value="5萬元以下" control={<Radio />} label="5萬元以下" />
                        <FormControlLabel value="5萬元〜10萬元" control={<Radio />} label="5萬元〜10萬元" />
                        <FormControlLabel value="10萬元〜20萬元" control={<Radio />} label="10萬元〜20萬元" />
                        <FormControlLabel value="20萬元以上" control={<Radio />} label="20萬元以上" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>呈上題，如果你損失超過(15萬元)，對你的生活影響程度為？</FormLabel>
                        <RadioGroup row={true} aria-label="affect" name="affect" onChange={this.handleChange}>
                        <FormControlLabel value="無法承受，會破產" control={<Radio />} label="無法承受，會破產" />
                        <FormControlLabel value="影響程度大" control={<Radio />} label="影響程度大" />
                        <FormControlLabel value="中度影響" control={<Radio />} label="中度影響" />
                        <FormControlLabel value="幾乎無影響" control={<Radio />} label="幾乎無影響" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>當你賺多少錢之後才會想把基金賣出？</FormLabel>
                        <RadioGroup row={true} aria-label="profit" name="profit" onChange={this.handleChange}>
                        <FormControlLabel value="賺 5萬元〜10萬元" control={<Radio />} label="賺 5萬元〜10萬元" />
                        <FormControlLabel value="賺 10萬元〜15萬元" control={<Radio />} label="賺 10萬元〜15萬元" />
                        <FormControlLabel value="賺 15萬元〜20萬元" control={<Radio />} label="賺 15萬元〜20萬元" />
                        <FormControlLabel value="賺 20萬元〜25萬元" control={<Radio />} label="賺 20萬元〜25萬元" />
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
