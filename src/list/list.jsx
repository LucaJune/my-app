import React, { useState } from "react";
import "./list.css";
import { FaTrash, FaArchive, FaPlus, FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import ListDeleteDialog from "./list-delete.jsx";
import ListCreateForm from "./list-form-create.jsx";

const List = () => {
  const [myLists, setMyLists] = useState([
    { id: 1, name: "Shopping List", items: ["milk", "eggs", "honey"] },
    { id: 2, name: "Shopping List", items: ["milk", "eggs", "honey"] },
    { id: 3, name: "Shopping List", items: ["milk", "eggs", "honey"] },
  ]);
  const [sharedLists] = useState([
    { id: 4, name: "Shared List", items: ["chicken", "fish", "beef"] },
  ]);
  const [archivedMyLists, setArchivedMyLists] = useState([
    { id: 5, name: "Archived List", items: ["pasta", "rice", "beans"] },
    { id: 6, name: "Archived List", items: ["pasta", "rice", "beans"] },
  ]);
  const [archivedSharedLists] = useState([
    { id: 7, name: "Archived Shared List", items: ["soda", "juice", "water"] },
    { id: 8, name: "Archived Shared List", items: ["chips", "cookies", "candy"] },
    { id: 9, name: "Archived Shared List", items: ["flour", "sugar", "salt"] },
  ]);
  const [showArchived, setShowArchived] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [showAddList, setShowAddList] = useState(false);

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
            <Link to={`/DetailList/${list.id}`} className="view-detail">View detail</Link>
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
            <Link to={`/DetailShared/${list.id}`} className="view-detail">View detail</Link>
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
                <Link to={`/DetailArchived/${list.id}`} className="view-detail archived-detail">View detail</Link>
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
                <Link to={`/DetailArchivedShared/${list.id}`} className="view-detail archived-detail">View detail</Link>
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
