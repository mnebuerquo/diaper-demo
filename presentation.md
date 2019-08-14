# Diaper Your Children
## Cleaning Up After Messy React Components

---

# Once upon a time...

A development team had a problem.

--

They had to render a dynamic experience using
components which someone else developed.

--

They had to render a dynamic experience
someone else designed.

--

And they had to do it on a highly visible website
with lots of online sales at stake.

--

This is their story.

---

# A Support Nightmare

It's 2:36 PM on a Saturday. You're at your kid's soccer match.

--

Your phone rings.

--

Website is down.

--

People are watching.

--

Every minute costs money.

--

People in suits are staring at you.

--

How nervous are you feeling right now?

---

# Someone's Component Threw an Exception

You see the White Screen of Death.

What do we want to accomplish when something breaks down?

--

1. Always render a page.

2. Call for help.

3. Show something helpful to the user.

---

# Ok, let's solve the problem!

No problem. I've heard of a React 16 feature for this!

Anyone ever use error-boundaries?

--

`static getDerivedStateFromError(error) {...}`

`componentDidCatch(error, info) {...}`

--

Awesome! I can do that! Let's write some code!

---

# Wait... What's the catch?

There's always a catch. Something we didn't anticipate...

--

We're doing server-side rendering.

--

Why do we do SSR?

--

Page load time. SEO. Caching. It's important.

--

So what does that mean for our error handling?

--

If we don't handle our exception in the server-side render,
nothing gets rendered and the user is sad.

---

# Error Boundary Server-Side?

Can we do it?

--

_From the React docs (emphasis added):_

Error boundaries do not catch errors for:

* Event handlers
* Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
* _Server side rendering_
* Errors thrown in the error boundary itself (rather than its children)

---

# We need a SSR error strategy

Let's implement an error boundary that works server-side.

How hard can it be?

--

Actually, pretty tricky.

---

# Let's try some stuff.

Obvious starting point: Let's wrap render in a try/catch.

--

Render is done with `ReactDOMServer.renderToString`.
Let's wrap it:

```
try {
  return renderToString(
    <Provider store={reduxStore}>
      <MyAppRootComponent myAppTakesAProp={someProp} />
    </Provider>
  )
} catch(e) {
  return renderToString(<FallbackContent />)
}
```

--

We can catch an exception in SSR for the whole app. It doesn't let us render a
partial page though.

---

# Let's try that inside a component!

Let's try wrapping the component's render and see what happens.

--

```
render() {
  try {
    return (<div>{this.props.children}</div>)
  } catch(e) {
    return (<FallbackContent />)
  }
}
```

--

The exception isn't caught. What happened?

---

# React is Declarative, not Imperative

Your render function tells React what needs to happen, and then
React does the work.

The try/catch happens in a step before the child
components get rendered.

The render is done asynchronously in a separate stack.

---

# Force React to do as I command!

No problem. I'll just tell React I want a render right now!
None of this lazy async stuff. Give me my HTML!

--

```
render() {
  try {
    return renderToString(this.props.children)
  } catch(e) {
    return (<FallbackContent />)
  }
}
```

--

Nope. Now my render is returning a string of HTML instead of a node.

React will add my raw HTML as a text element containing HTML, not as React elements.

---

# Let's get dangerous!

We need to set that HTML as the inner content of our component. Dangerously.

--

```
render() {
  try {
    const html = renderToString(<div>{this.props.children}</div>)
    return (<div dangerouslySetInnerHTML={{__html}} />)
  } catch(e) {
    return (<FallbackContent />)
  }
}
```

--

Hey! That sortof works!

---

# What doesn't work?

We've got our first caught SSR exception! But something still isn't right.

--

Remember we're using Redux?

```
<Provider store={reduxStore}>
  <MyAppRootComponent myAppTakesAProp={someProp} />
</Provider>
```

--

The Redux store isn't making it to any connected component inside the wrapper.

---

# We're creating a whole new render scope

What's failing?

React Contexts (like Redux Provider)

They teleport props to components deeper in the React tree.

--

We have to re-create the Contexts inside the next `renderToString` scope.

---

# Hard Problem: How to Recreate Contexts?

Difficult because of reasons:

1. Two different API's. Legacy and React 16.
2. No enumeration of contexts within React.
3. Providers can be anywhere in the tree.

--

How do we figure out what contexts are active for any component?

---

# Providing the Providers

We don't know how to find all active contexts.

Let's just re-provide the contexts we know about.

--

