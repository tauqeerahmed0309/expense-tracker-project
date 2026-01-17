const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let expenses = [];

/* ✅ ADD THIS HERE */
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

/* existing routes */
app.get("/expenses", (req, res) => {
  res.json(expenses);
});

app.post("/expenses", (req, res) => {
  expenses.push(req.body);
  res.json({ message: "Expense added" });
});

app.delete("/clear-expenses", (req, res) => {
  expenses = [];
  res.json({ message: "All expenses cleared" });
});

/* ✅ PORT FIX (CRITICAL) */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
