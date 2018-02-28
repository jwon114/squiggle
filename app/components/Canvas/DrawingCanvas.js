import React from 'react'
import { SketchField, Tools } from 'react-sketch'
import { Dropdown } from 'semantic-ui-react'
import './DrawingCanvas.scss'

export default class DrawingCanvas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'transparent',
      tool: Tools.Pencil,
      lineColor: 'black'
    }
  }

  updateSketch() {
    this.props.sketchRef(this.sketch.toDataURL())
  }

  selectTool(value) {
    this.setState({ tool: value })
  }

  selectColor(value) {
    this.setState({ lineColor: value })
  }

  render() {
    let { backgroundColor, tool, lineColor } = this.state
    let toolsOptions = [
        {
          text: 'Pencil', 
          value: Tools.Pencil
        },
        {
          text: 'Rectangle',
          value: Tools.Rectangle
        },
        {
          text: 'Circle',
          value: Tools.Circle
        },
        {
          text: 'Line',
          value: Tools.Line
        }
      ]
    let colorOptions = [
      {
        text: 'Black',
        value: 'black'
      },
      {
        text: 'Red',
        value: 'red'
      },
      {
        text: 'Green',
        value: 'green'
      },
      {
        text: 'Blue',
        value: 'blue'
      }
    ]
    
    return (
      <div className='drawingCanvas__container'>
        <Dropdown
          className='drawingCanvas__tool_dropdown' 
          value={tool} 
          placeholder='Drawing Tools' 
          selection 
          options={toolsOptions} 
          onChange={(e, { value }) => this.selectTool(value)} 
        />
        <Dropdown
          className='drawingCanvas__color_dropdown' 
          value={lineColor} 
          placeholder='Line Color' 
          selection 
          options={colorOptions} 
          onChange={(e, { value }) => this.selectColor(value)} 
        />
        <SketchField
          className='drawingCanvas__sketchfield'
          ref={c => this.sketch = c} 
          width='768px' 
          height='576px' 
          tool={tool}
          backgroundColor={backgroundColor}
          lineColor={lineColor}
          lineWidth={3}
        />
        <button onClick={() => this.updateSketch()}>Submit Drawing</button>
      </div>
    )
  }
}