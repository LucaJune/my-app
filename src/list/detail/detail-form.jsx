import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './detail.css';
import FetchHelper from "../../fetch-helper"; // Import FetchHelper

function ListNameForm({ currentName, onSave, onClose, useMockData }) {
  const [name, setName] = useState(currentName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await FetchHelper.list.update({ name }, useMockData);
    if (response.ok) {
      onSave(name);
      onClose();
    } else {
      console.error("Failed to update list name:", response.status);
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your shopping list name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={onClose}>
            Close
          </Button>
          <Button variant="warning" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ListNameForm;
