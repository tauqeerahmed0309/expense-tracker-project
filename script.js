const API_URL = "https://expense-tracker-project-qbdz.onrender.com";
/* Load expenses on page load */
loadExpenses();

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;

  if (title === "" || amount === "") {
    // A customized browser alert could go here, but standard is fine
    alert("Please enter both fields");
    return;
  }

  // Change button text temporarily to show loading
  const btn = document.querySelector('.btn-add');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';

  fetch(`${API_URL}/add-expense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, amount })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    loadExpenses();
  })
  .catch(err => console.error(err))
  .finally(() => {
    btn.innerHTML = originalText;
  });
}

function loadExpenses() {
  fetch(`${API_URL}/expenses`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      const total = document.getElementById("total");

      list.innerHTML = "";
      let sum = 0;

      // Use reverse() so the newest items appear at the top
      data.reverse().forEach(exp => {
        sum += Number(exp.amount);
        list.innerHTML += `
          <tr>
            <td>${exp.title}</td>
            <td class="text-right" style="color: #00d2ff; font-weight: bold;">₹${exp.amount}</td>
          </tr>
        `;
      });

      total.innerText = sum;
    })
    .catch(err => console.error(err));
}

function refreshExpenses() {
  // Added a confirmation because "Refresh" actually deletes data in your API
  if(!confirm("Are you sure you want to reset all expenses? This cannot be undone.")) {
    return;
  }

  fetch(`${API_URL}/clear-expenses`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(() => {
    loadExpenses();
  })
  .catch(err => console.error(err));
});
}

