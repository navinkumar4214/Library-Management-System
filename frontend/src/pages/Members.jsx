import { useEffect, useState } from "react";
import axios from "axios";

function Members() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

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

  const addMember = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/members",
      {
        name,
        email,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setName("");
    setEmail("");

    fetchMembers();

  } catch (err) {
    console.log(err);
  }
};

const handleEdit = (member) => {
  setEditId(member.id);
  setName(member.name);
  setEmail(member.email);
};

const updateMember = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/members/${editId}`,
      {
        name,
        email,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setEditId(null);
    setName("");
    setEmail("");

    fetchMembers();

  } catch (err) {
    console.log(err);
  }
};

const deleteMember = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/members/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchMembers();

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div>
      <h1>Members Page</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={editId ? updateMember : addMember}>
        {editId ? "Update Member" : "Add Member"}
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>
              <button onClick={() => handleEdit(member)}>
                  Edit
              </button>
  
              <button onClick={() => deleteMember(member.id)}>
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

export default Members;