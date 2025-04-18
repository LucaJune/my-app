import React, { useState } from "react";
import "./detail.css";
import { FaPencilAlt, FaUsers } from "react-icons/fa";
import ListNameForm from "./detail-form.jsx";
import UserForm from "./user-form.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailArchived = () => {
  const [listName, setListName] = useState("Archived List");
  const [items, setItems] = useState([
    { id: 1, name: "pasta", checked: true },
    { id: 2, name: "rice", checked: true },
    { id: 3, name: "beans", checked: true },
    { id: 4, name: "eggs", checked: true },
    { id: 5, name: "honey", checked: true },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const handleItemCheck = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const sortedItems = items.sort((a, b) => b.checked - a.checked);

  return (
    <div className="detail-container">
      <div className="header">
        <h1 className="list-name">{listName}</h1>
        <div className="icons">
          <FaPencilAlt className="edit-icon" onClick={() => setShowModal(true)} />
          <FaUsers className="user-icon" onClick={() => setShowUserModal(true)} />
        </div>
      </div>
      <ul className="item-list">
        {sortedItems.map((item) => (
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
      {showModal && (
        <ListNameForm
          currentName={listName}
          onSave={(newName) => setListName(newName)}
          onClose={() => setShowModal(false)}
        />
      )}
      <UserForm show={showUserModal} handleClose={() => setShowUserModal(false)} />
    </div>
  );
};

export default DetailArchived;
