import React, { useState } from 'react';
import TrainerList from './components/TrainerList';

function App() {
  const [trainers, setTrainers] = useState([
    { id: 1, name: 'Prajwal', specialization: 'Strength Training', experience: 5, contact: 'Prajwal@gmail.com' },
    { id: 2, name: 'Tom Cruse', specialization: 'Yoga', experience: 3, contact: 'tommy@gmail.com' },
  ]);

  const [newTrainer, setNewTrainer] = useState({ name: '', specialization: '', experience: '', contact: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Handle form input
  const handleChange = (e) => {
    setNewTrainer({ ...newTrainer, [e.target.name]: e.target.value });
  };

  // Add or Update Trainer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTrainers(trainers.map(trainer => trainer.id === currentId ? { id: currentId, ...newTrainer } : trainer));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      const newId = trainers.length + 1;
      setTrainers([...trainers, { id: newId, ...newTrainer }]);
    }
    setNewTrainer({ name: '', specialization: '', experience: '', contact: '' });
  };

  // Start Edit
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

  return (
    <div className="App">
      <h1>Our Trainers</h1>
      <TrainerList trainers={trainers} onEdit={handleEdit} />

      <h2>{isEditing ? "Edit Trainer" : "Add a New Trainer"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={newTrainer.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="specialization" value={newTrainer.specialization} onChange={handleChange} placeholder="Specialization" required />
        <input type="number" name="experience" value={newTrainer.experience} onChange={handleChange} placeholder="Experience (Years)" required />
        <input type="email" name="contact" value={newTrainer.contact} onChange={handleChange} placeholder="Email" required />
        <button type="submit">{isEditing ? "Update Trainer" : "Add Trainer"}</button>
      </form>
    </div>
  );
}

export default App;
