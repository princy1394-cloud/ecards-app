const API_URL = 'http://localhost:5000/api';

export const getCards = async () => {
  const res = await fetch(`${API_URL}/cards`);
  return res.json();
};

export const getCard = async (id) => {
  const res = await fetch(`${API_URL}/cards/${id}`);
  if (!res.ok) throw new Error('Card not found');
  return res.json();
};

export const createCard = async (data) => {
  const res = await fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const addMessage = async (cardId, data) => {
  const res = await fetch(`${API_URL}/cards/${cardId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};
