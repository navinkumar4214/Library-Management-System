const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();


// GET ALL BOOKS
router.get("/", auth, async (req, res) => {
  try {
    const books = await pool.query(
      "SELECT * FROM books ORDER BY id"
    );

    res.json(books.rows);

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ADD BOOK
router.post("/", auth, async (req, res) => {
  try {
    const { title, author, quantity } = req.body;

    const newBook = await pool.query(
      `INSERT INTO books(title, author, quantity)
       VALUES($1, $2, $3)
       RETURNING *`,
      [title, author, quantity]
    );

    res.status(201).json({
      message: "Book added successfully",
      book: newBook.rows[0]
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

// UPDATE BOOK
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, quantity } = req.body;

    const updatedBook = await pool.query(
      `UPDATE books
       SET title = $1,
           author = $2,
           quantity = $3
       WHERE id = $4
       RETURNING *`,
      [title, author, quantity, id]
    );

    if (updatedBook.rows.length === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json({
      message: "Book updated successfully",
      book: updatedBook.rows[0]
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

// DELETE BOOK
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );

    if (deletedBook.rows.length === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json({
      message: "Book deleted successfully"
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;