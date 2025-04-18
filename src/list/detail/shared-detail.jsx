import React, { useState } from "react";
import "./detail.css";
import { FaPlus, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailShared = () => {
  const [listName] = useState("Shared List");
  const [items, setItems] = useState([
    { id: 1, name: "chicken", checked: false },
    { id: 2, name: "fish", checked: false },
    { id: 3, name: "beef", checked: false },
    { id: 4, name: "pasta", checked: true },
    { id: 5, name: "tomato", checked: true },
  ]);
  const [newItem, setNewItem] = useState("");
  const [showChecked, setShowChecked] = useState(false);

  const handleItemCheck = (id) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
  };

  const handleItemRemove = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  };

  const handleItemAdd = () => {
    if (newItem.trim()) {
      const newId = items.length ? items[items.length - 1].id + 1 : 1;
      setItems([...items, { id: newId, name: newItem, checked: false }]);
      setNewItem("");
    }
  };

  const uncheckedItems = items.filter(item => !item.checked);
  const checkedItems = items.filter(item => item.checked);

  return (
    <div className="detail-container">
      <div className="header">
        <h1 className="list-name">{listName}</h1>
      </div>
      <div className="add-item">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item"
        />
        <FaPlus className="add-icon" onClick={handleItemAdd} />
      </div>
      <ul className="item-list">
        {uncheckedItems.map((item) => (
          <li key={item.id} className="item">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={item.checked}
              onChange={() => handleItemCheck(item.id)}
            />
            {item.name}
            <FaTimes className="remove-icon" onClick={() => handleItemRemove(item.id)} />
          </li>
        ))}
      </ul>
      <button className="show-checked-button" onClick={() => setShowChecked(!showChecked)}>
        {showChecked ? "Hide checked items" : "Show checked items"} {showChecked ? <FaChevronUp className="arrow-icon" /> : <FaChevronDown className="arrow-icon" />}
      </button>
      {showChecked && (
        <ul className="item-list">
          {checkedItems.map((item) => (
            <li key={item.id} className="item">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={item.checked}
                onChange={() => handleItemCheck(item.id)}
              />
              {item.name}
              <FaTimes className="remove-icon" onClick={() => handleItemRemove(item.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DetailShared;
