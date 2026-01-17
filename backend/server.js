const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let expenses = [];

// Get all expenses
app.get("/expenses", (req, res) => {
  res.json(expenses);
});

// Add expense
app.post("/add-expense", (req, res) => {
  expenses.push(req.body);
  res.json({ message: "Expense added" });
});

// Delete expense by index
app.delete("/delete-expense/:index", (req, res) => {
  const index = req.params.index;
  expenses.splice(index, 1);
  res.json({ message: "Expense deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
