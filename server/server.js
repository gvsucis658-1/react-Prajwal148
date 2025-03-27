const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enable Cross-Origin Resource Sharing so your React app can access the API
app.use(cors());
app.use(bodyParser.json());

// In-memory data store
let trainers = [
  { id: 1, name: 'Prajwal', specialization: 'Strength Training', experience: 5, contact: 'Prajwal@gmail.com' },
  { id: 2, name: 'Tom Cruse', specialization: 'Yoga', experience: 3, contact: 'tommy@gmail.com' }
];
let nextId = 3;

// READ: Get all trainers
app.get('/trainers', (req, res) => {
  res.json(trainers);
});

// CREATE: Add a new trainer
app.post('/trainers', (req, res) => {
  const newTrainer = { id: nextId++, ...req.body };
  trainers.push(newTrainer);
  res.status(201).json(newTrainer);
});

// UPDATE: Update an existing trainer
app.put('/trainers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = trainers.findIndex(tr => tr.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Trainer not found' });
  }
  trainers[index] = { id, ...req.body };
  res.json(trainers[index]);
});

// DELETE: Remove a trainer
app.delete('/trainers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = trainers.findIndex(tr => tr.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Trainer not found' });
  }
  const deletedTrainer = trainers.splice(index, 1);
  res.json(deletedTrainer[0]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
