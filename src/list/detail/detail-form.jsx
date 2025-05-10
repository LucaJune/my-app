import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './detail.css';
import FetchHelper from "../../fetch-helper";
import mockData from "../../mockData";

function ListNameForm({ currentName, onSave, onClose, useMockData, language, theme }) {
  const [name, setName] = useState(currentName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (useMockData) {
      response = { ok: true, data: mockData[language.toLowerCase()]["list/update"] };
    } else {
      response = await FetchHelper.list.update({ name }, useMockData);
    }

    if (response.ok) {
      onSave(name);
      onClose();
    } else {
      console.error("Failed to update list name:", response.status);
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered className={theme}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{language === "CZ" ? "Upravit název nákupního seznamu" : "Edit your shopping list name"}</Modal.Title>
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
            {language === "CZ" ? "Zavřít" : "Close"}
          </Button>
          <Button variant="warning" type="submit">
            {language === "CZ" ? "Uložit změny" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ListNameForm;
