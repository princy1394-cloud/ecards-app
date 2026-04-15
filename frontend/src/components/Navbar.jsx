import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{ background: 'var(--surface-color)', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.25rem' }}>
          <Mail /> GroupEcards
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" className="btn btn-secondary">Dashboard</Link>
          <Link to="/create" className="btn btn-primary">Create Card</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
