import React from 'react'
import { Form, Checkbox, Header, Button, Message, Label, Step } from 'semantic-ui-react'
import './GuessesList.scss'
import _ from 'lodash'

export default class GuessesList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedAnswer: '',
      playerIndex: 0,
      slicedPlayers: [],
      guesses: {},
      playerAnswers: []
    }
  }

  componentDidMount() {
    const { players, playerAnswers, playerTurnIndex } = this.props
    let slicedPlayers = _.slice(players, 0, playerTurnIndex).concat(_.slice(players, playerTurnIndex + 1, players.length))
    this.setState({
      slicedPlayers: slicedPlayers,
      playerAnswers: playerAnswers
    })
  }

  submitGuess() {
    const { guesses, playerIndex, selectedAnswer, slicedPlayers } = this.state
    guesses[slicedPlayers[playerIndex]] = selectedAnswer
    this.setState({
      guesses: guesses,
      playerIndex: playerIndex + 1,
      selectedAnswer: ''
    })
  }

  finalGuesses() {
    this.submitGuess()
    this.props.sendGuesses(this.state.guesses)
  }
  
  render() {
    const { playerIndex, selectedAnswer, slicedPlayers, playerAnswers } = this.state
    return (
      <div className='guessesList__container'>
        <Header textAlign='center' size='large'>Guess the Drawing</Header>
        <Header>Player Turn</Header>
        <Step.Group size='large'>
          {slicedPlayers.map((player, id) => (
            <Step active={player === slicedPlayers[playerIndex]} key={id}>{player}</Step>
          ))}
        </Step.Group>
        <div className='guessesList__main_container'>
          <Message size='large'>What do you think this drawing is?</Message>
          <Form className='guessesList__guesses_container'>
            <Form.Field>
              <Checkbox 
                label={playerAnswers[0]} 
                name='guessGroup'
                checked={selectedAnswer === 0}
                value={0}
                onChange={(e, { value }) => this.setState({ selectedAnswer: value })}
              />
            </Form.Field>
            <Form.Field>  
              <Checkbox  
                label={playerAnswers[1]} 
                name='guessGroup'
                checked={selectedAnswer === 1}
                value={1}
                onChange={(e, { value }) => this.setState({ selectedAnswer: value })}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox 
                label={playerAnswers[2]} 
                name='guessGroup'
                checked={selectedAnswer === 2}
                value={2}
                onChange={(e, { value }) => this.setState({ selectedAnswer: value })}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox 
                label={playerAnswers[3]} 
                name='guessGroup'
                checked={selectedAnswer === 3}
                value={3}
                onChange={(e, { value }) => this.setState({ selectedAnswer: value })}
              />
            </Form.Field>
          </Form>
          {playerIndex !== slicedPlayers.length - 1 ? <Button size='huge' onClick={() => this.submitGuess()}>Submit</Button> : <Button size='huge' onClick={() => this.finalGuesses()}>Submit and See Results</Button>}
        </div>
      </div>
    )
  }
}