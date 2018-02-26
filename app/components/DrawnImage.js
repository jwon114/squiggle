import React from 'react'

export default function DrawnImage(props) {
  return (
    <div
      style={
        {
          backgroundImage: `url(${props.drawing})`,
          height: props.height,
          width: props.width
        }
      }>
    </div>
  )
}