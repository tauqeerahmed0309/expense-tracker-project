function addExpense() {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;

    fetch("http://localhost:3000/add-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount })
    })
    .then(() => loadExpenses());
}

function loadExpenses() {
    fetch("http://localhost:3000/expenses")
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("list");
        list.innerHTML = "";

        data.forEach(e => {
            list.innerHTML += `
                <tr>
                    <td>${e.title}</td>
                    <td>${e.amount}</td>
                </tr>
            `;
        });
    });
}

loadExpenses();
