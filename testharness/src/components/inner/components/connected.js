import React from 'react'
import {connect} from 'react-redux'

export const dumbComponent = (props) => (
  <div>
    <h3>
      {props.hasRedux && 'This component is Redux connected!' || 'This component is not connected.'}
    </h3>
    <p>
      {props.reduxString}
    </p>
  </div>
)
const mapStateToProps = state => ({
  hasRedux: !!state,
  reduxString: state.testString,
  isSSR: state.isSSR,
})
export const connectedComponent = connect(mapStateToProps)(dumbComponent)

