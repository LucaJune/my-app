import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import './detail/detail.css';
import FetchHelper from "../fetch-helper";

function ListDeleteDialog({ data, onDelete, onClose, useMockData }) {
  const [errorState, setErrorState] = useState();

  const handleDelete = async () => {
    try {
      const response = await FetchHelper.list.delete({ id: data.id }, useMockData);
      if (response.ok) {
        await onDelete(data.id);
        onClose();
      } else {
        setErrorState({ message: `Failed to delete list: ${response.status}` });
      }
    } catch (error) {
      setErrorState({ message: error.message });
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Shopping List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!errorState?.message ? (
          <Alert variant="danger">{errorState.message}</Alert>
        ) : null}
        {`Do you really want to delete the shopping list ${data.name}?`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ListDeleteDialog;
