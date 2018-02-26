import React from 'react'
// import PasswordInput from './PasswordInput'
import DrawnImage from './DrawnImage'
import {SketchField, Tools} from 'react-sketch';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.saveDrawing = this.saveDrawing.bind(this)
    this.loadDrawing = this.loadDrawing.bind(this)
    this.state = {
      backgroundColor: 'transparent',
      tool: Tools.Pencil,
      lineColor: 'black',
      drawing: ''
    }
  }

  saveDrawing() {
    console.log(this.sketch.toDataURL())
    this.setState({ drawing: this.sketch.toDataURL() })
  }


  render() {
    const canvas = this.state
    return <div>
      <h1>squiggle</h1>
      <SketchField
        ref={(c) => this.sketch = c} 
        width='768px' 
        height='576px' 
        tool={canvas.tool}
        backgroundColor={canvas.backgroundColor}
        lineColor={canvas.lineColor}
        lineWidth={3}
      />
      <button onClick={this.saveDrawing}>Save</button>
      <DrawnImage
        drawing={this.state.drawing}
        width='768px' 
        height='576px'
      />
    </div>
  }

}
