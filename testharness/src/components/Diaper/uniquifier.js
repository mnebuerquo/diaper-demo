import React from 'react'
import {createContext} from 'react'
import {addContext} from './contextWrapper'

const Uniq = createContext([])
addContext(Uniq)

export const Uniquifier = ({componentName='u', ...restProps}) => (
  <Uniq.Consumer>
    {value => (
      <Uniq.Provider value={[...value, componentName]}>
      {restProps.children}
      </Uniq.Provider>
    )}
  </Uniq.Consumer>
)

export const withUniquifier = (Component) => (props) => (
  <Uniquifier {...props} >
    <Uniq.Consumer>
    { value => (
      <Component { ...{ ...props, uniquifier:value}} />
    )}
    </Uniq.Consumer>
  </Uniquifier>
)
export default withUniquifier
