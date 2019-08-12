import React from 'react'
import {renderToString} from 'react-dom/server'
import template from '../lib/template'
import {Page} from './inner/Page'
import {getState} from './inner/setupRedux'

const renderTypes = {
  ssr : (html, initialState, whichDiaper) => template(html, JSON.stringify(initialState), 'doNothing', 'true', whichDiaper),
  hydrate : (html, initialState, whichDiaper) => template(html, JSON.stringify(initialState), 'hydrate', 'false', whichDiaper),
}

const renderMethod = (Component, whichDiaper) => {
  try {
    return renderToString(<Component isSSR={true} whichDiaper={whichDiaper} />)
  } catch(e) {
    console.error(e)
    return `
      <div class="servererror">
        <img src="https://http.cat/500">
        <div>${e.name}</div>
        <div>${e.message}</div>
        <pre>${e.stack}</pre>
      </div>
    `
  }
}

const doTemplateRenders = (whichDiaper) => {
  const html = renderMethod(Page, whichDiaper)
  const renderNull = () => ''
  const state = getState() || {}
  ;[
    {id: 'ifleft', type: 'ssr'},
    {id: 'ifright', type: 'hydrate'}
  ].map( (x) => {
    const iframe = document.getElementById(x.id)
    state.isSSR = ('ssr' === x.type)
    const render = (renderTypes[x.type] || renderNull)
    iframe.contentWindow.document.open()
    iframe.contentWindow.document.write(render(html, state, whichDiaper))
    iframe.contentWindow.document.close()
  } )
}

export default doTemplateRenders
