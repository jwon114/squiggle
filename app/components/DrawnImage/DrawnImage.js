import React from 'react'
import './DrawnImage.scss'

export default function DrawnImage(props) {
  return (
    <div
      className="drawnImage"
      style={
        {
          backgroundImage: `url(${props.drawing})`,
          height: props.height,
          width: props.width,
        }
      }>
    </div>
  )
}