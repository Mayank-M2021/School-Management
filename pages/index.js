import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#333' }}>
          School Management System
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#666' }}>
          Manage school information efficiently
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/addSchool" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', minWidth: '150px' }}>
            Add New School
          </Link>
          <Link href="/showSchools" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', minWidth: '150px' }}>
            View All Schools
          </Link>
        </div>
      </div>
    </div>
  );
}