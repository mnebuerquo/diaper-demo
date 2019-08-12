import { createStore } from 'redux'
import reducer from './reducers'

const initial = (isSSR, whichDiaper) => ({
  isSSR,
  whichDiaper,
  testString: 'this is a test',
})

const getInitialState = (isSSR, whichDiaper) => (
  isSSR ?
  initial(isSSR, whichDiaper) :
  window.initialState)

let store
export const setupRedux = (isSSR, whichDiaper) => {
  const state = getInitialState(isSSR, whichDiaper)
  store = createStore(reducer,state)
  return store
}

export const getState = () => store && store.getState()
