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

// Clear all expenses (Refresh button)
app.delete("/clear-expenses", (req, res) => {
  expenses = [];
  res.json({ message: "All expenses cleared" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
