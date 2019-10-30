const {   homeHandler,
    publicHandler,
    errorHandler,
    loginHandler,
    signUpHandler,
    transactionsHandler,
    logoutHandler,
    addtransactionsHandles
  } = require("./handlers");
  

const router = (request, response) => {
  
    const { url } = request;
    console.log(url);

      if (url === "/") {
      homeHandler(request,response);
    } else if (url === "/login") {
        loginHandler(request,response)

    }  else if (url === "/signup") {
        signUpHandler(request,response)

    }else if (url.includes("public")) {
        publicHandler(url, response);
    } else if (url === "/logout") {
      logoutHandler(request,response);
    } else if (url === "/add-transaction") {
      addtransactionsHandles(request,response);
    }  else if (url === "/transactions") {
      transactionsHandler(request,response)
    }else if (url === "/delete-trnasaction") {
    } else {
      errorHandler(response);
    }
  };
  
  module.exports = router;
  