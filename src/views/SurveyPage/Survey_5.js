import React from "react";
import 'react-multi-carousel/lib/styles.css';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import { load_cookies, survey_answer } from 'views/Function/Cookie_function.js' // 引入cookies
import liff from '@line/liff';

class Surveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dealwith_lose:'',
            dealwith_profit:'',
            score:load_cookies("score_1"),
            score_2:load_cookies("score_2"),
            score_3:load_cookies("score_3"),
            score_4:load_cookies("score_4"),
            score_page:0
        };

        this.handlesummit = this.handlesummit.bind(this)
        this.handleprevious = this.handleprevious.bind(this)
      }
    //------------------提交------------------------------
    handlesummit(){

            if((this.state.dealwith_lose!='')&&(this.state.dealwith_profit!='')){

                 const member_id=load_cookies("member_id");
                //  const path=`/page-characterAnalysis/id=${member_id}`
                 const path=`/page-characterAnalysis`

                 this.props.history.push({
                     pathname: path 
                 })

                 let arr = []
                 let ans = '';
                 var result = '';
                 var total = parseInt(this.state.score)+parseInt(this.state.score_2)+parseInt(this.state.score_3)+parseInt(this.state.score_4)+parseInt(this.state.score_page)
                 arr.push(load_cookies("ROI"));
                 arr.push(load_cookies("method"))
                 arr.push(total)
                 survey_answer(arr);

                 if(total <= 34){
                    ans = '您的結果為：保守型';
                    result = '保守型'
                 }
                 else if(total <=45){
                    ans = '您的結果為：穩健型';
                    result = '穩健型'
                 }
                 else if(total <=58){
                    ans = '您的結果為：成長型';
                    result = '成長型'
                }
                else{
                    ans = '您的結果為：積極型';
                    result = '積極型'
                }
                alert(ans);
            }
            else{
                alert('請完全填選後再按下一頁！')
            }

            //-----------更新或新增性格分析結果-----------------------------------------------------------------
            const url = "https://fundu.ddns.net:8090/set_characteristic";////////改url
            //console.log(data)
            fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        memberID: load_cookies("member_id"),
                        exceptedreturn: 100,
                        characteristic:result,
                        score: total,
                    })
                })
                .then((response) => {return response.json();})
                .then((jsonData) => {
                //console.log(this)
                console.log(jsonData)
                if(jsonData.StatusCode==200){
                    alert("更改成功！")
                    //關閉Line liff
                    liff.closeWindow();
                }
                })
    }
    //-------------------上一頁------------------------------
    handleprevious(){
        const member_id=load_cookies("member_id");
        // const path=`/page-survey-4/id=${member_id}`
        const path=`/page-survey-4`
        this.props.history.push({
            pathname: path 
        })
    }
        
    //---------------取得點選的值--------------------------
    handleChange = (event) => {
        //**event.target.name-->取得點擊的RadioGroup的name
        //**event.target.value-->取得點擊的值

        if(event.target.name=='dealwith-lose'){
            this.state.dealwith_lose = event.target.value;
        }
        else if(event.target.name=='dealwith-profit'){
            this.state.dealwith_profit = event.target.value;
        }

        this.state.score_page = parseInt(this.state.dealwith_lose)+parseInt(this.state.dealwith_profit);
    };

    render() {

        return(
            <div className='surveypage'>
                <Row>
                    <div className='survey_title'>風險偏好評估</div><div className='notice_title'>※本網站不會將資料以任何形式外洩，僅用分析使用者投資偏好</div>
                </Row>
                    <div className='survey_title_line'></div>
                <Row>
                </Row>
                <div id='survey_page'>
                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>當您的投資超過你可以接受的損失時（停損點），你會採取那種處置方式？</FormLabel>
                        <RadioGroup row={true} aria-label="dealwith-lose" name="dealwith-lose" onChange={this.handleChange}>
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="立即賣出所有部位" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="先賣出一半或一半以上部位" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="先賣出一半以內部位" />
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="暫時觀望，視情況再因應" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="繼續持有至回本或不漲為止" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>當您的投資達到你預先設定的目標利益（停利點），請問您會採取那種處置方式？</FormLabel>
                        <RadioGroup row={true} aria-label="dealwith-profit" name="dealwith-profit" onChange={this.handleChange}>
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="立即賣出所有部位" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="先賣出一半或一半以上部位" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="先賣出一半以內部位" />
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="暫時觀望，視情況再因應" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="繼續持有至回本或不漲為止" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>
                
                <Row>
                    <button className='previous-btn' onClick={this.handleprevious}>previous</button>
                    <button className='submit-btn' onClick={this.handlesummit}>submit</button>
                </Row>
                </div>
            </div>
        );
    }
}
export default Surveys;
