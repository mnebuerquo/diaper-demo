const template = (html, initialState, startFn, isSSR, whichDiaper) => `
  <!doctype html>
  <html lang="en">
    <head>
      <title>Awesome React Page</title>
    </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>

        <div id="root">${html}</div>

        <script src="./page.js" type="text/javascript"></script>
        <script type="text/javascript">
          window.initialState = ${initialState}
          window.isSSR = ${isSSR}
          window.whichDiaper = '${whichDiaper}'
          window.onload = function () { AppMain.${startFn}() }
        </script>
      </body>
  </html>
` // end of template

export default template
