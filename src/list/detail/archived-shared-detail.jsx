import React, { useState } from "react";
import "./detail.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailArchivedShared = () => {
  const [listName] = useState("Archived Shared List");
  const [items, setItems] = useState([
    { id: 1, name: "soda", checked: true },
    { id: 2, name: "juice", checked: true },
    { id: 3, name: "water", checked: true },
    { id: 4, name: "eggs", checked: true },
    { id: 5, name: "honey", checked: true },
  ]);

  const handleItemCheck = (id) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
  };

  return (
    <div className="detail-container">
      <div className="header">
        <h1 className="list-name">{listName}</h1>
      </div>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={item.checked}
              onChange={() => handleItemCheck(item.id)}
            />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailArchivedShared;
