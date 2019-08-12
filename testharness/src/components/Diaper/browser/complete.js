import React from 'react'
import PropTypes from 'prop-types'
import withUniquifier from '../uniquifier'
import { connect } from 'react-redux'

const FallbackDefault = () => null

export class BrowserDiaper extends React.Component {
  constructor (props) {
    super(props)

    this.un = this.props.uniquifier.join('.')
    this.fail = (this.props.diaperFails.includes(this.un))
    const content = this.fail
      ? this.props.Fallback
      : this.props.children

    this.state = { error: null, hasError: false, content }
  }

  componentDidMount () {
    setTimeout(() => this.setState( (state, props) => ({content: this.props.children}) ), 1)
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
    const cn = `diaper ${this.un}`
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
          {this.state.content}
        </div>
    )
  }
}

BrowserDiaper.propTypes = {
  children: PropTypes.element,
  fallback: PropTypes.elementType,
  uniquifier: PropTypes.arrayOf(PropTypes.string),
  componentName: PropTypes.string,
  diaperFails: PropTypes.arrayOf(PropTypes.string),
}
const UniqueBrowserDiaper = withUniquifier(BrowserDiaper)

const mapStateToProps = (state, ownProps) => ({
  diaperFails: (state && state.diaperFails || [])
})
const ConnectedBrowserDiaper = connect(mapStateToProps)(UniqueBrowserDiaper)
export default ConnectedBrowserDiaper
