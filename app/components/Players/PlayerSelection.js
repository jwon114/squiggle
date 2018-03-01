import React from 'react'
import { Button, Card, Input, Message, Header, Image } from 'semantic-ui-react'
import P1Image from './images/doge.png'
import P2Image from './images/pun_dog.jpg'
import P3Image from './images/sloth.jpg'
import P4Image from './images/koala.jpg'
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
      playerCount: 2,
      error: ''
    }
  }

  updatePlayerCount(count) {
    switch(count) {
      case 2:
        this.setState({ 
          player3Name: '',
          player4Name: '' 
        })
        break
      case 3:
        this.setState({ 
          player4Name: '' 
        })
        break
      case 4:
        this.setState({ 
          player4Name: '' 
        })
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

  checkNames() {
    let { player1Name, player2Name, player3Name, player4Name } = this.state 
    let namesArray = [player1Name, player2Name, player3Name, player4Name]
    return _.compact(namesArray).length === _(namesArray).compact().uniq().value().length
  }

  submitNames() {
    let { playerCount, player1Name, player2Name, player3Name, player4Name } = this.state 
    let playersArray = []
    if (!this.checkNames()) {
      this.setState({ error: 'Cannot have duplicate player names' })
    } else {
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
      this.setState({ error: '' })
      this.props.updateNames(_.shuffle(playersArray))
    }
  }

  renderView() {
    let { playerCount, playerNames, player1Name, player2Name, player3Name, player4Name } = this.state
    switch(playerCount) {
      case 2:
        return (    
          <div className='playerSelection__card_wrapper'>
              <Card raised>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Player 1
                  </Card.Header>
                  <Image className='playerSelection__player_image' src={P1Image} />
                  <Card.Description>
                    <Input 
                      fluid
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 1)}
                      value={player1Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card raised>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Player 2
                  </Card.Header>
                  <Image className='playerSelection__player_image' src={P2Image} />
                  <Card.Description>
                    <Input 
                      fluid
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
              <Card raised>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Player 1
                  </Card.Header>
                  <Image className='playerSelection__player_image' src={P1Image} />
                  <Card.Description>
                    <Input
                      fluid 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 1)}
                      value={player1Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card raised>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Player 2
                  </Card.Header>
                  <Image className='playerSelection__player_image' src={P2Image} />
                  <Card.Description>
                    <Input
                      fluid 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 2)}
                      value={player2Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card raised>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Player 3
                  </Card.Header>
                  <Image className='playerSelection__player_image' src={P3Image} />
                  <Card.Description>
                    <Input
                      fluid 
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
              <Card raised>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Player 1
                  </Card.Header>
                  <Image className='playerSelection__player_image' src={P1Image} />
                  <Card.Description>
                    <Input
                      fluid 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 1)}
                      value={player1Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card raised>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Player 2
                  </Card.Header>
                  <Image className='playerSelection__player_image' src={P2Image} />
                  <Card.Description>
                    <Input
                      fluid 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 2)}
                      value={player2Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card raised>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Player 3
                  </Card.Header>
                  <Image className='playerSelection__player_image' src={P3Image} />
                  <Card.Description>
                    <Input
                      fluid 
                      placeholder='Name'
                      onChange={(e, { value }) => this.updatePlayerName(value, 3)}
                      value={player3Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card raised>
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Player 4
                  </Card.Header>
                  <Image className='playerSelection__player_image' src={P4Image} />
                  <Card.Description>
                    <Input
                      fluid 
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
          <Header size='huge'>How Many Players?</Header>
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
        <div className='playerSelection__footer'>
          <div className='playerSelection__error'>
            {this.state.error ? <Message compact negative>{this.state.error}</Message> : ''}
          </div>
          <div className='playerSelection__submit_button'>
            <Button
              onClick={() => this.submitNames()}
              size={'massive'}
              disabled={this.validateNameInput()}>
              Let's Draw
            </Button>
          </div>
        </div>
      </div>
    )
  }
}