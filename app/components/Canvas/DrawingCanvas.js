import React from 'react'
import { SketchField, Tools } from 'react-sketch';
import { Dropdown } from 'semantic-ui-react'

export default class DrawingCanvas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'transparent',
      tool: Tools.Pencil,
      lineColor: 'black',
      sketch: ''
    }
  }

  sketch(value) {
    this.setState({ sketch: value })
  }

  selectTool(value) {
    this.setState({ tool: value })
  }

  render() {
    let { backgroundColor, tool, lineColor, sketch } = this.state
    let tools = [
        {
          text: 'Pencil', 
          value: Tools.Pencil
        },
        {
          text: 'Rectangle',
          value: Tools.Rectangle
        }
      ]
    return (
      <div>
        <Dropdown value={tool} placeholder='Drawing Tools' selection options={tools} onChange={(e, { value }) => this.selectTool(value)} />
        <SketchField
          className='sketchField'
          ref={(c) => this.sketch = c} 
          width='768px' 
          height='576px' 
          tool={tool}
          backgroundColor={backgroundColor}
          lineColor={lineColor}
          lineWidth={3}
        />
      </div>
    )
  }
}