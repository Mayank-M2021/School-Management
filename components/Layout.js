import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <Link href="/" className="navbar-brand">
            School Management
          </Link>
          <div className="navbar-nav">
            <Link href="/addSchool">Add School</Link>
            <Link href="/showSchools">View Schools</Link>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}