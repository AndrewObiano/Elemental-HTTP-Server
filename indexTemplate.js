module.exports = function(list, count) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>The Elements</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <h1>The Elements</h1>
        <h2>These are all the known elements.</h2>
        <h3>These are ${count}</h3>
        <ol>
          ${list}
        </ol>
      </body>
    </html>
    `;
};
