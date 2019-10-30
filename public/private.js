function request(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          cb(null, xhr.responseText);
        } else {
          cb("error" + xhr.responseType);
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }
  


  function showTransactionsListDom(err, data) {
    if (err) {
      throw new Error("We have an error:", err);
    } else {
      var transactions = JSON.parse(data)
      var table = document.getElementById("transactions-table");
      transactions.forEach(function(tran) {
        var row = document.createElement("tr");
        var date = document.createElement("td");
        date.innerHTML = tran.date;
        row.appendChild(date);
        var desc = document.createElement("td");
        desc.innerHTML = tran.descrip;
        row.appendChild(desc);
        var charge = document.createElement("td");
        charge.innerHTML = tran.charge;
        row.appendChild(charge);
        table.appendChild(row);
      });
    }
}


request("/transactions", showTransactionsListDom);