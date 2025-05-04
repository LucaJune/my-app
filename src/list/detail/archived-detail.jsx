import React, { useState, useEffect } from "react";
import "./detail.css";
import { FaPencilAlt, FaUsers } from "react-icons/fa";
import ListNameForm from "./detail-form.jsx";
import UserForm from "./user-form.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchHelper from "../../fetch-helper"; // Import FetchHelper

const DetailArchived = ({ useMockData }) => {
  const [listName, setListName] = useState("Archived List");
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await FetchHelper.item.list(useMockData);
      if (response.ok) {
        // Ensure all items are checked
        const checkedItems = response.data.map(item => ({ ...item, checked: true }));
        setItems(checkedItems);
      } else {
        console.error("Failed to fetch items:", response.status);
      }
    };
    fetchItems();
  }, [useMockData]);

  const handleItemCheck = () => {
    alert("Archived items cannot be edited.");
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
              readOnly // Make the checkbox read-only
              onClick={handleItemCheck} // Show alert on click
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
