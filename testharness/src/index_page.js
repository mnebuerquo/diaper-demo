import React from 'react'
import ReactDOM from 'react-dom'

import Page from './components/inner/Page'

export const render = () =>
  ReactDOM.render(
    <Page isSSR={window.isSSR} whichDiaper={window.whichDiaper} />,
    document.getElementById('root')
  )

export const hydrate = () =>
  ReactDOM.hydrate(
    <Page isSSR={window.isSSR} whichDiaper={window.whichDiaper} />,
    document.getElementById('root')
  )

export const doNothing = () => {}
