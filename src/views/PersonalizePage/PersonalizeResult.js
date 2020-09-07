import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import { load_cookies } from 'views/Function/Cookie_function.js' // 引入cookies


const data = [
  // { name: '保守型', value: 200 },
  { name: '風險指數', value: 300 },
  // { name: '成長型', value: 800 },
  // { name: '積極型', value: 1000 },
];


// const styles = () => {
//   customSpace: {
//     backgroundColor: "#f8f5c4",
//     '& h2': {
//       fontFamily:"Microsoft JhengHei",
//       fontWeight: 900,
//       fontSize:25,
//       // backgroundColor: "#f8f5c4"
//     }
    

//   }
// }

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    // <g classes={{root: classes.customSpace}}>
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 8}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text style={{fontSize:"16"}} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#b75d69">{`${value}`}</text>
    </g>
  );
};


export default class Result extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

  state = {
    activeIndex: 0,
  };
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      //fields: {},
      errors: {}
  }

  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <PieChart width={360} height={250}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={250}
          cy={120}
          innerRadius={50}
          outerRadius={70}
          fill="#14416e"
          dataKey="value"
          onMouseEnter={this.onPieEnter}
        />
      </PieChart>
    );
  }
}
