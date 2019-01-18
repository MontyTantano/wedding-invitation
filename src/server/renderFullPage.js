import packageJson from '../../package.json';

const VERSION = (packageJson.version || '').replace(/\./g, '-');

export default function renderFullPage(html, preloadedState) {
  // WARNING: See the following for security issues around embedding JSON in HTML:
  // http://redux.js.org/recipes/ServerRendering.html#security-considerations
  return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="content-type" content="text/html">
        <meta name="author" content="Oleg Makushev">
        <meta name="designer" content="Oleg Makushev">
        <meta name="publisher" content="Oleg Makushev">
        <meta name="no-email-collection" content="https://tanya-oleg-wedding.herokuapp.com">

        <meta name="description" content="This is the site of the invitation to the wedding of Tanya and Oleg">
        <meta name="keywords" content="wedding,wedding invitation,Oleg Makushev,Tatiana Danilova,Oleg + Tatiana,приглашение на свадьбу,Олег Макушев,Татьяна Данилова,Олег + Таня">
        <meta name="robots" content="index,follow">
        <meta name="revisit-after" content="7 days">
        <meta name="distribution" content="web">
        <meta http-equiv="refresh" content="30">
        <meta name="robots" content="noodp">

        <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />

        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <title>Таня + Олег</title>
      </head>
      <body>
        <section id="root">${html}</section>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/dist/app.${VERSION}.js"></script>
      </body>
    </html>
  `;
}
