import React from 'react'
import { Button, Card, Input } from 'semantic-ui-react'

export default class PlayerSelection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      playerCount: 2
    }
  }

  updatePlayerCount(count) {
    switch(count) {
      case 2:
        this.props.updateName('', 3)
        this.props.updateName('', 4)
        break
      case 3:
        this.props.updateName('', 4)
        break
      case 4:
        this.props.updateName('', 4)
        break
    }
    this.setState({ playerCount: count })
  }

  renderView() {
    let { playerCount, playerNames } = this.state
    switch(playerCount) {
      case 2:
        return (    
          <div className='playerSelection__cardWrapper'>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 1
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.props.updateName(value, 1)}
                      value={this.props.player1Name}
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
                      onChange={(e, { value }) => this.props.updateName(value, 2)}
                      value={this.props.player2Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
          </div>    
        )
      case 3:
        return (    
          <div className='playerSelection__cardWrapper'>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 1
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.props.updateName(value, 1)}
                      value={this.props.player1Name}
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
                      onChange={(e, { value }) => this.props.updateName(value, 2)}
                      value={this.props.player2Name}
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
                      onChange={(e, { value }) => this.props.updateName(value, 3)}
                      value={this.props.player3Name}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
          </div>    
        )
      case 4:
        return (    
          <div className='playerSelection__cardWrapper'>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Player 1
                  </Card.Header>
                  <Card.Description>
                    <Input 
                      placeholder='Name'
                      onChange={(e, { value }) => this.props.updateName(value, 1)}
                      value={this.props.player1Name}
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
                      onChange={(e, { value }) => this.props.updateName(value, 2)}
                      value={this.props.player2Name}
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
                      onChange={(e, { value }) => this.props.updateName(value, 3)}
                      value={this.props.player3Name}
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
                      onChange={(e, { value }) => this.props.updateName(value, 4)}
                      value={this.props.player4Name}
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