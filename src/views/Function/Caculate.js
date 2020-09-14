import React from 'react';
import { Container, Row, Col, Button, Card } from 'reactstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import isEmpty from 'views/Function/isEmpty.js'
class Caculate extends React.Component{
    state = {
    }
    constructor(props) {
        super(props)
        this.Caculator = this.Caculator.bind(this);
        this.handleChange2=this.handleChange2.bind(this);
        this.Clear=this.Clear.bind(this);
        this.state = {
          errors: {},
          selected:"1",
          show:"hidden"
      }}

    
    handleChange = ev => {
        this.setState({selected: ev.target.value });
    }

    //更改資料時，追蹤並更新state
    handleChange2 = name => event => {
        this.setState({
        [name]: event.nativeEvent.target.value,
        });
    }

    Caculator(){
        if(this.state.selected==1){
            console.log(this.state.roi)
            console.log(this.state.total)
            var _return= this.state.roi;
            var _total= this.state.total;
            var _cost=0;
            _cost=Math.ceil(_total/(1+(_return/100)));
            this.setState({cost:_cost});
            this.setState({answer_cost:"red"})
            this.setState({show:"visible"})
            this.setState({o1:"目標投資年報酬率",a1:_return+"%"})
            this.setState({o2:"期末金額",a2:_total+"元"})
            this.setState({o3:"您的投資金額須為：",a3:_cost+"元"})

            
            
            
        }
        else if(this.state.selected==2){
            var _cost= this.state.cost;
            var _total= this.state.total;
            var _return=0;
            _return=(((_total/_cost)-1)*100).toFixed(2);
            this.setState({roi:_return});
            this.setState({answer_return:"red"});
            this.setState({show:"visible"})
            this.setState({o1:"投資金額",a1:_cost+"元"})
            this.setState({o2:"期末金額",a2:_total+"元"})
            this.setState({o3:"您的目標投資年報酬率：",a3:_return+"%"})

        }
        else if(this.state.selected==3){
            var _cost= this.state.cost;
            var _return= this.state.roi;
            var _total=0;
            _total=Math.floor(_cost*(1+(_return/100)));
            this.state.total= _total;
            this.setState({total:_total});
            this.setState({answer_total:"red"});
            this.setState({show:"visible"})
            this.setState({o1:"投資金額",a1:_cost+"元"})
            this.setState({o2:"目標投資年報酬率",a2:_return+"%"})
            this.setState({o3:"您的期末金額：",a3:_total+"元"})


        }
    }

    Clear(){
        this.setState({cost:''});
        this.setState({roi:''});
        this.setState({total:''})
        this.setState({answer_total:''})
        this.setState({answer_cost:''})
        this.setState({answer_return:''})
        this.setState({show:"hidden"})
    }
    
    
    

    
    
    render(){
    return(
        <div>
            <Container>
            <Row>
            <div className="dollor-cost-average-sub">
                <Row>
                    <div className='little-title'>選擇欲計算答案：</div>
                        <div className="little-radio-large">
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" value={this.state.selected} onChange={this.handleChange} row>
                                <FormControlLabel value="1" control={<Radio />} label="每年投資金額" />
                                <FormControlLabel value="2" control={<Radio />} label="目標投資年報酬率" />
                                <FormControlLabel value="3" control={<Radio />} label="期末金額" />
                            </RadioGroup>
                        </FormControl>
                        </div>
                </Row>
                <Row>
                    <Col sm={6}>
                            <table id="dollor-table">
                                <tr>
                                    每年投資金額
                                </tr>
                                <tr>
                                    <input style={{"width":"180px",color:this.state.answer_cost}} type="number" name="1" min="1" max="100000000000" required disabled={this.state.selected==1} onChange={this.handleChange2('cost')} value={this.state.cost}></input> 元
                                </tr>
                                <tr>
                                    目標投資年報酬率
                                    
                                </tr>
                                <tr>
                                    <input style={{"width":"180px",color:this.state.answer_return}} type="number" name="2" min="-100000000000" max="100000000000" required disabled={this.state.selected==2} onChange={this.handleChange2('roi')} value={this.state.roi}></input> %
                                </tr>
                                <tr>
                                    期末金額
                                </tr>
                                <tr><input style={{"width":"180px",color:this.state.answer_total}} type="number" name="3" min="-100000000000" max="10000000000000" required disabled={this.state.selected==3} onChange={this.handleChange2('total')} value={this.state.total}></input> 元
                                </tr>
                                <tr>
                                    <th colspan="2">
                                        <div className="dollor-table-btn">
                                            <button className="set-btn" value="重新設置" onClick={this.Clear}>重新設置</button> &nbsp;&nbsp;&nbsp;
                                            <button className="set-btn" value="試算結果" onClick={this.Caculator}>試算結果</button>
                                        </div>
                                    </th>
                                </tr>
                            </table>
                    </Col>
                    <Col sm={6}>
                        <div className="outlook-sub">
                            <h5 style={{fontWeight:"normal"}}>試算結果</h5>
                            <div style={{visibility:this.state.show}}>
                                <div>您設定：</div>
                                <div>{this.state.o1}：{this.state.a1}</div>
                                <div>{this.state.o2}：{this.state.a2}</div>
                                <hr></hr>
                                <div>根據計算，</div>
                                <div>{this.state.o3}{this.state.a3}</div>
                            </div>
                        </div>
                        
                    </Col>
                </Row>
            </div>
            </Row>
            </Container>
        </div>
 
    )}
}

export default Caculate;
