import React from 'react'
import { Header, List, Label } from 'semantic-ui-react'
import './Results.scss'

export default function Results(props) {
  let { guesses, correctAnswer, playerAnswers } = props
  let correctIndex = playerAnswers.indexOf(correctAnswer)
  let correctPlayers = []
  
  for (let [playerName, guessIndex] of Object.entries(guesses)) {
    if (guessIndex === correctIndex) {
      correctPlayers.push(playerName)
    }
  }
  
  return (
    <div className='results__container'>
      <Header size='huge'>Results</Header>
        <div>
          <p>The correct answer is: {correctAnswer}</p>
        </div>
        <Label>Players who got it correct:</Label>
        <List horizontal>
           {correctPlayers.map(player => <List.Content>{player}</List.Content>)}
        </List>
    </div>
  )
}