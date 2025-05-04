import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaPlus, FaTimes } from "react-icons/fa";
import './detail/detail.css';
import FetchHelper from "../fetch-helper"; // Import FetchHelper
import mockData from "../mockData"; // Import mockData

function ListCreateForm({ onSave, onClose, useMockData }) {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newList;
    if (useMockData) {
      newList = mockData["list/create"];
    } else {
      newList = { name, items, members };
      const response = await FetchHelper.list.create(newList, useMockData);
      if (response.ok) {
        newList = { ...newList, id: response.data.id };
      } else {
        console.error("Failed to create list:", response.status);
        return;
      }
    }
    onSave(newList);
    onClose();
  };

  const handleItemAdd = async () => {
    if (newItem.trim()) {
      let newItemData;
      if (useMockData) {
        newItemData = mockData["item/create"];
      } else {
        newItemData = { name: newItem };
        const response = await FetchHelper.item.create(newItemData, useMockData);
        if (response.ok) {
          newItemData = { ...newItemData, id: response.data.id };
        } else {
          console.error("Failed to create item:", response.status);
          return;
        }
      }
      setItems([...items, newItemData]);
      setNewItem("");
    }
  };

  const handleItemRemove = async (id) => {
    let response;
    if (!useMockData) {
      response = await FetchHelper.item.delete(id, useMockData);
      if (!response.ok) {
        console.error("Failed to delete item:", response.status);
        return;
      }
    }
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  };

  const handleMemberAdd = () => {
    if (newMember.trim()) {
      const newId = members.length ? members[members.length - 1].id + 1 : 1;
      setMembers([...members, { id: newId, name: newMember }]);
      setNewMember("");
    }
  };

  const handleMemberRemove = (id) => {
    const newMembers = members.filter(member => member.id !== id);
    setMembers(newMembers);
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Shopping List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter list name"
            required
          />
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
            {items.map((item) => (
              <li key={item.id} className="item">
                {item.name}
                <FaTimes className="remove-icon" onClick={() => handleItemRemove(item.id)} />
              </li>
            ))}
          </ul>
          <div className="add-member">
            <input
              type="text"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Add new member"
            />
            <FaPlus className="add-icon" onClick={handleMemberAdd} />
          </div>
          <ul className="member-list">
            {members.map((member) => (
              <li key={member.id} className="item">
                {member.name}
                <FaTimes className="remove-icon" onClick={() => handleMemberRemove(member.id)} />
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={onClose}>
            Close
          </Button>
          <Button variant="warning" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ListCreateForm;
