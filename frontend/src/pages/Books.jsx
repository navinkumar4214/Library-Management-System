import { useEffect, useState } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      
      console.log("TOKEN FROM STORAGE:", token);

      const res = await axios.get(
        "http://localhost:5000/api/books",
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log(res.data);

      setBooks(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Books Page</h1>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;