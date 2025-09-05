export default function SchoolCard({ school }) {
  return (
    <div className="school-card">
      <img
        src={school.image || "/placeholder-school.jpg"}
        alt={school.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
        onError={(e) => (e.target.src = "/placeholder-school.jpg")}
      />
      <h3>{school.name}</h3>
      <p>{school.city}, {school.state}</p>
      <p>{school.address}</p>
      <p>📞 {school.contact}</p>
      <p>✉️ {school.email_id}</p>
    </div>
  );
}
