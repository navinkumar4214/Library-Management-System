import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    issuedBooks: 0,
    availableBooks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
  <div style={{ padding: "20px" }}>
    <Navbar />

    <h1>Library Dashboard</h1>

    <h3>Total Books: {stats.totalBooks}</h3>
    <h3>Total Members: {stats.totalMembers}</h3>
    <h3>Issued Books: {stats.issuedBooks}</h3>
    <h3>Available Books: {stats.availableBooks}</h3>
  </div>
);
}

export default Dashboard;