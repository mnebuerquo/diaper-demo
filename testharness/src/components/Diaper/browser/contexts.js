import React from 'react'
import PropTypes from 'prop-types'

const FallbackDefault = () => null

export class BrowserDiaper extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: null, hasError: false }
  }

  log (error) {
    console.error("Browser Diaper", error)
  }

  static getDerivedStateFromError (error) {
    // Update state so the next render will show the fallback UI.
    return { error: error, hasError: true }
  }

  componentDidCatch (error, info) {
    this.log(error)
  }

  render () {
    const cn = `diaper`
    const Fallback = this.props.fallback || FallbackDefault
    if (this.state.hasError) {
      return (
        <div className={cn} >
          <Fallback error={this.state.error || Error('unknown error reported in diaper')} />
        </div>
      )
    }
    return (
        <div className={cn} >
          {this.props.children}
        </div>
    )
  }
}

BrowserDiaper.propTypes = {
  children: PropTypes.element,
  fallback: PropTypes.elementType,
  componentName: PropTypes.string,
}

export default BrowserDiaper
