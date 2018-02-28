import React from 'react'
// import PasswordInput from './PasswordInput'
import PlayerSelection from './Players/PlayerSelection'
import AnswersList from './Answers/AnswersList'
import DrawnImage from './DrawnImage/DrawnImage'
import DrawingCanvas from './Canvas/DrawingCanvas'
import { Form, Checkbox } from 'semantic-ui-react'
import _ from 'lodash'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      view: 'players',
      viewsList: ['players', 'draw', 'answers', 'guesses', 'results'],
      drawingURL: '',
      player1Name: '',
      player2Name: '',
      player3Name: '',
      player4Name: '',
      players: [],
      correctAnswer: '',
      fakeAnswer1: '',
      fakeAnswer2: '',
      fakeAnswer3: '',
      answers: [],
      playerIndex: 1,
      selectedAnswer: '',
      guesses: {}
    }
  }

  saveDrawing(value) {
    this.setState({
      drawingURL: value,
      view: 'answers' 
    })
  }

  letsDraw() {
    let { player1Name, player2Name, player3Name, player4Name } = this.state
    let playersArray = []
    playersArray = [player1Name, player2Name]

    if (player3Name !== '') { playersArray.push(player3Name) }
    if (player4Name !== '') { playersArray.push(player4Name) }

    this.setState({ 
      view: 'draw',
      players: playersArray 
    })
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

  updateAnswers(value, type) {
    switch(type) {
      case 'correct':
        this.setState({ correctAnswer: value })
        break
      case 'fake1':
        this.setState({ fakeAnswer1: value })
        break
      case 'fake2':
        this.setState({ fakeAnswer2: value })
        break
      case 'fake3':
        this.setState({ fakeAnswer3: value })
        break
    }
    
  }

  submitAnswers() {
    let { correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3 } = this.state
    let answersArray = [correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3]
    this.setState({ 
      view: 'guesses',
      answers: _.shuffle(answersArray)
    })
  }

  playerGuess(value) {
    this.setState({ selectedAnswer: value })
  }

  submitGuess() {
    let { guesses, playerIndex, selectedAnswer, players } = this.state
    guesses[players[playerIndex]] = selectedAnswer
    this.setState({
      guesses: guesses,
      playerIndex: playerIndex + 1,
      selectedAnswer: ''
    })
  }

  seeResults() {
    let { guesses, playerIndex, selectedAnswer, players } = this.state
    guesses[players[playerIndex]] = selectedAnswer
    this.setState({
      guesses: guesses,
      view: 'results'
    })
  }

  renderView() {
    const { view, drawingURL, player1Name, player2Name, player3Name, player4Name, players, correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3, selectedAnswer, playerIndex, answers, guesses } = this.state

    switch(view) {
      case 'players':
        return (
          <div className='playerSelection'>
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
          <div>
            {players.map((player, index) => <p key={index}>{player}</p> )}
          </div>
          <DrawingCanvas 
            sketchRef={(value) => this.saveDrawing(value)}
          />
          <button onClick={() => this.goBack()}>Go Back</button>
        </div>
        )
      case 'answers':
        return (
          <div>
            <h2>Create some answers</h2>
            <div>
              {players.map((player, index) => <p key={index}>{player}</p> )}
            </div>
            <DrawnImage
              className="drawnImage"
              drawing={drawingURL}
              // width='768px' 
              width='75vw'
              // height='576px'
              height='75vh'
            />
            <div>
              <label>Correct Answer</label>
              <input type="text" onChange={(e) => this.updateAnswers(e.target.value, 'correct')}/>
              <label>Fake Answer</label>
              <input type="text" onChange={(e) => this.updateAnswers(e.target.value, 'fake1')}/>
              <label>Fake Answer</label>
              <input type="text" onChange={(e) => this.updateAnswers(e.target.value, 'fake2')}/>
              <label>Fake Answer</label>
              <input type="text" onChange={(e) => this.updateAnswers(e.target.value, 'fake3')}/>
            </div>
            <button onClick={() => this.submitAnswers()}>Submit Answers</button>
          </div>
        )
      case 'guesses':
        return (
          <div>
            <h2>Guess the drawing</h2>
            <DrawnImage
              className="drawnImage"
              drawing={drawingURL}
              width='768px' 
              height='576px'
            />
            <div>        
              <p>{players[playerIndex]}</p>
              <Form>
                <Form.Field>
                  <Checkbox 
                    label={answers[0]} 
                    name='guessGroup'
                    checked={selectedAnswer === 0}
                    value={0}
                    onChange={(e, { value }) => this.playerGuess(value)}
                  />
                </Form.Field>
                <Form.Field>  
                  <Checkbox  
                    label={answers[1]} 
                    name='guessGroup'
                    checked={selectedAnswer === 1}
                    value={1}
                    onChange={(e, { value }) => this.playerGuess(value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox 
                    label={answers[2]} 
                    name='guessGroup'
                    checked={selectedAnswer === 2}
                    value={2}
                    onChange={(e, { value }) => this.playerGuess(value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox 
                    label={answers[3]} 
                    name='guessGroup'
                    checked={selectedAnswer === 3}
                    value={3}
                    onChange={(e, { value }) => this.playerGuess(value)}
                  />
                </Form.Field>
              </Form>
            </div>
            {playerIndex !== players.length - 1 ? <button onClick={() => this.submitGuess()}>Submit</button> : <button onClick={() => this.seeResults()}>Submit and See Results</button>}
          </div>
        )
      case 'results':
        let correctIndex = answers.indexOf(correctAnswer)
        let correctPlayers = []
        
        for (let [playerName, guessIndex] of Object.entries(guesses)) {
          if (guessIndex === correctIndex) {
            correctPlayers.push(playerName)
          }
        }

        return (
          <div>
            <h2>results</h2>
            <DrawnImage
              className="drawnImage"
              drawing={drawingURL}
              width='768px' 
              height='576px'
            />
            <div>
              <p>The correct answer is: {correctAnswer}</p>
            </div>
            <div>
              Players who got it correct: {correctPlayers}
            </div>
          </div>
        )
      default:

    }
  }

  render() {
    return (
      <div>
        <h1>squiggle</h1>
        {this.renderView()}
      </div>
    )
  }

}
