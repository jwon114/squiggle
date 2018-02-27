import React from 'react'

export default function Answer(props) {
  let answerType
  props.type === 'correct' ? answerType = 'Correct Answer: ' : answerType = 'Fake Answer: '
  return (
    <div>
      <label>{answerType}</label>
      <input type="text"/>
    </div>
  )
}