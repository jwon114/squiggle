import React from 'react'
import { Label, Image, Icon } from 'semantic-ui-react'
import P1Image from './images/doge.png'
import P2Image from './images/pun_dog.jpg'
import P3Image from './images/sloth.jpg'
import P4Image from './images/koala.jpg'

export default function PlayerIcon(props) {
  let { players, playerTurnIndex } = props
  let imageArr = [P1Image, P2Image, P3Image, P4Image]
  return (
    <div>
      {players.map((player, index) => (
        <Label key={index} size='big' active={index === playerTurnIndex}>
          <Image size='big' centered src={imageArr[index]} />
          {index === playerTurnIndex ? <Icon name='paint brush'/> : ''}
          {player}
        </Label>
      ))}
    </div>
  )
}