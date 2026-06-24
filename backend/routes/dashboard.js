const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/stats", auth, async (req, res) => {
  try {
    const totalBooks = await pool.query(
      "SELECT COUNT(*) FROM books"
    );

    const totalMembers = await pool.query(
      "SELECT COUNT(*) FROM members"
    );

    const issuedBooks = await pool.query(
      "SELECT COUNT(*) FROM transactions WHERE status = 'ISSUED'"
    );

    const availableBooks = await pool.query(
      "SELECT SUM(quantity) FROM books"
    );

    res.json({
      totalBooks: Number(totalBooks.rows[0].count),
      totalMembers: Number(totalMembers.rows[0].count),
      issuedBooks: Number(issuedBooks.rows[0].count),
      availableBooks: Number(
        availableBooks.rows[0].sum || 0
      )
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;