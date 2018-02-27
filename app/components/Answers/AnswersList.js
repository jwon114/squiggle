import React from 'react'
import Answer from './Answer'

export default function AnswersList() {
  return (
    <div>
      <Answer type='correct'/>
      <Answer type='fake'/>
      <Answer type='fake'/>
      <Answer type='fake'/>
    </div>
  )
}