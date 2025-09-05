// pages/showSchools.jsx
import { useState, useEffect } from "react";
import SchoolCard from "../components/SchoolCard";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch("/api/schools");
      if (response.ok) {
        const data = await response.json();
        setSchools(data);
      } else {
        throw new Error("Failed to fetch schools");
      }
    } catch (error) {
      setError("Error loading schools. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
          <div className="loading-spinner"></div>
          <h2 style={{ marginTop: '1rem', color: '#6c757d' }}>Loading schools...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', paddingTop: '3rem', color: '#dc3545' }}>
          <h2>{error}</h2>
          <button
            onClick={fetchSchools}
            className="btn-primary"
            style={{ marginTop: '1rem', width: 'auto', padding: '12px 24px' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="schools-header">
        <h1 className="schools-title">
          All Schools
          <span className="schools-count">
            {schools.length} found
          </span>
        </h1>

        {/* Filters */}
        <div className="schools-filters">
          <button className="filter-btn active">All Schools</button>
          <button className="filter-btn">Recent</button>
          <button className="filter-btn">A-Z</button>
        </div>
      </div>

      {/* Schools Grid */}
      {schools.length === 0 ? (
        <div className="no-schools">
          <div className="no-schools-icon">🏫</div>
          <h2>No schools found</h2>
          <p>Be the first to add a school to our directory!</p>
          <a
            href="/addSchool"
            className="btn-primary"
            style={{ 
              display: 'inline-block', 
              textDecoration: 'none', 
              width: 'auto',
              padding: '15px 30px'
            }}
          >
            Add First School
          </a>
        </div>
      ) : (
        <div className="schools-grid">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  );
}