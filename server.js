"use strict";

const http = require("http");
const fs = require("fs");
const PORT = 8080;
const server = http.createServer((req, res) => {
  // console.log(req.method);
  // console.log(req.url);
  // console.log(req.headers);

  // body???
  let body = "sdflkjsdfljk";
  req.on("data", chunk => {
    body += chunk;
  });

  // req.on("end", () => {

  if (req.method === "GET") {
    let contentType = "text/html; charset=utf-8";
    let URL = req.url;
    if (URL === "/") {
      URL = "/index.html";
    }

    fs.readdir("./public/", (err, dir) => {
      if (err) {
        return console.log(err);
      }
      if (!dir.includes(URL.slice(1))) {
        URL = "/404.html";
      }
      if (URL === "/index.html") {
        // read contents of the public dir
        fs.readFile("./public/index.html", (err, data) => {
          if (err) {
            return console.log(err);
          }

          res.writeHead(200, {
            "content-length": data.toString().length,
            "content-type": contentType
          });

          res.write(data.toString());
          res.end();
          return;
        });
      }

      if (URL === "/helium.html") {
        fs.readFile("./public/helium.html", (err, data) => {
          if (err) {
            return console.log(err);
          }

          res.writeHead(200, {
            "content-length": data.toString().length,
            "content-type": contentType
          });

          res.write(data.toString());
          res.end();
          return;
        });
      }

      if (URL === "/hydrogen.html") {
        fs.readFile("./public/hydrogen.html", (err, data) => {
          if (err) {
            return console.log(err);
          }

          res.writeHead(200, {
            "content-length": data.toString().length,
            "content-type": contentType
          });

          res.write(data.toString());
          res.end();
          return;
        });
      }

      if (URL === "/styles.css") {
        fs.readFile("./public/styles.css", (err, data) => {
          if (err) {
            return console.log(err);
          }

          res.writeHead(200, {
            "content-length": data.toString().length,
            "content-type": "text/css"
          });

          res.write(data.toString());
          res.end();
          return;
        });
      }

      if (URL === "/404.html") {
        fs.readFile("./public/404.html", (err, data) => {
          if (err) {
            return console.log(err);
          }

          res.writeHead(200, {
            "content-length": data.toString().length,
            "content-type": contentType
          });

          res.write(data.toString());
          res.end();
          return;
        });
      }
    });
  }
  // });
});

server.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
