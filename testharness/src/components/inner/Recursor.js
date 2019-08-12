import React from 'react'

const Nothing = () => (<div>Unknown Component</div>)

const Recursor = (props) => {
  const {components, content} = props

  const makeChild = (depth, child, i) => {
    const {component, props={}, children=[]} = child
    const C = components[component] || Nothing
    return (
      <C key={i} {...props}>
        {children.map(makeChild.bind(null, depth+1))}
      </C>
    )
  }

  return makeChild(0, content, 0)
}

export default Recursor
