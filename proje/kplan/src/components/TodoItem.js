import React from 'react';

const TodoItem = ({ item }) => {
  return (
    <div className="todo-item">
      <h3>{item.name}</h3>
      <p>Zorunluluk: {item.priority ? 'Evet' : 'Hayır'}</p>
      <p>İş Tanımı: {item.description}</p>
      <p>Başlangıç Tarihi: {item.startDate}</p>
      <p>Bitiş Tarihi: {item.endDate}</p>
    </div>
  );
};

export default TodoItem;
