import React from 'react'
import PropTypes from 'prop-types'
import './DrawnImage.scss'

export default function DrawnImage(props) {
  return (
    <div
      className="drawnImage__image"
      style={
        {
          backgroundImage: `url(${props.drawing})`,
          backgroundSize: 'cover',
          height: props.height,
          width: props.width,
        }
      }>
    </div>
  )
}

DrawnImage.propTypes = {
  drawing: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}