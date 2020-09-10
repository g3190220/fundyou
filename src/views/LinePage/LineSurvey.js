import React from "react";
import 'react-multi-carousel/lib/styles.css';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";
import { load_cookies,survey_score } from 'views/Function/Cookie_function.js' // 引入cookies

class Surveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age:'',
            job:'',
            income:'',
            education:'',
            score:0
        };

        this.handlesummit = this.handlesummit.bind(this)
      }
    //-----------------下一頁--------------------------------
    handlesummit(){
        if((this.state.age!='')&&(this.state.job!='')&&(this.state.income!='')&&(this.state.education!='')){
            const member_id=load_cookies("member_id");
            // const path=`/page-survey-2/id=${member_id}`
            const path=`/page-survey-2`

            //將此頁的分數紀錄到cookie，每個頁面分開計算最後再加總，避免使用者回到上一頁計算重複的問題。
            let arr = []
            arr.push(this.state.score);
            survey_score(arr)

            this.props.history.push({
                pathname: path 
            })
        }
        else{
            alert('請完全填選後再按下一頁！')
        }
    }
    
    //---------------取得點選的值--------------------------
    handleChange = (event) => {
        //**event.target.name-->取得點擊的RadioGroup的name
        //**event.target.value-->取得點擊的值

        if(event.target.name=='age'){
            this.state.age = event.target.value;
        }
        else if(event.target.name=='job'){
            this.state.job = event.target.value;
        }
        else if(event.target.name=='income'){
            this.state.income = event.target.value;
        }
        else if(event.target.name=='education'){
            this.state.education = event.target.value;
        }

        //分數加總
        this.state.score = parseInt(this.state.age)+parseInt(this.state.income)+parseInt(this.state.education);


    };

    render() {

        return(
            <div className='surveypage'>
                <Row>
                    <div className='survey_title'>個人資料</div><div className='notice_title'>※本網站不會將資料以任何形式外洩，僅用分析使用者投資偏好</div>
                </Row>
                    <div className='survey_title_line'></div>
                <Row>
                </Row>
                <div id='survey_page'>
                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>請選擇 您的年齡區間</FormLabel>
                        <RadioGroup row={true} aria-label="age-range" name="age" onChange={this.handleChange}>
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="未滿 20 歲/70 歲(含)以上" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="60 歲(含)以上〜70 歲" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="50 歲(含)以上〜60 歲" />
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="40 歲(含)以上〜50 歲" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="20 歲(含)以上〜40 歲" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>請選擇 您的職業</FormLabel>
                        <RadioGroup row={true} aria-label="job" name="job" onChange={this.handleChange}>
                        <FormControlLabel value="待業中" control={<Radio color="primary" />} label="待業中" />
                        <FormControlLabel value="學生" control={<Radio color="primary" />} label="學生" />
                        <FormControlLabel value="家管" control={<Radio color="primary" />} label="家管" />
                        <FormControlLabel value="退休人士" control={<Radio color="primary" />} label="退休人士" />
                        <FormControlLabel value="生產事業" control={<Radio color="primary" />} label="生產事業" />
                        <FormControlLabel value="軍公教人員" control={<Radio color="primary" />} label="軍公教人員" />
                        <FormControlLabel value="金融保險業" control={<Radio color="primary" />} label="金融保險業" />
                        <FormControlLabel value="專業人士（醫生、律師、會計師等等）" control={<Radio color="primary" />} label="專業人士（醫生、律師、會計師等等）" />
                        <FormControlLabel value="其他" control={<Radio color="primary" />} label="其他" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>請選擇 您的年所得區間</FormLabel>
                        <RadioGroup row={true} aria-label="income" name="income" onChange={this.handleChange}>
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="50 萬以下" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="50 萬(含)〜100 萬" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="100 萬(含)〜150 萬" />
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="150 萬(含)〜200 萬" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="200 萬(含)以上" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>

                <Row>
                    <div className='problem_space'>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className='problem_title'>請選擇 您的最高學歷</FormLabel>
                        <RadioGroup row={true} aria-label="education" name="education" onChange={this.handleChange}>
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="識字有限" />
                        <FormControlLabel value="4" control={<Radio color="primary" />} label="國中含以下" />
                        <FormControlLabel value="6" control={<Radio color="primary" />} label="高中職" />
                        <FormControlLabel value="8" control={<Radio color="primary" />} label="專科 大學" />
                        <FormControlLabel value="10" control={<Radio color="primary" />} label="研究所以上" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                </Row>
                
                <Row>
                    <button className='submit-btn' onClick={this.handlesummit}>next</button>
                </Row>
                </div>
            </div>
        );
    }
}
export default Surveys;
