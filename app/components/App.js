import React from 'react'
// import PasswordInput from './PasswordInput'
import PlayerSelection from './Players/PlayerSelection'
import AnswersList from './Answers/AnswersList'
import DrawnImage from './DrawnImage/DrawnImage'
import DrawingCanvas from './Canvas/DrawingCanvas'
import { Form, Checkbox, Button } from 'semantic-ui-react'
import _ from 'lodash'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      view: 'players',
      viewsList: ['players', 'draw', 'answers', 'guesses', 'results'],
      drawingURL: '',
      players: [],
      correctAnswer: '',
      // fakeAnswer1: '',
      // fakeAnswer2: '',
      // fakeAnswer3: '',
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

  letsDraw(names) {
    this.setState({
      players: names,
      view: 'draw'
    })
  }

  goBack() {
    let { view, viewsList } = this.state
    let viewIndex = viewsList.indexOf(view)
    let newView = viewsList[viewIndex - 1]
    this.setState({ view: newView })
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

  submitAnswers(answersArray, correct) {
    // let { correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3 } = this.state
    // let answersArray = [correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3]
    this.setState({ 
      view: 'guesses',
      answers: _.shuffle(answersArray),
      correctAnswer: correct
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
    const { view, drawingURL, players, correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3, selectedAnswer, playerIndex, answers, guesses } = this.state

    switch(view) {
      case 'players':
        return (
          <div className='players_container'>
            <PlayerSelection 
              updateNames={(names) => this.letsDraw(names)}
            />
          </div>
        )
      case 'draw':
        return (
        <div className='draw_container'>
          <div>
            {players.map((player, index) => <p key={index}>{player}</p> )}
          </div>
          <DrawingCanvas 
            sketchRef={(value) => this.saveDrawing(value)}
          />
          <Button onClick={() => this.goBack()}>Go Back</Button>
        </div>
        )
      case 'answers':
        return (
          <div className='answers_container'>
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
            <AnswersList 
              answers={(answersArray, correct) => this.submitAnswers(answersArray, correct)}
            />
            {/* <div>
              <label>Correct Answer</label>
              <input type="text" onChange={(e) => this.updateAnswers(e.target.value, 'correct')}/>
              <label>Fake Answer</label>
              <input type="text" onChange={(e) => this.updateAnswers(e.target.value, 'fake1')}/>
              <label>Fake Answer</label>
              <input type="text" onChange={(e) => this.updateAnswers(e.target.value, 'fake2')}/>
              <label>Fake Answer</label>
              <input type="text" onChange={(e) => this.updateAnswers(e.target.value, 'fake3')}/>
            </div>
            <Button onClick={() => this.submitAnswers()}>Submit Answers</Button> */}
          </div>
        )
      case 'guesses':
        return (
          <div className='guesses_container'>
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
            {playerIndex !== players.length - 1 ? <Button onClick={() => this.submitGuess()}>Submit</Button> : <Button onClick={() => this.seeResults()}>Submit and See Results</Button>}
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
