import React, { useState } from "react";
import "./detail.css";
import { FaPencilAlt, FaPlus, FaUsers, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ListNameForm from "./detail-form.jsx";
import UserForm from "./user-form.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const Detail = () => {
  const [listName, setListName] = useState("Shopping List");
  const [items, setItems] = useState([
    { id: 1, name: "bread", checked: false },
    { id: 2, name: "cheese", checked: false },
    { id: 3, name: "milk", checked: false },
    { id: 4, name: "eggs", checked: true },
    { id: 5, name: "honey", checked: true },
  ]);
  const [newItem, setNewItem] = useState("");
  const [showChecked, setShowChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

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

  const handleUserModalClose = () => setShowUserModal(false);
  const handleUserModalShow = () => setShowUserModal(true);

  return (
    <div className="detail-container">
      <div className="header">
        <h1 className="list-name">{listName}</h1>
        <div className="icons">
          <FaPencilAlt className="edit-icon" onClick={() => setShowModal(true)} />
          <FaUsers className="user-icon" onClick={handleUserModalShow} />
        </div>
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
      {showModal && (
        <ListNameForm
          currentName={listName}
          onSave={(newName) => setListName(newName)}
          onClose={() => setShowModal(false)}
        />
      )}
      <UserForm show={showUserModal} handleClose={handleUserModalClose} />
    </div>
  );
};

export default Detail;
