import React, { useState, useEffect } from 'react';
import TrainerList from './components/TrainerList';

const API_URL = 'http://localhost:5000'; // Update this if your API URL is different

function App() {
  const [trainers, setTrainers] = useState([]);
  const [newTrainer, setNewTrainer] = useState({ name: '', specialization: '', experience: '', contact: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch trainers from the API when the component mounts
  useEffect(() => {
    fetch(`${API_URL}/trainers`)
      .then(response => response.json())
      .then(data => setTrainers(data))
      .catch(error => console.error('Error fetching trainers:', error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewTrainer({ ...newTrainer, [e.target.name]: e.target.value });
  };

  // Handle form submission for creating or updating a trainer
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing trainer
      fetch(`${API_URL}/trainers/${currentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrainer)
      })
        .then(response => response.json())
        .then(updatedTrainer => {
          setTrainers(trainers.map(trainer => trainer.id === currentId ? updatedTrainer : trainer));
          setIsEditing(false);
          setCurrentId(null);
          setNewTrainer({ name: '', specialization: '', experience: '', contact: '' });
        })
        .catch(error => console.error('Error updating trainer:', error));
    } else {
      // Create new trainer
      fetch(`${API_URL}/trainers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrainer)
      })
        .then(response => response.json())
        .then(createdTrainer => {
          setTrainers([...trainers, createdTrainer]);
          setNewTrainer({ name: '', specialization: '', experience: '', contact: '' });
        })
        .catch(error => console.error('Error creating trainer:', error));
    }
  };

  // Prepare the form for editing a trainer
  const handleEdit = (trainer) => {
    setIsEditing(true);
    setCurrentId(trainer.id);
    setNewTrainer({
      name: trainer.name,
      specialization: trainer.specialization,
      experience: trainer.experience,
      contact: trainer.contact
    });
  };

  // Delete a trainer via the API
  const handleDelete = (id) => {
    fetch(`${API_URL}/trainers/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(deletedTrainer => {
        setTrainers(trainers.filter(trainer => trainer.id !== id));
      })
      .catch(error => console.error('Error deleting trainer:', error));
  };

  return (
    <div className="App">
      <h1>Our Trainers</h1>
      <TrainerList trainers={trainers} onEdit={handleEdit} onDelete={handleDelete} />

      <h2>{isEditing ? "Edit Trainer" : "Add a New Trainer"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newTrainer.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="specialization"
          value={newTrainer.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          required
        />
        <input
          type="number"
          name="experience"
          value={newTrainer.experience}
          onChange={handleChange}
          placeholder="Experience (Years)"
          required
        />
        <input
          type="email"
          name="contact"
          value={newTrainer.contact}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">
          {isEditing ? "Update Trainer" : "Add Trainer"}
        </button>
      </form>
    </div>
  );
}

export default App;
