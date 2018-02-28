import React from 'react'
import { Button, Input, Label } from 'semantic-ui-react'

export default class AnswersList extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      correctAnswer: '',
      fakeAnswer1: '',
      fakeAnswer2: '',
      fakeAnswer3: ''
    }
  }

  updateAnswers(value) {
    switch(value) {
      case 'correct':
        this.setState({ correctAnswer: value })
        break
      case 'fake1':
        this.setState({ fakeAnswer1: value })
        break
      case 'fake2':
        this.setState({ fakeAnswer2: value })
        break
      case 'fake3':
        this.setState({ fakeAnswer3: value })
        break
    }
  }

  render() {
    return (
      <div className='answersList__container'>
          <div className='answersList__answers_container'>
            <Label>Correct Answer</Label>
            <Input 
              onChange={(e, { value }) => this.updateAnswers(value, 'correct')}
            />
            <Label>Fake Answer</Label>
            <Input 
              onChange={(e, { value }) => this.updateAnswers(value, 'fake1')}
            />
            <Label>Fake Answer</Label>
            <Input 
              onChange={(e, { value }) => this.updateAnswers(value, 'fake2')}
            />
            <Label>Fake Answer</Label>
            <Input 
              onChange={(e, { value }) => this.updateAnswers(value, 'fake3')}
            />
          </div>
        <Button onClick={() => this.submitAnswers()}>Submit Answers</Button>
      </div>
    )
  }
}