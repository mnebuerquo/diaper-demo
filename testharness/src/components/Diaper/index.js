import React from 'react'

import * as browser from './browser'
import * as ssr from './ssr'

export const getDiaper = (isSSR, whichDiaper) => isSSR ? ssr[whichDiaper] : browser[whichDiaper]

const Nothing = () => {}
export const withDiaper =
  (isSSR, whichDiaper, fallback, componentName, Providers, WrappedComponent) => {
    const Diaper = getDiaper(isSSR, whichDiaper)
    const wrapDiaper = (props) => (
      <Diaper {...props} {...{componentName, fallback, Providers}} >
        <WrappedComponent {...props} />
      </Diaper>
    )
    wrapDiaper.displayName = 'Diaper'
    return wrapDiaper
  }
