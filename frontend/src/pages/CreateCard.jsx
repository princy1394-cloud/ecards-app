import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCard } from '../api';

const CreateCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', occasion: 'birthday', theme: 'default', creator: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newCard = await createCard(formData);
      navigate(`/card/${newCard.id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create card');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Create a New Group Ecard</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Card Title (e.g. Happy Birthday Sarah!)</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Title" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Your Name (Creator)</label>
            <input type="text" required value={formData.creator} onChange={e => setFormData({...formData, creator: e.target.value})} placeholder="John Doe" />
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Occasion</label>
              <select value={formData.occasion} onChange={e => setFormData({...formData, occasion: e.target.value})}>
                <option value="birthday">Birthday</option>
                <option value="farewell">Farewell</option>
                <option value="anniversary">Anniversary</option>
                <option value="appreciation">Appreciation</option>
                <option value="general">General</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Theme</label>
              <select value={formData.theme} onChange={e => setFormData({...formData, theme: e.target.value})}>
                <option value="default">Default Light</option>
                <option value="dark">Elegant Dark</option>
                <option value="celebration">Celebration Confetti</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Creating...' : 'Create Card & Get Share Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
