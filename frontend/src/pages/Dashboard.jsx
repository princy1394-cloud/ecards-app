import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCards } from '../api';
import { PlusCircle, Gift, Users } from 'lucide-react';

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCards()
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading dashboard...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>My Ecards Dashboard</h2>
        <Link to="/create" className="btn btn-primary"><PlusCircle size={20} /> Create New Card</Link>
      </div>

      {cards.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <Gift size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>No Cards Yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Start by creating your first group ecard!</p>
          <Link to="/create" className="btn btn-primary">Create Card</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {cards.map(card => (
            <div key={card.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{card.title}</h3>
                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', background: 'var(--bg-color)', borderRadius: '4px', textTransform: 'capitalize' }}>
                  {card.occasion}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                <Users size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                {card.messages?.length || 0} signatures
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/card/${card.id}`} className="btn btn-primary" style={{ flex: 1 }}>View Card</Link>
                <button className="btn btn-secondary" onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/card/${card.id}`);
                  alert('Share link copied to clipboard!');
                }}>Copy Link</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
