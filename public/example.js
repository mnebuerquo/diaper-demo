render() {
  try {
    const html = renderToString(<div>{this.props.children}</div>)
    return (<div dangerouslySetInnerHTML={{__html}} />)
  } catch(e) {
    return (<FallbackContent />)
  }
}



const provideContexts = (props) => (
  <Provider store={store}>
    {props.children}
  </Provider>
)
