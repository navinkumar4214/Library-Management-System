
const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const transactions = await pool.query(
      `SELECT
        t.id,
        b.title AS book_title,
        m.name AS member_name,
        t.issue_date,
        t.return_date,
        t.status
      FROM transactions t
      JOIN books b ON t.book_id = b.id
      JOIN members m ON t.member_id = m.id
      ORDER BY t.id DESC`
    );

    res.json(transactions.rows);

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.post("/issue", auth, async (req, res) => {
  try {
    const { book_id, member_id } = req.body;

    const book = await pool.query(
      "SELECT * FROM books WHERE id = $1",
      [book_id]
    );

    if (book.rows.length === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    if (book.rows[0].quantity <= 0) {
      return res.status(400).json({
        message: "Book out of stock"
      });
    }

    const transaction = await pool.query(
      `INSERT INTO transactions
      (book_id, member_id, issue_date, status)
      VALUES ($1, $2, CURRENT_DATE, 'ISSUED')
      RETURNING *`,
      [book_id, member_id]
    );

    await pool.query(
      `UPDATE books
       SET quantity = quantity - 1
       WHERE id = $1`,
      [book_id]
    );

    res.status(201).json({
      message: "Book issued successfully",
      transaction: transaction.rows[0]
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.post("/return", auth, async (req, res) => {
  try {
    const { transaction_id } = req.body;

    const transaction = await pool.query(
      "SELECT * FROM transactions WHERE id = $1",
      [transaction_id]
    );

    if (transaction.rows.length === 0) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    const currentTransaction = transaction.rows[0];

    if (currentTransaction.status === "RETURNED") {
      return res.status(400).json({
        message: "Book already returned"
      });
    }

    await pool.query(
      `UPDATE transactions
       SET status = 'RETURNED',
           return_date = CURRENT_DATE
       WHERE id = $1`,
      [transaction_id]
    );

    await pool.query(
      `UPDATE books
       SET quantity = quantity + 1
       WHERE id = $1`,
      [currentTransaction.book_id]
    );

    res.json({
      message: "Book returned successfully"
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;