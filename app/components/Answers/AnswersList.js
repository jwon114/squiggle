import React from 'react'
import { Button, Form, Header, Message } from 'semantic-ui-react'
import './AnswersList.scss'

export default class AnswersList extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      correctAnswer: '',
      fakeAnswer1: '',
      fakeAnswer2: '',
      fakeAnswer3: '',
      error: ''
    }
  }

  updateAnswers(value, type) {
    switch(type) {
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

  validateAnswerInput() {
    let { correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3 } = this.state
    if (correctAnswer !== '' && fakeAnswer1 !== '' && fakeAnswer2 !== '' && fakeAnswer3 !== '') {
      return false
    } else {
      return true
    }
  }

  checkAnswers() {
    let { correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3 } = this.state 
    let answerArray = [correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3]
    return _.compact(answerArray).length === _(answerArray).compact().uniq().value().length
  }

  sendAnswers() {
    let { correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3 } = this.state
    if (!this.checkAnswers()) {
      this.setState({ error: 'Cannot have duplicate answers' })
    } else {
      let answers = [correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3]
      this.props.answers(answers, correctAnswer)
    }
  }

  render() {
    let { correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3, error } = this.state
    return (
      <div className='answersList__container'>
          <Header textAlign='center' size='huge'>Create Your Answers</Header>
          <div className='answersList__answers_container'>
            <Form>
              <Form.Group>
                <Form.Input
                  className='answersList__correct_answer'
                  size='large' 
                  label='Correct Answer'
                  value={correctAnswer}
                  onChange={(e, { value }) => this.updateAnswers(value, 'correct')}
                />
                <Form.Input 
                  label='Fake Answer 1'
                  size='large'
                  value={fakeAnswer1}
                  onChange={(e, { value }) => this.updateAnswers(value, 'fake1')}
                />
                <Form.Input 
                  label='Fake Answer 2'
                  size='large'
                  value={fakeAnswer2}
                  onChange={(e, { value }) => this.updateAnswers(value, 'fake2')}
                />
                <Form.Input 
                  label='Fake Answer 3'
                  size='large'
                  value={fakeAnswer3}
                  onChange={(e, { value }) => this.updateAnswers(value, 'fake3')}
                />
              </Form.Group>
            </Form>
          </div>
          <Button 
            size='huge'
            disabled={this.validateAnswerInput()}
            onClick={() => this.sendAnswers()}>Submit Answers
          </Button>
          {error !== '' ? <Message compact negative>{error}</Message> : ''}
      </div>
    )
  }
}