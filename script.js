const API_URL = "https://expense-tracker-project-1-re45.onrender.com";

function setStatus(msg, color = "green") {
  const status = document.getElementById("status");
  status.style.color = color;
  status.innerText = msg;
  setTimeout(() => (status.innerText = ""), 2000);
}

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;

  if (!title || !amount) {
    setStatus("Fill all fields", "red");
    return;
  }

  fetch(`${API_URL}/add-expense`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, amount })
  })
    .then(() => {
      document.getElementById("title").value = "";
      document.getElementById("amount").value = "";
      setStatus("Expense added ✔");
      loadExpenses();
    })
    .catch(() => setStatus("Backend sleeping, try again", "red"));
}

// Load expenses
function loadExpenses() {
  fetch(`${API_URL}/expenses`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      const total = document.getElementById("total");

      list.innerHTML = "";
      let sum = 0;

      data.forEach(exp => {
        sum += Number(exp.amount);
        list.innerHTML += `
          <tr>
            <td>${exp.title}</td>
            <td>₹${exp.amount}</td>
          </tr>
        `;
      });

      total.innerText = "₹" + sum;
    });
}


// Refresh button = clear all expenses
function refreshExpenses() {
  fetch(`${API_URL}/clear-expenses`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(() => {
    loadExpenses();
  })
  .catch(err => console.error(err));
}


// Load initially
loadExpenses();
