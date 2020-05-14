import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

// // We are going to fill these out in the sections to follow.
// function renderFullPage(html, css) {
//   return `
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <title>My page</title>
//       <style id="jss-server-side">${css}</style>
//     </head>
//     <body>
//       <div id="root">${html}</div>
//     </body>
//   </html>
// `;
// }

// function handleRender(req, res) {
//   const sheets = new ServerStyleSheets();

//   // Render the component to a string.
//   const html = ReactDOMServer.renderToString(
//     sheets.collect(
//       <ThemeProvider theme={theme}>
//         <App />
//       </ThemeProvider>,
//     ),
//   );

//   // Grab the CSS from the sheets.
//   const css = sheets.toString();

//   // Send the rendered page back to the client.
//   res.send(renderFullPage(html, css));
// }

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const sheets = new ServerStyleSheets();
    const css = sheets.toString();
    const markup = renderToString(
      sheets.collect(
      <StaticRouter context={context} location={req.url}>
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </StaticRouter>,
      )
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <style id="jss-server-side">${css}</style>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });


//   server
//   .disable('x-powered-by')
//   .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
//   .get('/*', (req, res) => {
//     const context = {};
//     const markup = renderToString(
//       <StaticRouter context={context} location={req.url}>
//         <App />
//       </StaticRouter>
//     );

//     if (context.url) {
//       res.redirect(context.url);
//     } else {
//       res.status(200).send(
//         `<!doctype html>
//     <html lang="">
//     <head>
//         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//         <meta charset="utf-8" />
//         <title>Welcome to Razzle</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         ${
//           assets.client.css
//             ? `<link rel="stylesheet" href="${assets.client.css}">`
//             : ''
//         }
//         ${
//           process.env.NODE_ENV === 'production'
//             ? `<script src="${assets.client.js}" defer></script>`
//             : `<script src="${assets.client.js}" defer crossorigin></script>`
//         }
//     </head>
//     <body>
//         <div id="root">${markup}</div>
//     </body>
// </html>`
//       );
//     }
//   });

export default server;
