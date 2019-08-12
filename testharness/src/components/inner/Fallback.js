import React from 'react'

export const Fallback = ({error={}}) => (
  <div className="error">
    <div>{error.name || 'Unknown Error'}</div>
    <div>{error.message || 'Something bad happened.'}</div>
  </div>
)

export const NullComponent = () => null

export default Fallback
