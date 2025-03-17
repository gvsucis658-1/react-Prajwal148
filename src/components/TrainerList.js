import React from 'react';
import TrainerCard from './TrainerCard';

const TrainerList = ({ trainers, onEdit }) => {
  return (
    <div>
      {trainers.map(trainer => (
        <TrainerCard key={trainer.id} trainer={trainer} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TrainerList;
