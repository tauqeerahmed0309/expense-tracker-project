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
      loadExpenses();
    })
    .catch(() => setStatus("Backend sleeping, wait 30s", "red"));
}

function loadExpenses() {
  fetch(`${API_URL}/expenses`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      const totalEl = document.getElementById("total");
      list.innerHTML = "";
      let total = 0;

      if (data.length === 0) {
        list.innerHTML = `<tr><td colspan="3">No expenses</td></tr>`;
        totalEl.innerText = 0;
        return;
      }

      data.forEach((e, index) => {
        total += Number(e.amount);
        list.innerHTML += `
          <tr>
            <td>${e.title}</td>
            <td>₹${e.amount}</td>
            <td>
              <button class="delete-btn" onclick="deleteExpense(${index})">
                Delete
              </button>
            </td>
          </tr>
        `;
      });

      totalEl.innerText = total;
    });
}

function deleteExpense(index) {
  fetch(`${API_URL}/delete-expense/${index}`, {
    method: "DELETE"
  })
    .then(() => {
      setStatus("Deleted ✔");
      loadExpenses();
    })
    .catch(() => setStatus("Delete failed", "red"));
}

// Refresh button works because it calls this
loadExpenses();
