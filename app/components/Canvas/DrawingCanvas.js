import React from 'react'
import { SketchField, Tools } from 'react-sketch'
import { Dropdown, Button, Label, Icon } from 'semantic-ui-react'
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
      lineWidth: 3,
      canUndo: false,
      canRedo: false
    }
  }

  updateSketch() {
    this.props.sketchRef(this.sketch.toDataURL())
  }

  onSketchChange() {
    let prev = this.state.canUndo;
    let now = this.sketch.canUndo();
    if (prev !== now) {
      this.setState({ canUndo: now });
    }
  }

  undo() {
    this.sketch.undo();
    this.setState({
      canUndo: this.sketch.canUndo(),
      canRedo: this.sketch.canRedo()
    })
  }

  redo() {
    this.sketch.redo();
    this.setState({
      canUndo: this.sketch.canUndo(),
      canRedo: this.sketch.canRedo()
    })
  }

  render() {
    const { backgroundColor, tool, lineColor, lineWidth, canUndo, canRedo } = this.state
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
              width='75vw'
              height='75vh' 
              tool={tool}
              backgroundColor={backgroundColor}
              lineColor={lineColor}
              lineWidth={lineWidth}
              onChange={() => this.onSketchChange()}
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
              <div className='drawingCanvas__undo_eraser'>
                <Button
                  compact
                  size='small'
                  disabled={!canUndo}
                  onClick={() => this.undo()}>
                  <Icon
                    size='big'
                    name='undo'>
                  </Icon>
                </Button>
                <Button
                  compact
                  size='small'
                  disabled={!canRedo}
                  onClick={() => this.redo()}>
                  <Icon
                    size='big'
                    name='undo'
                    flipped='horizontally'>
                  </Icon>
                </Button>
                <Button
                  color='grey'
                  onClick={() => this.setState({ lineColor: '#FFFFFF' })}>
                  Eraser
                </Button>
              </div>
              <Button 
                color='black'
                onClick={() => this.setState({ lineColor: '#000000' })}>
                Set to Default Colour
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
        <div className='drawingCanvas__submit_button_container'>
          <Button size='huge' onClick={() => this.updateSketch()}>Submit Drawing</Button>
        </div>
      </div>
    )
  }
}