const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();


// GET ALL MEMBERS
router.get("/", auth, async (req, res) => {
  try {
    const members = await pool.query(
      "SELECT * FROM members ORDER BY id"
    );

    res.json(members.rows);

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ADD MEMBER
router.post("/", auth, async (req, res) => {
  try {
    const { name, email } = req.body;

    const member = await pool.query(
      `INSERT INTO members(name, email)
       VALUES($1, $2)
       RETURNING *`,
      [name, email]
    );

    res.status(201).json({
      message: "Member added successfully",
      member: member.rows[0]
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// UPDATE MEMBER
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedMember = await pool.query(
      `UPDATE members
       SET name = $1,
           email = $2
       WHERE id = $3
       RETURNING *`,
      [name, email, id]
    );

    res.json({
      message: "Member updated successfully",
      member: updatedMember.rows[0]
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// DELETE MEMBER
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM members WHERE id = $1",
      [id]
    );

    res.json({
      message: "Member deleted successfully"
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;