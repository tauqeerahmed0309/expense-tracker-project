const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let expenses = [];

app.get("/expenses", (req, res) => {
  res.json(expenses);
});

app.post("/add-expense", (req, res) => {
  expenses.push(req.body);
  res.json({ message: "Expense added" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
