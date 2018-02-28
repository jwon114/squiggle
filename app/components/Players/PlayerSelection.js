import React from 'react'
import { Button, Card, Input } from 'semantic-ui-react'
import _ from 'lodash'
import './PlayerSelection.scss'

export default class PlayerSelection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      player1Name: '',
      player2Name: '',
      player3Name: '',
      player4Name: '',
      playerCount: 2
    }
  }

  updatePlayerCount(count) {
    switch(count) {
      case 2:
        this.setState({ 
          player3Name: '',
          player4Name: '' 
        })
        // this.props.updateName('', 3)
        // this.props.updateName('', 4)
        break
      case 3:
        this.setState({ 
          player4Name: '' 
        })
        // this.props.updateName('', 4)
        break
      case 4:
        this.setState({ 
          player4Name: '' 
        })
        // this.props.updateName('', 4)
        break
    }
    this.setState({ playerCount: count })
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

  validateNameInput() {
    let { playerCount, player1Name, player2Name, player3Name, player4Name } = this.state
    switch(playerCount) {
      case 2:
        if (player1Name !== '' && player2Name !== '') { 
          return false 
        }
      case 3:
        if (player1Name !== '' && player2Name !== '' && player3Name !== ''){ 
          return false 
        }
      case 4:
        if (player1Name !== '' && player2Name !== '' && player3Name !== '' && player4Name !== '') { 
          return false 
        } 
    }
    return true
  }

  submitNames() {
    let { playerCount, player1Name, player2Name, player3Name, player4Name } = this.state 
    let playersArray = []
    switch(playerCount) {
      case 2:
        playersArray = [player1Name, player2Name]
        break
      case 3:
        playersArray = [player1Name, player2Name, player3Name]
        break
      case 4:
        playersArray = [player1Name, player2Name, player3Name, player4Name]
        break
    }
    this.props.updateNames(_.shuffle(playersArray))
  }

  renderView() {
    let { playerCount, playerNames, player1Name, player2Name, player3Name, player4Name } = this.state
    switch(playerCount) {
      case 2:
        return (    
          <div className='playerSelection__card_wrapper'>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 1
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 1)}
                      value={player1Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 2
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 2)}
                      value={player2Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
          </div>    
        )
      case 3:
        return (    
          <div className='playerSelection__card_wrapper'>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 1
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 1)}
                      value={player1Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 2
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 2)}
                      value={player2Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 3
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 3)}
                      value={player3Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
          </div>    
        )
      case 4:
        return (    
          <div className='playerSelection__card_wrapper'>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 1
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 1)}
                      value={player1Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 2
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 2)}
                      value={player2Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 3
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 3)}
                      value={player3Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 4
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 4)}
                      value={player4Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
          </div>    
        )
      default:
        return ''
    } 
  }

  render() {
    return (
      <div className='playerSelection__container'>
        <div className='playerSelection__number_container'>
          <h2>How many players?</h2>
          <Button.Group>
            <Button
              toggle
              active={this.state.playerCount === 2}
              size='massive' 
              onClick={() => this.updatePlayerCount(2)}>2
            </Button>
            <Button 
              toggle
              active={this.state.playerCount === 3}
              size='massive' 
              onClick={() => this.updatePlayerCount(3)}>3
            </Button>
            <Button 
              toggle
              active={this.state.playerCount === 4}
              size='massive' 
              onClick={() => this.updatePlayerCount(4)}>4
            </Button>
          </Button.Group>
        </div>
        {this.renderView()}
        <Button 
          floated={'right'}
          onClick={() => this.submitNames()}
          size={'massive'}
          disabled={this.validateNameInput()}>
          Let's Draw
        </Button>
      </div>
    )
  }
}