import React from 'react'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import * as components from './components'
import {withDiaper} from '../Diaper'
import Fallback from './Fallback'
import {setupRedux} from './setupRedux'
import Recursor from './Recursor'
import layout from './layout'
import './page.css'

const makeProviders = (store) => (props) => (
  <Provider store={store}>
    {props.children}
  </Provider>
)

const wrapComponents = (isSSR, whichDiaper, Providers) =>
  Object.keys(components)
  .reduce(
    (acc, name) => ({
      ...acc,
      [name]: withDiaper(isSSR, whichDiaper, Fallback, name, Providers, components[name]),
    }),
    {})

const mapStateToProps = state=> ({
  isSSR: state.isSSR,
  whichDiaper: state.whichDiaper
})

const dumbHeading = ({whichDiaper}) => (
  <h3>{`Content Wrapped in ${whichDiaper}`}</h3>
)
const Heading = connect(mapStateToProps)(dumbHeading)
const Footer = () => (<div className="footer">This is the footer.</div>)

export const Page = ({isSSR=false, whichDiaper}) =>
{
  const store = setupRedux(isSSR, whichDiaper)
  const Providers = makeProviders(store)
  const wrapped_components = wrapComponents(isSSR, whichDiaper, Providers)
  const content = layout || []

  const Content = withDiaper(isSSR, whichDiaper, Fallback, 'Content', Providers, components['Content'])

  return (
    <Providers>
      <div id="page" >
        <Heading />
        <Recursor className="thing" components={wrapped_components} content={layout} />
        <Footer />
      </div>
    </Providers>
  )}

export default Page
