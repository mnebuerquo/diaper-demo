# Minimal React Example of Diaper

## To Run The Example Code

To run this using the docker version which doesn't care about node installed on
the host:

```
./npm i
PORT=9000 ./npm run dev
```

If you want to run without docker, you will need to do something like the
following (I don't usually do this, because I use the docker version to control
what version of node I'm running. I'm not a fan of nvm.):

```
npm i
npm run dev
```

## References

* [zekchan's version of SSR error boundary](https://github.com/zekchan/react-ssr-error-boundary)
* [React issue regarding hydrate and SSR](https://github.com/facebook/react/issues/10591)
* [minimal-react on npm](https://www.npmjs.com/package/minimal-react)
* [Calling into a webpack bundle from another script tag](https://stackoverflow.com/a/34361312/5114)
* [Loading an iframe html dynamically](https://stackoverflow.com/a/10433550/5114)
* [Import CSS in a React app](https://stackoverflow.com/a/49425633/5114)
* [CSS grid layout](https://stackoverflow.com/a/52155280/5114)
* [Doing something after first render](https://stackoverflow.com/q/26556436/5114)
* [Webpack Configuration (for when I upgraded to v4)](https://webpack.js.org/configuration/)
