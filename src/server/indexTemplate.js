import packageJson from '../../package.json';

const VERSION = (packageJson.version || '').replace(/\./g, '-');

export default function template(html, preloadedState) {
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
        <meta name="no-email-collection" content="http://www.tatiana-oleg.ru">

        <meta name="description" content="This is the site of the invitation to the wedding of Tanya and Oleg">
        <meta name="keywords" content="wedding,wedding invitation,Oleg Makushev,Tatiana Danilova,Oleg + Tatiana,приглашение на свадьбу,Олег Макушев,Татьяна Данилова,Олег + Таня">
        <meta name="robots" content="index,follow">
        <meta name="revisit-after" content="7 days">
        <meta name="distribution" content="web">
        <meta name="robots" content="noodp">

        <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />

        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <meta property="og:image" content="/assets/img/greeting-photo-square@1x.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Свадьба Татьяны и Олега" />
        <meta property="og:description" content="Мы рады сообщить, что 10 мая состоится праздник, посвященный нашей свадьбе." />

        <title>Таня + Олег</title>

        <link rel="shortcut icon" href="/assets/favicons/favicon.ico" type="image/x-icon" />
        <link href="https://fonts.googleapis.com/css?family=Alice|Lobster" rel="stylesheet">
        <link rel="stylesheet" href="/dist/app.${VERSION}.css" />
      </head>
      <body>
        <section id="root" class='root'>${html}</section>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="/dist/app.${VERSION}.js"></script>
      </body>
    </html>
  `;
}
