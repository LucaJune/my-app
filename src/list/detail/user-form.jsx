import React, { useState } from 'react';
import { FaTimes, FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const UserForm = ({ show, handleClose, language, theme }) => {
  const owner = language === "CZ" ? "Jan Novák" : "John Smith";
  const initialMembers = language === "CZ" ? ["Daniel Novák", "Joana Nováková", "Damiana Lerová"] : ["Johnny Walker", "Joana Smith", "Damian Ler"];
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

  const texts = {
    en: {
      manageUsers: "Manage users",
      owner: "Owner of the shopping list",
      members: "Members of the shopping list",
      addNewMember: "Add new member",
      close: "Close",
      saveChanges: "Save Changes"
    },
    cz: {
      manageUsers: "Správa uživatelů",
      owner: "Vlastník nákupního seznamu",
      members: "Členové nákupního seznamu",
      addNewMember: "Přidat nového člena",
      close: "Zavřít",
      saveChanges: "Uložit změny"
    }
  };

  const t = language === "CZ" ? texts.cz : texts.en;

  return (
    <Modal show={show} onHide={handleClose} centered className={theme}>
      <Modal.Header closeButton>
        <Modal.Title><strong>{t.manageUsers}</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formOwner">
            <Form.Label><strong>{t.owner}</strong></Form.Label>
            <Form.Control type="text" value={owner} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMembers">
            <Form.Label><strong>{t.members}</strong></Form.Label>
            {members.map((member, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <Form.Control type="text" value={member} readOnly className="me-2" />
                <FaTimes className="remove-icon" onClick={() => handleRemoveMember(member)} />
              </div>
            ))}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNewMember">
            <Form.Label><strong>{t.addNewMember}</strong></Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="email"
                placeholder={language === "CZ" ? "Lucie Nováková" : "Lucy Smith"}
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
          {t.close}
        </Button>
        <Button variant="warning" onClick={handleClose}>
          {t.saveChanges}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserForm;
