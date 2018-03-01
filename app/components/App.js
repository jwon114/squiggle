import React from 'react'
// import PasswordInput from './PasswordInput'
import PlayerSelection from './Players/PlayerSelection'
import DrawingCanvas from './Canvas/DrawingCanvas'
import DrawnImage from './DrawnImage/DrawnImage'
import AnswersList from './Answers/AnswersList'
import GuessesList from './Guesses/GuessesList'
import SquiggleLogoFull from '../../public/images/squiggle_logo_full.png'
import { Form, Checkbox, Button, Image } from 'semantic-ui-react'
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
      answers: [],
      // playerIndex: 1,
      // selectedAnswer: '',
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
    this.setState({ 
      view: newView,
      players: []
    })
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
    this.setState({ 
      view: 'guesses',
      answers: _.shuffle(answersArray),
      correctAnswer: correct
    })
  }

  // playerGuess(value) {
  //   this.setState({ selectedAnswer: value })
  // }

  // submitGuess() {
  //   let { guesses, playerIndex, selectedAnswer, players } = this.state
  //   guesses[players[playerIndex]] = selectedAnswer
  //   this.setState({
  //     guesses: guesses,
  //     playerIndex: playerIndex + 1,
  //     selectedAnswer: ''
  //   })
  // }

  seeResults(guesses) {
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
          <DrawingCanvas 
            sketchRef={(value) => this.saveDrawing(value)}
          />
          <Button onClick={() => this.goBack()}>Go Back</Button>
        </div>
        )
      case 'answers':
        return (
          <div className='answers_container'>
            <div className='answers_main'>
              <DrawnImage
                className="drawnImage"
                drawing={drawingURL}
                width='75vw'
                height='75vh'
              />
              <AnswersList 
                answers={(answersArray, correct) => this.submitAnswers(answersArray, correct)}
              />
            </div>
          </div>
        )
      case 'guesses':
        return (
          <div className='guesses_container'>
            <div className='guesses_main'>
              <DrawnImage
                className="drawnImage"
                drawing={drawingURL}
                width='75vw' 
                height='75vh'
              />
              <GuessesList 
                sendGuesses={(guesses) => this.seeResults(guesses)}
                players={players}
                answers={answers}
              />  
            </div>
              {/* <p>{players[playerIndex]}</p>
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
              </Form> */}
            {/* {playerIndex !== players.length - 1 ? <Button onClick={() => this.submitGuess()}>Submit</Button> : <Button onClick={() => this.seeResults()}>Submit and See Results</Button>} */}
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
    let { players } = this.state
    return (
      <div>
        <Image src={SquiggleLogoFull} />
        {players.length !== 0 ? players : ''}
        {this.renderView()}
      </div>
    )
  }

}
