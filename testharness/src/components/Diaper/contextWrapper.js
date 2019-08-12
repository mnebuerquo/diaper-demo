import React from 'react'

const contexts = []
let shimInstalled = false

export const getContexts = () => contexts
export const addContext = (c) => contexts.push(c)

// Whenever a context is created in React, push it onto our stack so we can
// pull its value and re-create it for children.
// This is to teleport these values into another layer of renderToStaticMarkup.
//
// This would work great, but other modules call the function before the shim
// is installed. So this doesn't actually work great.
export const shimCreateContext = () => {
  if (!shimInstalled) {
    const { createContext } = React
    // This needs to be a function so it will act properly with 'this'
    React.createContext = function () {
      const Context = createContext.apply(this, arguments)
      contexts.push(Context)
      return Context
    }
    shimInstalled = true
  }
}

const arrayOrNothing = x => Array.isArray(x) ? x : []

// wrap render function with all context consumers to get the values
// then we pass those values to the context provider function below to
// provide them to the components inside the diaper
export const consumeAllContextValues = (componentFn) => contexts.reduce(
  (fn, Context) =>
    (values) => (<Context.Consumer>{
      value => fn([value, ...arrayOrNothing(values)])
    }</Context.Consumer>),
  componentFn)

// zip contexts and values
// then reduce contexts to a stack of providers around element
// each one wraps the ones below
// element is a rendered react element
export const provideAllContexts = (Component, values) =>
  contexts
    .map((ctx, i) => [ctx, values[i]])
    .reduce(
      (Child, [Context, value]) =>
        (props) => (
          <Context.Provider value={value}>
            <Child {...props} />
          </Context.Provider>
        ), Component)
