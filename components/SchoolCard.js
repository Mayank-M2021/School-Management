// components/SchoolCard.js
export default function SchoolCard({ school }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col">
      {/* Image */}
      <div className="relative">
        <img
          src={school.image ? school.image : "/placeholder-school.jpg"}
          alt={school.name}
          onError={(e) => { e.target.src = "/placeholder-school.jpg"; }}
          className="w-full h-48 object-cover rounded-md"
        />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          School
        </span>
      </div>

      {/* Info */}
      <div className="mt-3 flex-1">
        <h3 className="text-lg font-bold text-gray-800">{school.name}</h3>
        <p className="text-sm text-gray-600">{school.city}, {school.state}</p>
        <p className="text-gray-500 text-sm mt-1">{school.address}</p>

        {/* Contact */}
        <div className="mt-3 space-y-1 text-sm">
          {school.contact && (
            <p className="flex items-center text-gray-700">
              <span className="mr-2">📞</span> {school.contact}
            </p>
          )}
          {school.email_id && (
            <p className="flex items-center text-gray-700">
              <span className="mr-2">✉️</span> {school.email_id}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          View Details
        </button>
        <button className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-100 transition">
          Contact
        </button>
      </div>
    </div>
  );
}
