import React from 'react'

export class ssrIndicator extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isSSR: true }
  }

  componentDidMount () {
    setTimeout(() => this.setState( (state, props) => ({isSSR: window.isSSR}) ), 1)
  }

  render() {
    return (
      <div>Rendered by <em> {
        (undefined === this.state.isSSR) ?  "???" : ( this.state.isSSR ? "SSR" : "Browser" )
      } </em></div>
    )
  }
}
