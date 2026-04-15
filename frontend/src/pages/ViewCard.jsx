import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCard, addMessage } from '../api';

const ViewCard = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignForm, setShowSignForm] = useState(false);
  const [msgData, setMsgData] = useState({ author: '', text: '', font: 'sans', color: '#000000' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCard();
  }, [id]);

  const loadCard = () => {
    getCard(id).then(data => { setCard(data); setLoading(false); }).catch(e => { console.error(e); setLoading(false); });
  };

  const handleSign = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addMessage(id, msgData);
      setShowSignForm(false);
      setMsgData({ author: '', text: '', font: 'sans', color: '#000000' });
      loadCard();
    } catch(err) {
      console.error(err);
      alert('Failed to add message');
    }
    setSubmitting(false);
  };

  if (loading) return <div>Loading card...</div>;
  if (!card) return <div className="card" style={{ textAlign: 'center' }}><h2>Card Not Found</h2></div>;

  const bgStyle = card.theme === 'dark' ? '#1e293b' : card.theme === 'celebration' ? '#fdf2f8' : 'white';
  const textStyle = card.theme === 'dark' ? 'white' : 'var(--text-main)';

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{card.title}</h1>
        <p style={{ color: 'var(--text-muted)' }}>Created by {card.creator} for {card.occasion}</p>
        
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={() => setShowSignForm(!showSignForm)}>
            {showSignForm ? 'Cancel' : 'Sign This Card'}
          </button>
          <button className="btn btn-secondary" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to share with contributors!');
          }}>Share Link</button>
        </div>
      </div>

      {showSignForm && (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          <h3>Add Your Message</h3>
          <form onSubmit={handleSign}>
            <input type="text" placeholder="Your Name" required value={msgData.author} onChange={e => setMsgData({...msgData, author: e.target.value})} />
            <textarea placeholder="Write a nice message..." required rows={4} value={msgData.text} onChange={e => setMsgData({...msgData, text: e.target.value})}></textarea>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.9rem' }}>Font Style</label>
                <select value={msgData.font} onChange={e => setMsgData({...msgData, font: e.target.value})}>
                  <option value="sans">Modern Sans</option>
                  <option value="serif">Classic Serif</option>
                  <option value="cursive">Playful Cursive</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.9rem' }}>Text Color</label>
                <input type="color" value={msgData.color} onChange={e => setMsgData({...msgData, color: e.target.value})} style={{ height: '42px', padding: '0 4px' }} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={submitting}>
              {submitting ? 'Adding...' : 'Post Message'}
            </button>
          </form>
        </div>
      )}

      {/* Signature Wall */}
      <div style={{ 
        background: bgStyle, color: textStyle, padding: '3rem', 
        borderRadius: 'var(--radius-lg)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        minHeight: '400px', position: 'relative', overflow: 'hidden'
      }}>
        {card.messages.length === 0 ? (
          <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '20%' }}>Be the first to sign this card!</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {card.messages.map(msg => (
              <div key={msg.id} style={{
                background: card.theme === 'dark' ? '#334155' : 'white',
                padding: '1.5rem', borderRadius: 'var(--radius-md)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                transform: `rotate(${Math.random() * 4 - 2}deg)`,
                fontFamily: msg.font === 'cursive' ? 'cursive, sans-serif' : msg.font === 'serif' ? 'serif' : 'sans-serif'
              }}>
                <p style={{ color: msg.color, fontSize: '1.1rem', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                <div style={{ fontWeight: 'bold', borderTop: '1px solid var(--border)', paddingTop: '0.5rem', opacity: 0.8 }}>- {msg.author}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCard;
