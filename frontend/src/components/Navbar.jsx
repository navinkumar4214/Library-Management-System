import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/books">Books</Link> |{" "}
      <Link to="/members">Members</Link> |{" "}
      <Link to="/transactions">Transactions</Link> |{" "}
      <button onClick={logout}>Logout</button>

      <hr />
    </div>
  );
}

export default Navbar;