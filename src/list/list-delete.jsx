import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import './detail/detail.css';
import FetchHelper from "../fetch-helper";

function ListDeleteDialog({ data, onDelete, onClose, useMockData, language, theme }) {
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

  const texts = {
    en: {
      title: "Delete Shopping List",
      body: `Do you really want to delete the shopping list ${data.name}?`,
      close: "Close",
      delete: "Delete",
      error: "Failed to delete list"
    },
    cz: {
      title: "Smazat nákupní seznam",
      body: `Opravdu chcete smazat nákupní seznam ${data.name}?`,
      close: "Zavřít",
      delete: "Smazat",
      error: "Nepodařilo se smazat seznam"
    }
  };

  const t = language === "CZ" ? texts.cz : texts.en;

  return (
    <Modal show={true} onHide={onClose} centered className={theme}>
      <Modal.Header closeButton className={theme}>
        <Modal.Title>{t.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={theme}>
        {!!errorState?.message ? (
          <Alert variant="danger">{t.error}: {errorState.message}</Alert>
        ) : null}
        {t.body}
      </Modal.Body>
      <Modal.Footer className={theme}>
        <Button variant="secondary" onClick={onClose}>
          {t.close}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          {t.delete}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ListDeleteDialog;
