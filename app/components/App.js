import React from 'react'
import PlayerSelection from './Players/PlayerSelection'
import PlayerIcon from './Players/PlayerIcon'
import DrawingCanvas from './Canvas/DrawingCanvas'
import DrawnImage from './DrawnImage/DrawnImage'
import AnswersList from './Answers/AnswersList'
import GuessesList from './Guesses/GuessesList'
import Results from './Results/Results'
import SquiggleLogoFull from '../../public/images/squiggle_logo_full.png'
import SquiggleLogoSmall from '../../public/images/squiggle_logo_small.png'
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
      playerImages: {},
      correctAnswer: '',
      playerAnswers: [],
      playerTurnIndex: 0,
      guesses: {},
      round: 1,
      playerPoints: {}
    }
  }

  saveDrawing(value) {
    this.setState({
      drawingURL: value,
      view: 'answers' 
    })
  }

  letsDraw(names, images) {
    let playerPoints = {}
    names.forEach(name => (
      playerPoints[name] = 0
    ))
    this.setState({
      players: names,
      playerImages: images,
      playerPoints: playerPoints,
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

  startNextRound() {
    let { round, playerTurnIndex } = this.state
    this.setState({
      view: 'draw',
      round: round + 1,
      playerTurnIndex: playerTurnIndex + 1
    })
  }

  renderView() {
    const { view, drawingURL, players, correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3, selectedAnswer, playerIndex, playerAnswers, guesses, round, playerTurnIndex, playerImages, playerPoints } = this.state

    switch(view) {
      case 'players':
        return (
          <div className='players_container'>
            <PlayerSelection 
              updateNames={(names, images) => this.letsDraw(names, images)}
            />
          </div>
        )
      case 'draw':
        return (
          <div className='draw_container'>
            <DrawingCanvas 
              sketchRef={(value) => this.saveDrawing(value)}
              goBack={() => this.goBack()}
            />
          </div>
        )
      case 'answers':
        return (
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
        )
      case 'guesses':
        return (
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
              playerTurnIndex={playerTurnIndex}
            />  
          </div>
        )
      case 'results':
        return (
          <div className='results_main'>
            <div className='results_details'>
              <DrawnImage
                className="drawnImage"
                drawing={drawingURL}
                width='75vw' 
                height='75vh'
              />
              <Results 
                guesses={guesses}
                correctAnswer={correctAnswer}
                playerAnswers={playerAnswers}
                round={round}
                players={players}
                playerImages={playerImages}
                playerPoints={playerPoints}
                nextRound={() => this.startNextRound()}
              />
            </div>
            <div className='results_footer'>
              {players.length !== round ? <Button size='medium' onClick={() => this.startNextRound()}>Next Round</Button> : ''}
            </div>
          </div>
        )
      default:
        return ''
    }
  }

  render() {
    let { players, playerTurnIndex, playerImages, view, playerPoints } = this.state
    return (
      <div>
        <header className='app_header'>
          {view === 'players' ? <Image src={SquiggleLogoFull} /> : <Image src={SquiggleLogoSmall} />}
          {players.length !== 0 ? 
            <PlayerIcon 
              players={players} 
              playerTurnIndex={playerTurnIndex} 
              playerImages={playerImages} 
              playerPoints={playerPoints} 
            /> : ''}
        </header>
        {this.renderView()}
      </div>
    )
  }

}
