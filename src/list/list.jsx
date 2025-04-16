import React, { useState } from "react";
import "./list.css";
import { FaTrash, FaArchive, FaPlus, FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListDeleteDialog from "./list-delete.jsx"; // Import modálního okna
import ListCreateForm from "./list-form-create.jsx"; // Import modálního okna pro vytvoření seznamu

const List = () => {
  const [myLists, setMyLists] = useState([
    { id: 1, name: "Shopping List 1", items: ["milk", "eggs", "honey"] },
    { id: 2, name: "Shopping List 2", items: ["bread", "cheese", "butter"] },
    { id: 3, name: "Shopping List 3", items: ["apples", "bananas", "oranges"] },
  ]);
  const [sharedLists] = useState([
    { id: 4, name: "Shared List 1", items: ["chicken", "fish", "beef"] },
  ]);
  const [archivedMyLists, setArchivedMyLists] = useState([
    { id: 5, name: "Archived My List 1", items: ["pasta", "rice", "beans"] },
    { id: 6, name: "Archived My List 2", items: ["tomatoes", "cucumbers", "lettuce"] },
  ]);
  const [archivedSharedLists] = useState([
    { id: 7, name: "Archived Shared List 1", items: ["soda", "juice", "water"] },
    { id: 8, name: "Archived Shared List 2", items: ["chips", "cookies", "candy"] },
    { id: 9, name: "Archived Shared List 3", items: ["flour", "sugar", "salt"] },
  ]);
  const [showArchived, setShowArchived] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [showAddList, setShowAddList] = useState(false); // Nový stav pro zobrazení pole pro přidání seznamu

  const handleListRemove = (id) => {
    const newLists = myLists.filter(list => list.id !== id);
    setMyLists(newLists);
  };

  const handleArchivedListRemove = (id) => {
    const newArchivedLists = archivedMyLists.filter(list => list.id !== id);
    setArchivedMyLists(newArchivedLists);
  };

  const handleListArchive = (id) => {
    const listToArchive = myLists.find(list => list.id === id);
    setArchivedMyLists([...archivedMyLists, listToArchive]);
    handleListRemove(id);
  };

  const handleListAdd = ({ name, items }) => {
    if (name.trim()) {
      const newId = myLists.length ? myLists[myLists.length - 1].id + 1 : 1;
      setMyLists([...myLists, { id: newId, name: name, items: items.map(item => item.name) }]);
    }
  };

  const handleDeleteClick = (list) => {
    setListToDelete(list);
    setShowDeleteDialog(true);
  };

  const handleDelete = async (id) => {
    handleListRemove(id);
    handleArchivedListRemove(id);
  };

  return (
    <div className="list-container">
      <div className="add-list">
        <button className="add-list-button" onClick={() => setShowAddList(true)}>
          <FaPlus className="add-icon" />Create a new shopping list
        </button>
      </div>
      <h1 className="section-title">MY SHOPPING LISTS</h1>
      <div className="lists">
        {myLists.map((list) => (
          <div key={list.id} className="list-tile">
            <div className="list-header">
              <h2 className="list-name">{list.name}</h2>
              <div className="icons">
                <FaTrash className="remove-icon" onClick={() => handleDeleteClick(list)} />
                <FaArchive className="archive-icon" onClick={() => handleListArchive(list.id)} />
              </div>
            </div>
            <ul className="list-items">
              {list.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <small className="view-detail">View detail</small>
          </div>
        ))}
      </div>
      <h1 className="section-title">SHARED SHOPPING LISTS</h1>
      <div className="lists">
        {sharedLists.map((list) => (
          <div key={list.id} className="list-tile">
            <div className="list-header">
              <h2 className="list-name">{list.name}</h2>
            </div>
            <ul className="list-items">
              {list.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <small className="view-detail">View detail</small>
          </div>
        ))}
      </div>
      <button className="show-archived-button" onClick={() => setShowArchived(!showArchived)}>
        {showArchived ? "Hide archived lists" : "Show archived lists"} {showArchived ? <FaChevronUp className="arrow-icon" /> : <FaChevronDown className="arrow-icon" />}
      </button>
      {showArchived && (
        <>
          <h1 className="section-title">MY ARCHIVED SHOPPING LISTS</h1>
          <div className="lists">
            {archivedMyLists.map((list) => (
              <div key={list.id} className="list-tile archived">
                <div className="list-header">
                  <h2 className="list-name archived-name">{list.name}</h2>
                  <FaTrash className="remove-icon" onClick={() => handleDeleteClick(list)} />
                </div>
                <ul className="list-items archived">
                  {list.items.map((item, index) => (
                    <li key={index}><FaCheck className="check-icon" /> <span className="archived-item">{item}</span></li>
                  ))}
                </ul>
                <small className="view-detail archived-detail">View detail</small>
              </div>
            ))}
          </div>
          <h1 className="section-title">ARCHIVED SHARED SHOPPING LISTS</h1>
          <div className="lists">
            {archivedSharedLists.map((list) => (
              <div key={list.id} className="list-tile archived">
                <div className="list-header">
                  <h2 className="list-name archived-name">{list.name}</h2>
                </div>
                <ul className="list-items archived">
                  {list.items.map((item, index) => (
                    <li key={index}><FaCheck className="check-icon" /> <span className="archived-item">{item}</span></li>
                  ))}
                </ul>
                <small className="view-detail archived-detail">View detail</small>
              </div>
            ))}
          </div>
        </>
      )}
      {showDeleteDialog && (
        <ListDeleteDialog
          data={listToDelete}
          onClose={() => setShowDeleteDialog(false)}
          onDelete={handleDelete}
        />
      )}
      {showAddList && (
        <ListCreateForm
          onSave={handleListAdd}
          onClose={() => setShowAddList(false)}
        />
      )}
    </div>
  );
};

export default List;
