import React from 'react'
import { Header, Label, Image } from 'semantic-ui-react'
import SquiggleLogoSmall from '../../../public/images/squiggle_logo_small.png'
import CountUp from 'react-countup'
import './Results.scss'

export default function Results(props) {
  const correctPoints = 15
  const bonusPoints = 10
  let { guesses, correctAnswer, playerAnswers, players, playerImages, playerPoints, updatePoints } = props
  let correctIndex = playerAnswers.indexOf(correctAnswer)
  let correctPlayers = []
  
  for (let [playerName, guessIndex] of Object.entries(guesses)) {
    if (guessIndex === correctIndex) {
      correctPlayers.push(playerName)
      playerPoints[playerName] += correctPoints
    }
  }

  if (correctPlayers.length === 1 && players.length > 3) { 
    playerPoints[correctPlayers[0]] += bonusPoints 
  }

  return (
    <div className='results__container'>
      <Header textAlign='center' size='large'>Results</Header>
          <Label size='huge'>the correct answer is... </Label>
          <Header>{correctAnswer}</Header>
          <Label size='huge'>players who got it correct: </Label>
        <div className='results__playerScores_container'>
          {correctPlayers.map((player, index) => (
            <Label.Group key={index} className='results__group'>
              <Label 
                className='results__image' 
                key={index} 
                size='big'> 
                <Image size='big' centered src={playerImages[player]} />
                <div className='results__name'>{player}</div>
              </Label>
              <Label className='results__score_total'>
                <CountUp 
                  start={playerPoints[player] - correctPoints}
                  end={playerPoints[player]}
                  duration={2}
                />
              </Label>
              <Label className='results__score_add'>
                +{correctPoints}
              </Label>
              {(correctPlayers.length === 1 && players.length > 3) ? <Label className='results__score_bonus'>
                +{bonusPoints}
              </Label> : null}
            </Label.Group>
          ))}
        </div>
    </div>
  )
}