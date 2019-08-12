import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import PropTypes from 'prop-types'

const DummyComponent = (props) => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
)

export class ServerDiaper extends React.Component {
  log (error) {
    console.error("Server Diaper", error)
  }

  handleError (error) {
    this.log(error)
  }

  render () {
    const cn = `diaper`
    const Fallback = this.props.fallback
    const InnerComponent = React.Fragment
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
  }
}

ServerDiaper.propTypes = {
  children: PropTypes.element,
  fallback: PropTypes.elementType,
  Providers: PropTypes.func,
  componentName: PropTypes.string,
}

export default ServerDiaper