```
const ProvideAllContexts = (props) => (
  <Provider store={store}>
    {props.children}
  </Provider>
)

render() {
  try {
    const html = renderToString(<div>
      <ProvideAllContexts>
        {this.props.children}
      </ProvideAllContexts>
    </div>)
    return (<div dangerouslySetInnerHTML={{__html}} />)
  } catch(e) {
    return (<FallbackContent />)
  }
}
```

--

That works better.

---

# A Little More Context

Now we have a component which wants to create a new context!

We're blocking contexts on the server-side.

Remember this:

```
const ProvideAllContexts = (props) => (
  <Provider store={store}>
    {props.children}
  </Provider>
)
```

--

We would have to include the context and its value in the
`ProvideAllContexts` function.

---

# Bucket Brigade

In each Diaper, we need to make sure to provide all the contexts we know.

1. Consume all contexts to get the values
2. Inside the `renderToString`, re-provide all the contexts

--

The problem is knowing what contexts are active.

React does not store a list of contexts.

---

# One Context to Rule Them All

Let's monkey-patch React!

Shim around `React.createContext` to capture all the contexts in a list.

```
const { createContext } = React
React.createContext = function() {
  const Context = createContext.apply(this, arguments)
  contexts.push(Context)
  return Context
}
```

This solves the problem for components which use a context internally without
exposing it.

--

Unfortunately, the shim must be installed before anything creates a context.

Module load order is an issue now.

---

# You're not on the list.

Let's expose an `addContext` method in Diaper.

User code creates context, registers it, then it gets re-created in each
layer.

--

What's the problem?

--

It's a trap!

And we don't have a better way.

---

# What happens with errors?

We're rendering the page, what happens when one component fails?

--

Replaced with `FallbackContent` and sent to the browser, HTML only.

--

`ReactDOM.hydrate` maps the Virtual DOM to the real DOM.

---

# Attack of the Zombie Nodes

A zombie is a node which is rendered into the HTML, but does not map to a React
component in the Virtual DOM. React will never re-render this node, and will
only remove it from the DOM if the parent node is re-rendered.

--

You can get a zombie node by following these steps:

1. Server-side render a parent node with multiple children.
2. Client-side hydrate the HTML, but render a different child in place of one
   of the middle children.
3. Now re-render all the children client-side with any client side changes.

--

After step 2, you will notice some nodes are duplicated.

The Zombies are the nodes following the node rendered differently by the
client.

Zombies appear first in the DOM, and will not be updated.

---

# Fighting the Zombie Apocalypse

Whenever you replace a failing Component with a fallback component in
server-side rendering, you create the conditions for a zombie node.

--

My observations:

* If there is only one child, React can figure out to replace it.
* If there are some more unique classes added to each child, React has a better
  chance of figuring it out.
* Sometimes React will merge content from two different divs into one, because
  it thinks they are the same structure.
* There is some content about this in the React docs for `hydrate` and an issue
  in Github for react as well. These have a lot of helpful info.

---

# Get a Chainsaw Hand

Let's prevent Zombies taking over our pages.

1. Give the Diapers some semi-unique names.
2. Dispatch an action when an error is caught.
3. Pass an initial state to the client.
4. Render identical content in SSR and first client-side render.
5. Re-try the render in a second pass and catch the error.

--

Apocalypse averted!

---

# Help! Help!

We can catch errors in client side and server side! Let's log them!

--

Logging Server-Side!

* Just use the server logging mechanism - express, fastify, koa, connect, ...?
* Bonus points for an ELK stack.
* Bonus bonus points for an alarm mechanism.

--

Logging Client Side!

* You need a server endpoint to recieve events
* You never know what kinds of errors you will catch

---

# Baby's First Diaper

Remember our requirements from earlier:

1. Always render a page.
2. Call for help.
3. Show something to the user.

Now we have a working Diaper component!

---

# Successes

First day deployed, the Diaper caught a broken data issue and prevented a
problem. Team was alerted and fixed the data in minutes.

Since then it has revealed many client-side errors and prevented several errors
in server-side.

---

# Conclusion

Error Boundaries in Server-Side Rendering are difficult.

Recommended:
* Render the most static parts of the page server-side. Header, footer, menus.
* If possible, defer the more dynamic content to client-side render.
* Wrap all dynamic content in error boundaries to prevent the
  white-screen-of-death.
* Don't try to do fine-grained error boundaries on server-side without good
  context handling.

---

# Thanks!

Thank you all for coming!
