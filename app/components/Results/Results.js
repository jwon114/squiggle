import React from 'react'
import { Header, List, Label, Button } from 'semantic-ui-react'
import './Results.scss'

export default function Results(props) {
  let { guesses, correctAnswer, playerAnswers, round, players, nextRound } = props
  let correctIndex = playerAnswers.indexOf(correctAnswer)
  let correctPlayers = []
  
  for (let [playerName, guessIndex] of Object.entries(guesses)) {
    if (guessIndex === correctIndex) {
      correctPlayers.push(playerName)
    }
  }
  
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
      {players.length !== round ? <Button onClick={() => nextRound()}>Next Round</Button> : ''}
    </div>
  )
}