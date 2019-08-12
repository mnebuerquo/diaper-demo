import React from 'react'
import {addContext} from '../../Diaper/contextWrapper'

const TestContext = React.createContext('Contexts Are Not Working Yet')
addContext(TestContext)

export const LowestLevel = (props) => (
  <TestContext.Consumer>
    {value => (
      <div>
        <h3>{value}</h3>
        {props.children}
      </div>
    )}
  </TestContext.Consumer>
)

export const MidLevel = (props) => (
  <div>
    <p>Mid Level Component</p>
    {props.children}
  </div>
)

export const TopLevel = (props) => (
  <div>
    <h3>Context Provider</h3>
    <TestContext.Provider value="Contexts are working">
      {props.children}
    </TestContext.Provider>
  </div>
)
