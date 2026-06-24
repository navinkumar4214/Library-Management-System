const express = require("express");
const cors = require("cors");
const pool = require("./db");

const authRoutes = require("./routes/auth"); //connect route in server.js

const app = express();

const booksRoutes = require("./routes/books"); // connect books route

const membersRoutes = require("./routes/members");//connect members route

const transactionsRoutes = require("./routes/transactions");//connect transactions route

const dashboardRoutes = require("./routes/dashboard");//connect dashboard route


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); //connect route in server.js
app.use("/api/books", booksRoutes);//books route
app.use("/api/members", membersRoutes);//members route
app.use("/api/transactions", transactionsRoutes);//transaction route
app.use("/api/dashboard", dashboardRoutes);//dashboard route

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connected!",
      time: result.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Database connection failed");
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});