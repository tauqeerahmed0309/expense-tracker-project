const API_URL = "https://expense-tracker-project-1-re45.onrender.com";

function addExpense() {
    const title = document.getElementById("title").value.trim();
    const amount = document.getElementById("amount").value.trim();

    if (title === "" || amount === "") {
        alert("Please enter both title and amount");
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
    .catch(() => alert("Backend not connected"));
}

function loadExpenses() {
    fetch(`${API_URL}/expenses`)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("list");
            list.innerHTML = "";

            if (data.length === 0) {
                list.innerHTML = `<tr><td colspan="2">No expenses found</td></tr>`;
                return;
            }

            data.forEach(e => {
                list.innerHTML += `
                    <tr>
                        <td>${e.title}</td>
                        <td>₹${e.amount}</td>
                    </tr>
                `;
            });
        })
        .catch(() => {
            const list = document.getElementById("list");
            list.innerHTML = `<tr><td colspan="2"></td></tr>`;
        });
}

// Auto-load expenses
loadExpenses();
