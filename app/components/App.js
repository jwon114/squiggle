import React from 'react'
// import PasswordInput from './PasswordInput'
import PlayerSelection from './Players/PlayerSelection'
import AnswersList from './Answers/AnswersList'
import DrawnImage from './DrawnImage'
import {SketchField, Tools} from 'react-sketch';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      view: 'players',
      viewsList: ['players', 'draw', 'answers', 'guesses', 'result'],
      backgroundColor: 'transparent',
      tool: Tools.Pencil,
      lineColor: 'black',
      drawing: '',
      player1Name: 'Player 1',
      player2Name: 'Player 2',
      player3Name: 'Player 3',
      player4Name: 'Player 4'
      // players: [player1Name, player2Name, player3Name, player4Name]
    }
  }

  saveDrawing() {
    // console.log(this.sketch.toDataURL())
    this.setState({ 
      drawing: this.sketch.toDataURL(),
      view: 'answers'
    })
  }

  letsDraw() {
    this.setState({ view: 'draw' })
  }

  goBack() {
    let { view, viewsList } = this.state
    let viewIndex = viewsList.indexOf(view)
    let newView = viewsList[viewIndex - 1]
    this.setState({ view: newView })
  }

  updatePlayerName(name, playerId) {
    switch(playerId) {
      case 1:
        this.setState({ player1Name: name })
        break
      case 2:
        this.setState({ player2Name: name })
        break
      case 3:
        this.setState({ player3Name: name })
        break
      case 4:
        this.setState({ player4Name: name })
        break
    }
  }

  renderView() {
    const { view, backgroundColor, tool, lineColor, drawing, player1Name, player2Name, player3Name, player4Name } = this.state
    switch(view) {
      case 'players':
        return (
          <div>
            <h2>How many players?</h2>
            <PlayerSelection 
              updateName={(name, playerId) => this.updatePlayerName(name, playerId)}
              player1Name={player1Name}
              player2Name={player2Name}
              player3Name={player3Name}
              player4Name={player4Name}
            />
            <button onClick={() => this.letsDraw()}>Draw</button>
          </div>
        )
      case 'draw':
        return (
        <div>
          <SketchField
            className="sketchField"
            ref={(c) => this.sketch = c} 
            width='768px' 
            height='576px' 
            tool={tool}
            backgroundColor={backgroundColor}
            lineColor={lineColor}
            lineWidth={3}
          />
          <button onClick={() => this.saveDrawing()}>Save</button>
          <button onClick={() => this.goBack()}>Go Back</button>
        </div>
        )
      case 'answers':
        return (
          <div>
            <h2>Create some answers</h2>
            <DrawnImage
              className="drawnImage"
              drawing={drawing}
              width='768px' 
              height='576px'
            />
            <AnswersList />
          </div>
        )
      case 'guesses':

      case 'results':

      default:

    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>squiggle</h1>
        {this.renderView()}
      </div>
    )
  }

}
