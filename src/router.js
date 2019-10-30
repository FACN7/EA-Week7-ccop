const {   homeHandler,
    publicHandler,
    errorHandler,loginHandler,signUpHandler} = require("./handlers");
  

const router = (request, response) => {
  
    const { url } = request;
    console.log(url);

      if (url === "/") {
      homeHandler(response);
    } else if (url === "/login") {
        loginHandler(request,response)

    }  else if (url === "/signup") {
        signUpHandler(request,response)

    }else if (url.includes("public")) {
        publicHandler(url, response);
    } else if (url === "/logout") {
    } else if (url === "/add-trnasaction") {
      
    } else if (url === "/delete-trnasaction") {
    } else {
      errorHandler(response);
    }
  };
  
  module.exports = router;
  