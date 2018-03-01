import React from 'react'
import { Form, Checkbox, Header, Button, Message, Label, Step } from 'semantic-ui-react'
import './GuessesList.scss'

export default class GuessesList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedAnswer: '',
      playerIndex: 0,
      players: [],
      guesses: {}
    }
  }

  componentDidMount() {
    let { players } = this.props
    players.shift()
    this.setState({
      players: players
    })
  }

  submitGuess() {
    let { guesses, playerIndex, selectedAnswer } = this.state
    let { players } = this.props
    guesses[players[playerIndex]] = selectedAnswer
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
    let { players, answers } = this.props
    let { playerIndex, selectedAnswer } = this.state
    return (
      <div className='guessesList__container'>
        <Header textAlign='center' size='large'>Guess the Drawing</Header>
        <span>Player Turn</span>
        <Step.Group size='large'>
          {players.map((player, id) => (
            <Step active={player === players[playerIndex]} key={id}>{player}</Step>
          ))}
        </Step.Group>
        <div className='guessesList__main_container'>
          <Message>What do you think this drawing is?</Message>
          <Form>
            <Form.Field>
              <Checkbox 
                label={answers[0]} 
                name='guessGroup'
                checked={selectedAnswer === 0}
                value={0}
                onChange={(e, { value }) => this.setState({ selectedAnswer: value })}
              />
            </Form.Field>
            <Form.Field>  
              <Checkbox  
                label={answers[1]} 
                name='guessGroup'
                checked={selectedAnswer === 1}
                value={1}
                onChange={(e, { value }) => this.setState({ selectedAnswer: value })}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox 
                label={answers[2]} 
                name='guessGroup'
                checked={selectedAnswer === 2}
                value={2}
                onChange={(e, { value }) => this.setState({ selectedAnswer: value })}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox 
                label={answers[3]} 
                name='guessGroup'
                checked={selectedAnswer === 3}
                value={3}
                onChange={(e, { value }) => this.setState({ selectedAnswer: value })}
              />
            </Form.Field>
          </Form>
          {playerIndex !== players.length - 1 ? <Button onClick={() => this.submitGuess()}>Submit</Button> : <Button onClick={() => this.finalGuesses()}>Submit and See Results</Button>}
        </div>
      </div>
    )
  }
}