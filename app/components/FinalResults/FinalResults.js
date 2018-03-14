import React, { Component } from 'react'
import { Header, Card, Image } from 'semantic-ui-react'
import './FinalResults.scss'
import _ from 'lodash'

export default class FinalResult extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      winners: []
    }
  }

  componentDidMount() {
    const { playerImages, playerPoints } = this.props
    let max = _.max(_.values(playerPoints))
    let winningPlayers = []
    for (let key in playerPoints) {
      if (playerPoints[key] === max) {
        winningPlayers.push(key)
      }
    }
    this.setState({
      winners: winningPlayers
    })
  }
  
  render() {
    const { winners } = this.state
    return (
      <div className='finalResults__container'>
        <Header className='finalResults__header' textAlign='center' size='huge'>Winners!</Header>
        <div className='finalResults__winners'>
        {winners.map((winner, id) => (
          <div key={id}>
            <Card raised>
              <Card.Content>
                <Image className='' src={this.props.playerImages[winner]} />
                <Card.Description>
                  <Header size='huge' textAlign='center'>{winner}</Header>
                </Card.Description>
              </Card.Content>
            </Card>
            <Header size='huge' textAlign='center'>{this.props.playerPoints[winner]} points</Header>
          </div>
          ))}
        </div>
      </div>
    )
  }
}