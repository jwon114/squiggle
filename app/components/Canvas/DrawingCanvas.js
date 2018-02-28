import React from 'react'
import { SketchField, Tools } from 'react-sketch'
import { Dropdown, Button, Label } from 'semantic-ui-react'
import { CompactPicker, CirclePicker } from 'react-color'
import { Slider } from 'react-semantic-ui-range'
import './DrawingCanvas.scss'

export default class DrawingCanvas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'transparent',
      tool: Tools.Pencil,
      lineColor: '#000000',
      lineWidth: 3
    }
  }

  updateSketch() {
    this.props.sketchRef(this.sketch.toDataURL())
  }

  render() {
    let { backgroundColor, tool, lineColor, lineWidth } = this.state
    const toolsOptions = [
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
    const colorOptions = [
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
    const sliderOptions = {
      start: 3,
      min: 1,
      max: 10,
      step: 1,
      onChange: value => { this.setState({ lineWidth: value })}
    }
    return (
      <div className='drawingCanvas__container'>
        <div className='drawingCanvas__main_container'>
          <div className='drawingCanvas__sketchField_container'>
            <SketchField
              className='drawingCanvas__sketchField'
              ref={c => this.sketch = c} 
              // width='768px' 
              width='75vw'
              // height='576px'
              height='75vh' 
              tool={tool}
              backgroundColor={backgroundColor}
              lineColor={lineColor}
              lineWidth={lineWidth}
            />
          </div>
          <div className='drawingCanvas__toolkit'>
            <Dropdown
              className='drawingCanvas__tool_dropdown' 
              value={tool} 
              placeholder='Drawing Tools' 
              selection 
              options={toolsOptions} 
              onChange={(e, { value }) => this.setState({ tool: value })} 
            />
            <div className='drawingCanvas__colors'>
              <Label>Colours</Label>
              <CirclePicker 
                color={lineColor}
                onChange={color => this.setState({ lineColor: color.hex })}
              />
              <Button 
                color='black'
                onClick={() => this.setState({ lineColor: '#000000' })}>
                Set to Default Color
              </Button>
            </div>
            <div className='drawingCanvas__line_width'>
              <Label>Line Width</Label>
              <Slider 
                color='black'
                settings={sliderOptions}
              />
            </div>
          </div>
        </div>
        <button onClick={() => this.updateSketch()}>Submit Drawing</button>
      </div>
    )
  }
}