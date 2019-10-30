const http = require("http");
const pg = require("pg");
const { readFile } = require("fs");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const queryString = require("querystring");
const login_query=require("./queries/login_query")
const signup_query = require("./queries/sign_up_query");
const transactions_query = require("./queries/transactions_query");

const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const {  comparePasswords,  hashPassword}=require('./scripts/passwordmangment');

const SECRET = 'poiugyfguhijokpkoihugyfyguhijo';




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
    console.log("homehandler")

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
console.log("loginhandler")
    let data = "";
    request.on("data", function (chunk) {
        
      data += chunk;
    });
    request.on("end", () => {
      const password = queryString.parse(data).password;
      const email = queryString.parse(data).email;

      login_query(email,(err,res)=>{
        if (err) {
            response.writeHead(500, "Content-Type: text/html");
            response.end("<h1>Sorry, there was a problem logging</h1>");
            console.log(err);
        }else{
            // console.log(res.rows);
            //assume res.rows is array of object
           let savedpassword= res.rows[0].password;
           comparePasswords(password,savedpassword,(err,result)=>{
            if(err){
              return send401();

            }else{
              if(result===false){
                response.writeHead(500, "Content-Type: text/html");
                response.end("<h1>Sorry, there was a problem logging password not correct</h1>");
              }else{
                  //setcookie savedpassword
                  response.writeHead(
                    302,
                    {
                      'Location': '/public/private.html',
                      'Set-Cookie': `jwt=${sign({email},SECRET)}; HttpOnly`
                    }
                  );
                  response.end();
              }
            }

           })
           
          //  verify(savedpassword, SECRET, (err, jwt) => {
          //   if (err) {
          //     return send401();
          //   } else {
          //       // check password
          //     const message = `Your user id is: ${jwt.userId}`;
          //     const jwtpassword = jwt.password;
          //     if(jwtpassword!==password){
          //       response.writeHead(500, "Content-Type: text/html");
          //       response.end("<h1>Sorry, there was a problem logging password not correct</h1>");
          //     }else{
          //         //setcookie savedpassword
          //         response.writeHead(
          //           302,
          //           {
          //             'Location': '/',
          //             'Set-Cookie': `jwt=${sign(jwt.password,SECRET)}; HttpOnly`
          //           }
          //         );
          //         response.end();
          //     }
          //   }
          // });
        }
          

      })


    });
      
  }

  const signUpHandler= (request, response) =>{
    const send401 = () => {
        const message = 'fail!';
        response.writeHead(
          401,
          {
            'Content-Type': 'text/plain',
            'Content-Length': message.length
          }
        );
        return response.end(message);
      }
    let data = "";
    request.on("data", function (chunk) {
      data += chunk;
    });
    request.on("end", () => {
      const password = queryString.parse(data).password;
      const email = queryString.parse(data).email;
      const name=queryString.parse(data).name;
    //   console.log(name,password,email);
      let userDetails={userId:email,password:password};
      console.log(userDetails)
      // const signup = sign(userDetails, SECRET);
    hashPassword(password,(err,result)=>{
      if(err){
        console.log("hashpassworderror:",err);

      }else{
        signup_query(email,name,result,(err,res)=>{
          //redircete
          if (err) {
              console.log("signup_query:",err);
              return send401();
            } else {
                      
              response.writeHead(
                302,
                {
                  'Location': '/'
                }
              );
              response.end();
  
              
            }
        })
      }
  

      })
    


    });
      
  }

module.exports = {
    homeHandler,
    publicHandler,
    errorHandler,
    loginHandler,
    signUpHandler
  };