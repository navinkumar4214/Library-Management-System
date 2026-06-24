import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
  fetchTransactions();
  fetchBooks();
  fetchMembers();
}, []);
  
  const fetchBooks = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/books",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setBooks(res.data);

  } catch (err) {
    console.log(err);
  }
};

  const fetchMembers = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/members",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setMembers(res.data);

  } catch (err) {
    console.log(err);
  }
};

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTransactions(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const issueBook = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/transactions/issue",
      {
        book_id: Number(bookId),
        member_id: Number(memberId),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchTransactions();

  } catch (err) {
    console.log(err);
  }
};

  const returnBook = async (transactionId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/transactions/return",
      {
        transaction_id: transactionId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchTransactions();
    fetchBooks();

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div style={{ padding: "20px" }}>
        <Navbar />
      <h1>Transactions</h1>

      <select
  value={memberId}
  onChange={(e) => setMemberId(e.target.value)}
>
  <option value="">Select Member</option>

  {members.map((member) => (
    <option
      key={member.id}
      value={member.id}
    >
      {member.name}
    </option>
  ))}
</select>

<select
  value={bookId}
  onChange={(e) => setBookId(e.target.value)}
>
  <option value="">Select Book</option>

  {books.map((book) => (
    <option
      key={book.id}
      value={book.id}
    >
      {book.title}
    </option>
  ))}
</select>

<button onClick={issueBook}>
  Issue Book
</button>

<br />
<br />

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Member</th>
            <th>Book</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.member_name}</td>
              <td>{t.book_title}</td>
              <td>{t.issue_date}</td>
              <td>{t.return_date}</td>
              <td>{t.status}</td>
              <td>
                  {t.status === "ISSUED" && (
                    <button
                      onClick={() => returnBook(t.id)}
                    >
                      Return
                    </button>
                  )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;