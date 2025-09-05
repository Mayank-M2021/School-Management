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
      <div className="container text-center py-12">
        <div className="loading-spinner"></div>
        <h2 className="mt-4 text-gray-600">Loading schools...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-12 text-red-500">
        <h2>{error}</h2>
        <button
          onClick={fetchSchools}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          All Schools
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            ({schools.length} schools found)
          </span>
        </h1>

        {/* Filters */}
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
            All Schools
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
            Recent
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
            A-Z
          </button>
        </div>
      </div>

      {/* Schools Grid */}
      {schools.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🏫</div>
          <h2 className="text-xl font-semibold">No schools found</h2>
          <p className="text-gray-600 mb-4">
            Be the first to add a school to our directory!
          </p>
          <a
            href="/addSchool"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add First School
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  );
}
