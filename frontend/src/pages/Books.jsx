import { useEffect, useState } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editId, setEditId] = useState(null);

  const handleEdit = (book) => {
  setEditId(book.id);
  setTitle(book.title);
  setAuthor(book.author);
  setQuantity(book.quantity);
};

  useEffect(() => {
    fetchBooks();
  }, []);
  
 const addBook = async () => {
  if (!title || !author || !quantity) {
    alert("Please fill all fields");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/books",
      {
        title,
        author,
        quantity: Number(quantity),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTitle("");
    setAuthor("");
    setQuantity("");

    fetchBooks();

  } catch (err) {
    console.log(err);
  }
};

const deleteBook = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/books/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchBooks();

  } catch (err) {
    console.log(err);
  }
};

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

const updateBook = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/books/${editId}`,
      {
        title,
        author,
        quantity: Number(quantity),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setEditId(null);
    setTitle("");
    setAuthor("");
    setQuantity("");

    fetchBooks();

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div>
      <h1>Books Page</h1>

      <div>
  <input
    type="text"
    placeholder="Book Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <input
    type="text"
    placeholder="Author"
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
  />

  <input
    type="number"
    placeholder="Quantity"
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
  />

    <button onClick={editId ? updateBook : addBook}>
        {editId ? "Update Book" : "Add Book"}
    </button>
</div>

<br />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity}</td>
              <td>
                <button onClick={() => handleEdit(book)}>
                    Edit
                </button>

                <button onClick={() => deleteBook(book.id)}>
                    Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default Books;