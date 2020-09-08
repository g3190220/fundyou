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
            lose:'',
            affect:'',
            profit:'',
            score:load_cookies("score_1"),
            score_2:load_cookies("score_2"),
            score_3:load_cookies("score_3"),
            invest_method:load_cookies("method"),
            invest_money:load_cookies("ROI"),
            invest_year:load_cookies("total_score"),
            score_page:0
        };

        this.handlesummit = this.handlesummit.bind(this)
        this.handleprevious = this.handleprevious.bind(this)
      }
    //-------------------下一頁------------------------------
    handlesummit(){

            if((this.state.lose!='')&&(this.state.affect!='')&&(this.state.profit!='')){
                 const member_id=load_cookies("member_id");
                //  const path=`/page-survey-5/id=${member_id}`
                 const path=`/page-survey-5`
                //將此頁的分數紀錄到cookie
                 let arr = []
                 arr.push(this.state.score);
                 arr.push(this.state.score_2);
                 arr.push(this.state.score_3);
                 arr.push(this.state.score_page);
                 survey_score(arr)

                //------計算使用者的預期年回報率----------
                //S=終值
                //this.state.invest_money = 欲投資之金額
                let expect_return = 0;
                let year = this.state.invest_year;
                let s = parseInt(this.state.invest_money);
                //加上期望報酬
                if(this.state.profit=='2'){
                    s += 25000;
                }
                else if(this.state.profit=='4'){
                    s += 75000;
                }
                else if(this.state.profit=='6'){
                    s += 125000;
                }
                else if(this.state.profit=='8'){
                    s += 175000;
                }
                else if(this.state.profit=='10'){
                    s += 225000;
                }

                let a = s/(this.state.invest_money);

                if(this.state.invest_method=='單筆'){
                    expect_return = (Math.pow(a, (1/year)))-1  //i = (s/p)^(1/n) - 1
                }
                else if(this.state.invest_method=='定期定額'){

                    let p = 0;
                    if(year < 1){

                    }
                    else{
                        
                        for(let i = 0; i < year; i++){
                            p+=(this.state.invest_money/(Math.pow(1+0.0012, i)))
                        }
                        p+= (this.state.invest_money/(Math.pow(1+0.0006, year-1)))
                    }
                    if(year != 10){
                        expect_return = (this.state.invest_money/p)-(this.state.invest_money/s)
                    }
                    console.log(this.state.invest_money/p)
                    console.log(this.state.invest_money/s)
                }
                survey_answer(expect_return);
                //-----------------------------------------

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
        // const path=`/page-survey-3/id=${member_id}`
        const path=`/page-survey-3`
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

        this.state.score_page = parseInt(this.state.lose)+parseInt(this.state.affect)+parseInt(this.state.profit);
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
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="不能有損失" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="5萬元以下" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="5萬元〜10萬元" />
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="10萬元〜20萬元" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="20萬元以上" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>呈上題，如果你損失超過(15萬元)，對你的生活影響程度為？</FormLabel>
                        <RadioGroup row={true} aria-label="affect" name="affect" onChange={this.handleChange}>
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="無法承受，會破產" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="影響程度大" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="中度影響" />
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="影響程度小" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="幾乎無影響" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>當你賺多少錢之後才會想把基金賣出？</FormLabel>
                        <RadioGroup row={true} aria-label="profit" name="profit" onChange={this.handleChange}>
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="賺 5萬元以下" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="賺 5萬元〜10萬元" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="賺 10萬元〜15萬元" />
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="賺 15萬元〜20萬元" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="賺 20萬元〜25萬元" />
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
