import React from 'react';

const TrainerCard = ({ trainer, onEdit, onDelete }) => {
  return (
    <div>
      <h2>{trainer.name}</h2>
      <p>Specialization: {trainer.specialization}</p>
      <p>Experience: {trainer.experience} years</p>
      <p>Contact: {trainer.contact}</p>
      <button onClick={() => onEdit(trainer)}>Edit</button>
      <button onClick={() => onDelete(trainer.id)}>Delete</button>
    </div>
  );
};

export default TrainerCard;
