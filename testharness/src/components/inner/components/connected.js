import React from 'react'
import {connect} from 'react-redux'

export const dumbComponent = (props) => (
  <div>
    <p>
      {props.hasRedux && 'This component is connected!' || 'This component is not connected.'}
    </p>
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

