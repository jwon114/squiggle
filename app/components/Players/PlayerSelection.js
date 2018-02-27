import React from 'react'
import { Button } from 'semantic-ui-react'

export default class PlayerSelection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      playerCount: 2
    }
  }

  updatePlayerCount(count) {
    console.log(count);
    switch(count) {
      case 2:
        this.props.updateName('', 3)
        this.props.updateName('', 4)
        break
      case 3:
        
        break
      case 4:
        break
    }
    this.setState({ playerCount: count })
  }

  renderView() {
    let { playerCount, playerNames } = this.state
    switch(playerCount) {
      case 2:
        return (    
          <div>
              <label>Player 1</label>
              <input type="text" onChange={(e) => this.props.updateName(e.target.value, 1)} value={this.props.player1Name}/>
              <label>Player 2</label>
              <input type="text" onChange={(e) => this.props.updateName(e.target.value, 2)} value={this.props.player2Name}/>
          </div>    
        )
      case 3:
        return (    
          <div>
              <label>Player 1</label>
              <input type="text" onChange={(e) => this.props.updateName(e.target.value, 1)} value={this.props.player1Name}/>
              <label>Player 2</label>
              <input type="text" onChange={(e) => this.props.updateName(e.target.value, 2)} value={this.props.player2Name}/>
              <label>Player 3</label>
              <input type="text" onChange={(e) => this.props.updateName(e.target.value, 3)} value={this.props.player3Name}/>
          </div>    
        )
      case 4:
        return (    
          <div>
              <label>Player 1</label>
              <input type="text" onChange={(e) => this.props.updateName(e.target.value, 1)} value={this.props.player1Name}/>
              <label>Player 2</label>
              <input type="text" onChange={(e) => this.props.updateName(e.target.value, 2)} value={this.props.player2Name}/>
              <label>Player 3</label>
              <input type="text" onChange={(e) => this.props.updateName(e.target.value, 3)} value={this.props.player3Name}/>
              <label>Player 4</label>
              <input type="text" onChange={(e) => this.props.updateName(e.target.value, 4)} value={this.props.player4Name}/>
          </div>    
        )
      default:
        return ''
    }
      
  }

  render() {
    return (
      <div>
        <Button.Group>
          <Button onClick={() => this.updatePlayerCount(2)}>Two</Button>
          <Button onClick={() => this.updatePlayerCount(3)}>Three</Button>
          <Button onClick={() => this.updatePlayerCount(4)}>Four</Button>
        </Button.Group>
        {this.renderView()}
      </div>
    )
  }
}