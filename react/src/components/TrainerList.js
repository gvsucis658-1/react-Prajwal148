import React from 'react';
import TrainerCard from './TrainerCard';

const TrainerList = ({ trainers, onEdit, onDelete }) => {
  return (
    <div>
      {trainers.map(trainer => (
        <TrainerCard
          key={trainer.id}
          trainer={trainer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TrainerList;
