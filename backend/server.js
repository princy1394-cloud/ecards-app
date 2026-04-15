const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Helper to read data
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return { cards: [] };
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all cards (for Dashboard)
app.get('/api/cards', (req, res) => {
  const data = readData();
  res.json(data.cards);
});

// GET single card details
app.get('/api/cards/:id', (req, res) => {
  const data = readData();
  const card = data.cards.find(c => c.id === req.params.id);
  if (!card) return res.status(404).json({ error: 'Card not found' });
  res.json(card);
});

// POST new card
app.post('/api/cards', (req, res) => {
  const data = readData();
  const newCard = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5), // unique URL id
    title: req.body.title || 'Untitled Card',
    occasion: req.body.occasion || 'General',
    theme: req.body.theme || 'default',
    creator: req.body.creator || 'Anonymous',
    status: 'draft',
    messages: [],
    createdAt: new Date().toISOString()
  };
  data.cards.push(newCard);
  writeData(data);
  res.status(201).json(newCard);
});

// POST new message to a card
app.post('/api/cards/:id/messages', (req, res) => {
  const data = readData();
  const cardIndex = data.cards.findIndex(c => c.id === req.params.id);
  if (cardIndex === -1) return res.status(404).json({ error: 'Card not found' });
  
  const newMessage = {
    id: Date.now().toString(),
    author: req.body.author || 'Guest',
    text: req.body.text || '',
    font: req.body.font || 'sans',
    color: req.body.color || '#000000',
    createdAt: new Date().toISOString()
  };
  
  data.cards[cardIndex].messages.push(newMessage);
  writeData(data);
  res.status(201).json(newMessage);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
