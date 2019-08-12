import React from 'react'

export class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.state = { time: new Date().toISOString() }
  }

  componentDidMount () {
    window.setInterval(
      () => this.setState( (state, props) => ({ time: new Date().toISOString() }) ),
      1000
    )
  }

  render() {
    return (
      <div>
        {this.state.time}
      </div>
    )
  }
}
