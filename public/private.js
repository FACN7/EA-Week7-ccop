function request(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
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
        row.appendChild(date);
        var balance = document.createElement("td");
        balance.innerHTML = tran.balance;
        row.appendChild(balance);
        table.appendChild(row);
      });
    }
}


request("/transactions", showTransactionsListDom);