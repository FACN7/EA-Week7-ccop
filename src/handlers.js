const http = require("http");
const pg = require("pg");
const { readFile } = require("fs");
const fs = require("fs");
const path = require("path");
const queryString = require("querystring");



const serverError = (err, response) => {
    response.writeHead(500, "Content-Type:text/html");
    response.end("<h1>Sorry, there was a problem loading the homepage</h1>");
    console.log(err);
  };

  const publicHandler = (url, response) => {
    const filepath = path.join(__dirname, "..", url);
    readFile(filepath, (err, file) => {
      if (err) return serverError(err, response);
      const [, extension] = url.split(".");
      const extensionType = {
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        ico: "image/x-icon"
      };
      response.writeHead(200, { "content-type": extensionType[extension] });
      response.end(file);
    });
  };
  

const homeHandler = response => {
    const filepath = path.join(__dirname, "..", "public", "index.html");
    readFile(filepath, (err, file) => {
      if (err) return serverError(err, response);
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    });
  };

  const errorHandler = response => {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>404 Page Requested Cannot be Found</h1>");
  };

  const loginHandler= (request, response) =>{

    let data = "";
    request.on("data", function (chunk) {
      data += chunk;
    });
    request.on("end", () => {
      const password = queryString.parse(data).password;
      const email = queryString.parse(data).email;

    });
      
  }

  const signUpHandler= (request, response) =>{

    let data = "";
    request.on("data", function (chunk) {
      data += chunk;
    });
    request.on("end", () => {
      const password = queryString.parse(data).password;
      const email = queryString.parse(data).email;
      const name=queryString.parse(data).name;
      

    });
      
  }

module.exports = {
    homeHandler,
    publicHandler,
    errorHandler,
  };