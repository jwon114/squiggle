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
      max: 20,
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
            <div className='drawingCanvas__tools'>
              <Label color='teal' size='huge'>Tool</Label>
              <Button.Group widths='2' className='drawingCanvas__tools_buttonGroup'>
                <Button 
                  onClick={() => this.setState({ tool: Tools.Pencil })}
                  toggle
                  active={tool === Tools.Pencil}>Pencil
                </Button>
                <Button 
                  onClick={() => this.setState({ tool: Tools.Rectangle })}
                  toggle
                  active={tool === Tools.Rectangle}>Rectangle
                </Button>
                <Button 
                  onClick={() => this.setState({ tool: Tools.Circle })}
                  toggle
                  active={tool === Tools.Circle}>Circle
                </Button>
                <Button 
                  onClick={() => this.setState({ tool: Tools.Line })}
                  toggle
                  active={tool === Tools.Line}>Line
                </Button>
              </Button.Group>
            </div>
            <div className='drawingCanvas__colors'>
              <Label color='teal' size='huge'>Colours</Label>
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
              <Label color='teal' size='huge'>Line Width</Label>
              <Slider 
                color='black'
                settings={sliderOptions}
              />
              <Label size='large' pointing>{lineWidth}</Label>
            </div>
          </div>
        </div>
        <Button size='large' onClick={() => this.updateSketch()}>Submit Drawing</Button>
      </div>
    )
  }
}