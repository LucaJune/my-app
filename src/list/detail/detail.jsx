import React, { useState, useEffect } from "react";
import "./detail.css";
import { FaPencilAlt, FaPlus, FaUsers, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ListNameForm from "./detail-form.jsx";
import UserForm from "./user-form.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchHelper from "../../fetch-helper"; // Import FetchHelper
import mockData from "../../mockData"; // Import mockData

const Detail = ({ useMockData }) => {
  const [listName, setListName] = useState("Shopping List");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [showChecked, setShowChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await FetchHelper.item.list(useMockData);
      if (response.ok) {
        setItems(response.data);
      } else {
        console.error("Failed to fetch items:", response.status);
      }
    };
    fetchItems();
  }, [useMockData]);

  const handleItemCheck = async (id) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);

    const updatedItem = newItems.find(item => item.id === id);
    const response = await FetchHelper.item.update(updatedItem, useMockData);
    if (!response.ok) {
      console.error("Failed to update item:", response.status);
    }
  };

  const handleItemRemove = async (id) => {
    const response = await FetchHelper.item.delete({ id }, useMockData);
    if (response.ok) {
      const newItems = items.filter(item => item.id !== id);
      setItems(newItems);
    } else {
      console.error("Failed to remove item:", response.status);
    }
  };

  const handleItemAdd = async () => {
    if (newItem.trim()) {
      let newItemObj;
      if (useMockData) {
        newItemObj = mockData["item/create"];
      } else {
        newItemObj = { name: newItem, checked: false };
        const response = await FetchHelper.item.create(newItemObj, useMockData);
        if (response.ok) {
          newItemObj = { ...newItemObj, id: response.data.id };
        } else {
          console.error("Failed to add item:", response.status);
          return;
        }
      }
      setItems([...items, newItemObj]);
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
