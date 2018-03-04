import React from 'react'
import { Label, Image, Icon, Header } from 'semantic-ui-react'
import P1Image from './images/doge.png'
import P2Image from './images/pun_dog.jpg'
import P3Image from './images/sloth.jpg'
import P4Image from './images/koala.jpg'
import './PlayerIcon.scss'

export default function PlayerIcon(props) {
  let { players, playerTurnIndex, playerImages, playerPoints } = props
  let imageArr = [P1Image, P2Image, P3Image, P4Image]
  return (
    <div className='playerIcon__container'>
      {players.map((player, index) => (
        <Label.Group key={index} className='playerIcon__group'>
          <Label className='playerIcon__image' key={index} size='big' active={index === playerTurnIndex}>
              <Image size='big' centered src={playerImages[player]} />
              {/* {index === playerTurnIndex ? <Icon name='paint brush'/> : ''} */}
              <div className='playerIcon__name'>
                {player}
              </div>
          </Label>
          <Label active={index === playerTurnIndex} className='playerIcon__score'>
            {playerPoints[player]}
          </Label>
        </Label.Group>
      ))}
    </div>
  )
}