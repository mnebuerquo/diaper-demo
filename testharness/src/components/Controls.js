import React from 'react'
import * as diapers from './Diaper/ssr'
import doTemplateRenders from './renderTemplates'

const StyledButton = (props) => (
  <a href='#' className={props.selected ? 'sb selected' : 'sb'} onClick={props.onClick} >
  {props.children}
  </a>
)

const SsrButton = ({whichDiaper='complete'}) => (
  <StyledButton onClick={() => doTemplateRenders(whichDiaper)}>Render Page</StyledButton>
)

const DiaperSelector = ({whichDiaper, handleChange}) => (
  <div>{
    Object.keys(diapers).map(
      (s, i) =>
        <StyledButton key={i} selected={s===whichDiaper} onClick={()=>handleChange(s)}>
          {s}
        </StyledButton>
    )
  }</div>
)

class Controls extends React.Component {
   constructor(props) {
    super(props)
    this.state = {whichDiaper: Object.keys(diapers)[0]}
  }

  render() {
    const handler = (which) =>
      this.setState(() => ({whichDiaper: which}))
    return (
      <div>
        <DiaperSelector whichDiaper={this.state.whichDiaper} handleChange={handler} />
        <SsrButton whichDiaper={this.state.whichDiaper} />
      </div>
    )
  }
}

export default Controls
