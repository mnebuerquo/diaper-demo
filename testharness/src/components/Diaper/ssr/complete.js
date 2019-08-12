import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import PropTypes from 'prop-types'
import {
  consumeAllContextValues,
  provideAllContexts
} from '../contextWrapper'
import withUniquifier from '../uniquifier'
import { connect } from 'react-redux'

const DummyComponent = (props) => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
)

const nullfunc = ()=>{}

export class ServerDiaper extends React.Component {
  constructor (props) {
    super(props)
    this.dispatch = props.dispatch || nullfunc
    this.un = this.props.uniquifier.join('.')
  }

  log (error) {
    console.error("Server Diaper", error)
  }

  handleError (error) {
    this.dispatch({
      type: 'DIAPER_CAUGHT_ERROR',
      payload: this.un
    })
    this.log(error)
  }

  render () {
    const cn = `diaper ${this.un}`
    const Fallback = this.props.fallback
    const Providers = this.props.Providers || DummyComponent
    const WrapperComponent = consumeAllContextValues(
      values => {
        const InnerComponent = provideAllContexts(Providers, values)
        try {
          const __html = renderToStaticMarkup(<InnerComponent {...this.props} />)
          return (<div className={cn} dangerouslySetInnerHTML={{__html}} />)
        } catch (e) {
          this.handleError(e)
          return (
            <div className={cn} >
              <Fallback error={e} />
            </div>
          )
        }
      })
    return (<WrapperComponent />)
  }
}

ServerDiaper.propTypes = {
  children: PropTypes.element,
  fallback: PropTypes.elementType,
  Providers: PropTypes.func,
  componentName: PropTypes.string,
  uniquifier: PropTypes.arrayOf(PropTypes.string),
}

const UniqueServerDiaper = withUniquifier(ServerDiaper)
const ConnectedServerDiaper = connect()(UniqueServerDiaper)
export default ConnectedServerDiaper
