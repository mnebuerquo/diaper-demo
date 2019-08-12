import React from 'react'

export class BadConstructor extends React.Component {
  constructor (props) {
    super(props)

    throw new Error("Oops! I had an accident!")
  }

  render () {
    return ( <div>This is the BadConstructor component</div>)
  }
}
