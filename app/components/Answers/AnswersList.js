import React from 'react'

export default class AnswersList extends React.Component {
  
  render() {
    return (
      <div>
        <label>Correct Answer</label>
        <input type="text"/>
        <label>Fake Answer</label>
        <input type="text"/>
        <label>Fake Answer</label>
        <input type="text"/>
        <label>Fake Answer</label>
        <input type="text"/>
      </div>
    )
  }
}