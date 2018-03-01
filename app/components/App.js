import React from 'react'
// import PasswordInput from './PasswordInput'
import PlayerSelection from './Players/PlayerSelection'
import DrawingCanvas from './Canvas/DrawingCanvas'
import DrawnImage from './DrawnImage/DrawnImage'
import AnswersList from './Answers/AnswersList'
import GuessesList from './Guesses/GuessesList'
import Results from './Results/Results'
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
      playerAnswers: [],
      playerTurnIndex: 0,
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

  submitAnswers(answersArray, correct) {
    this.setState({ 
      playerAnswers: answersArray,
      correctAnswer: correct,
      view: 'guesses'
    })
  }

  seeResults(guesses) {
    this.setState({
      guesses: guesses,
      view: 'results'
    })
  }

  renderView() {
    let { view, drawingURL, players, correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3, selectedAnswer, playerIndex, playerAnswers, guesses } = this.state

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
                playerAnswers={(answersArray, correct) => this.submitAnswers(answersArray, correct)}
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
                playerAnswers={playerAnswers}
              />  
            </div>
          </div>
        )
      case 'results':
        let { guesses, correctAnswer, answers } = this.state
        // let correctIndex = answers.indexOf(correctAnswer)
        // let correctPlayers = []
        
        // for (let [playerName, guessIndex] of Object.entries(guesses)) {
        //   if (guessIndex === correctIndex) {
        //     correctPlayers.push(playerName)
        //   }
        // }

        return (
          <div className='results_container'>
            <div className='results_main'>
              <DrawnImage
                className="drawnImage"
                drawing={drawingURL}
                width='768px' 
                height='576px'
              />
              <Results 
                guesses={guesses}
                correctAnswer={correctAnswer}
                playerAnswers={playerAnswers}
              />
            </div>
            {/* <div>
              <p>The correct answer is: {correctAnswer}</p>
            </div>
            <div>
              Players who got it correct: {correctPlayers}
            </div> */}
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
