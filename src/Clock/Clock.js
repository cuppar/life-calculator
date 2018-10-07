import React, { Component } from 'react'

export default class Clock extends Component {
  state = {
    timestamp: new Date().getTime(),
  }

  handleTimeChange = () => {
    this.setState({
      timestamp: new Date().getTime(),
    })
  }

  render() {
    const { timestamp } = this.state;
    const { ...others } = this.props;

    setInterval(this.handleTimeChange, 1000)
    return (
      <div {...others}>
        <p style={{color: 'red'}}>{new Date(timestamp).toLocaleString()}</p>
      </div>
    )
  }
}
