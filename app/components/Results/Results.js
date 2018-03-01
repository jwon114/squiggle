import React from 'react'
import { Header, List, Label } from 'semantic-ui-react'
import './Results.scss'

export default function Results(props) {
  let { guesses, correctAnswer, playerAnswers } = props
  let correctIndex = playerAnswers.indexOf(correctAnswer)
  let correctPlayers = []
  
  for (let [playerName, guessIndex] of Object.entries(guesses)) {
    console.log(guesses)
    console.log(playerName)
    if (guessIndex === correctIndex) {
      correctPlayers.push(playerName)
    }
  }

  console.log(correctPlayers)
  
  return (
    <div className='results__container'>
      <List size='huge' horizontal>
        <List.Item>
          <Label size='huge'>The correct answer is: </Label>
        </List.Item>
        <List.Item>
          <Header>{correctAnswer}</Header>
        </List.Item>
        <List.Item>
          <Label size='huge'>Players who got it correct: </Label>
        </List.Item>
        {correctPlayers.map((player, index) => <List.Item key={index}>{player}</List.Item>)}
      </List>
    </div>
  )
}