const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/add-expense", (req, res) => {
    const { title, amount } = req.body;

    db.run(
        "INSERT INTO expenses (title, amount) VALUES (?, ?)",
        [title, amount],
        () => res.send("Expense added")
    );
});

app.get("/expenses", (req, res) => {
    db.all("SELECT * FROM expenses", [], (err, rows) => {
        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
