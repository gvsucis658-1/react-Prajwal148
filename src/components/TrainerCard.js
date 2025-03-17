import React from 'react';

const TrainerCard = ({ trainer, onEdit }) => {
  return (
    <div>
      <h2>{trainer.name}</h2>
      <p>Specialization: {trainer.specialization}</p>
      <p>Experience: {trainer.experience} years</p>
      <p>Contact: {trainer.contact}</p>
      <button onClick={() => onEdit(trainer)}>Edit</button>
    </div>
  );
};

export default TrainerCard;
