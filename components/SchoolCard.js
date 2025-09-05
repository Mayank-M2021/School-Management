// components/SchoolCard.js
export default function SchoolCard({ school }) {
  return (
    <div className="school-card">
      {/* Image */}
      <div className="school-image-container">
        <img
          src={school.image ? school.image : "/placeholder-school.jpg"}
          alt={school.name}
          onError={(e) => {
            e.currentTarget.src = "/placeholder-school.jpg";
          }}
          className="school-image"
        />
        <span className="school-badge">School</span>
      </div>

      {/* Info */}
      <div className="school-info">
        <h3 className="school-name">{school.name}</h3>
        
        <div className="school-location">
          <span className="location-icon">📍</span>
          <span className="school-city">{school.city}, {school.state}</span>
        </div>

        {school.address && (
          <p className="school-address">{school.address}</p>
        )}

        {/* Contact */}
        {(school.contact || school.email_id) && (
          <div className="school-contact-info">
            {school.contact && (
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>{school.contact}</span>
              </div>
            )}
            {school.email_id && (
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span className="school-email">{school.email_id}</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="school-actions">
          <button className="btn-view-details">View Details</button>
          <button className="btn-contact">Contact</button>
        </div>
      </div>
    </div>
  );
}