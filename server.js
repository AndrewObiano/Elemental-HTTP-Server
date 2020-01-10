"use strict";

const http = require("http");
const fs = require("fs");
const elemTemplate = require("./elemTemplate.js");
const indexTemplate = require("./indexTemplate.js");
const querystring = require("querystring");
const PORT = 8080;
const server = http.createServer((req, res) => {
  req.setEncoding("utf8");

  // START OF GET
  if (req.method === "GET") {
    let URL = req.url;
    let date = new Date();

    if (URL === "/") {
      URL = "/index.html";
    }

    let getType = URL.split(".");
    let contentType = getType[1]; // grab "html" or "css"

    // check the public directory
    fs.readdir("./public/", (err, dir) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": `application/json, charset=utf-8`,
          error: `resource ${req.url} does not exist`,
          Date: date
        });
        res.end();
      } else if (!dir.includes(URL.slice(1))) {
        // check if public directory has the specified URL
        URL = "/404.html";
        contentType = "html";
      }

      // read contents of the public dir
      fs.readFile(`./public${URL}`, (err, data) => {
        if (err) {
          res.writeHead(500, {
            "Content-Type": `application/json, charset=utf-8`,
            error: `resource ${req.url} does not exist`,
            Date: date
          });
          res.end();
        }
        // write the header info
        res.writeHead(200, {
          "content-length": data.toString().length,
          "content-type": `text/${contentType}`
        });
        // write the actual file data
        res.write(data.toString());
        res.end();
        return;
      });
    });
  } // END OF GET

  // START OF POST
  else if (req.method === "POST") {
    let URL = req.url;
    let date = new Date();

    // body
    let body = ""; // the data coming from Postman
    req.on("data", chunk => {
      body += chunk;

      req.on("end", () => {
        fs.writeFile(
          `./public${URL}.html`,
          elemTemplate(querystring.parse(body)), // read data as an object
          err => {
            if (err) {
              res.writeHead(500, {
                "Content-Type": `application/json, charset=utf-8`,
                error: `resource ${req.url} does not exist`,
                Date: date
              });
              res.end();
            }
          }
        );

        fs.readdir(`./public`, (err, files) => {
          // read the public folder directory
          if (err) {
            res.writeHead(500, {
              "Content-Type": `application/json, charset=utf-8`,
              error: `resource ${req.url} does not exist`,
              Date: date
            });
            res.end();
          }

          let filteredFiles = files.filter(
            // take out anything that's not an element html file
            element =>
              !element.includes(".keep") &&
              !element.includes("404.html") &&
              !element.includes("index.html") &&
              !element.includes("css")
          );

          let count = filteredFiles.length;
          let listElement = ``;
          let nameFormat = ``;

          for (let i = 0; i < filteredFiles.length; i++) {
            // formatting name and links for index.html
            nameFormat =
              filteredFiles[i].charAt(0).toUpperCase() +
              filteredFiles[i].split(".")[0].slice(1);
            listElement += `
            <li>
            <a href="/${filteredFiles[i]}">${nameFormat}</a>
            </li>`;
          }

          let newIndex = indexTemplate(listElement, count);

          fs.writeFile(`./public/index.html`, newIndex, err => {
            // overwrite index file with updated index file
            if (err) {
              res.writeHead(500, {
                "Content-Type": `application/json, charset=utf-8`,
                error: `resource ${req.url} does not exist`,
                Date: date
              });
              res.end();
            }
          });
        });
        res.end();
      });
    });
  } // END OF POST
});

server.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
