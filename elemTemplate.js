module.exports = function(postman) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>The Elements - ${postman.elementName}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <h1>${postman.elementName}</h1>
        <h2>${postman.elementSymbol}</h2>
        <h3>Atomic Number ${postman.elementAtomicNumber}</h3>
        <p>${postman.elementDescription}</p>
        <p><a href="/">back</a></p>
      </body>
    </html>`;
};
