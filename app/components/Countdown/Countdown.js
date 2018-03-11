import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Countdown extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      counter: ''
    }
  }

  componentDidMount() {
    this.setState({ counter: this.props.count })

    let intervalId = setInterval(() => {
      let newCount = this.state.counter - 1
      if (newCount >= 0) {
        this.setState({ counter: newCount })
      } else {
        clearInterval(intervalId)
        this.props.onComplete()
      }
    }, 1000)
    this.setState({ intervalId: intervalId })
  }

  render() {
    return (
      <div>
        <div style={{ height: '100px', width: '100px', backgroundColor: 'black' }}></div>
        {this.state.counter}
      </div>
    )
  }
}

Countdown.defaultProps = {
  count: 30
}

Countdown.propTypes = {
  count: PropTypes.number,
  onComplete: PropTypes.func
}