import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

import App from './components/App'

export const run = () =>
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
