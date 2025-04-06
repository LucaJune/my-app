import React, { useState } from 'react';
import { FaTimes, FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const UserForm = ({ show, handleClose }) => {
  const owner = "John Smith";
  const initialMembers = ["Johnny Walker", "Joana Smith", "Damian Ler"];
  const [members, setMembers] = useState(initialMembers);
  const [newMember, setNewMember] = useState("");

  const handleRemoveMember = (member) => {
    setMembers(members.filter(m => m !== member));
  };

  const handleAddMember = () => {
    if (newMember.trim()) {
      setMembers([...members, newMember]);
      setNewMember("");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><strong>Manage users</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formOwner">
            <Form.Label><strong>Owner of the shopping list</strong></Form.Label>
            <Form.Control type="text" value={owner} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMembers">
            <Form.Label><strong>Members of the shopping list</strong></Form.Label>
            {members.map((member, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <Form.Control type="text" value={member} readOnly className="me-2" />
                <FaTimes className="remove-icon" onClick={() => handleRemoveMember(member)} />
              </div>
            ))}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNewMember">
            <Form.Label><strong>Add new member</strong></Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="email"
                placeholder="Lucy Smith"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                className="me-2"
              />
              <FaPlus className="add-icon" onClick={handleAddMember} />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="warning" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserForm;
