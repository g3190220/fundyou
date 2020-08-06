
import React from 'react'
//import '../node_modules/react-resizable/css/styles.css';
import { ResizableBox } from 'react-resizable-box'
export default class ChartConfig extends React.Component {
  render() {
    const {children} = this.props //children获取我们前面定义的data
    const width = 500;
    const height = 300;
    const style = {width: '100%',height: '100%'}
    return (
      <div>
        <ResizableBox width={width} height={height}>
          <div style={style}>
            {children({ })}
          </div>
        </ResizableBox>
      </div>
    )
}
}