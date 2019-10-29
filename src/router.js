const {
} = require("./handlers");
  

const router = (request, response) => {
    const { url } = request;
      if (url === "/") {
      homeHandler(response);
    } else if (url === "/login") {

    } else if (url.includes("public")) {
        publicHandler(url, response);
    } else if (url === "/logout") {
    
    } else if (url === "/add-trnasaction") {
      
    } else if (url === "/delete-trnasaction") {
    } else {
      errorHandler(response);
    }
  };
  
  module.exports = router;
  