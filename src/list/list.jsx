import React, { useState, useEffect } from "react";
import "./list.css";
import { FaTrash, FaArchive, FaPlus, FaChevronDown, FaChevronUp} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import ListDeleteDialog from "./list-delete.jsx";
import ListCreateForm from "./list-form-create.jsx";
import FetchHelper from "../fetch-helper"; // Import FetchHelper
import mockData from "../mockData"; // Import mockData

const List = ({ useMockData }) => {
  const [myLists, setMyLists] = useState([]);
  const [sharedLists, setSharedLists] = useState([]);
  const [archivedMyLists, setArchivedMyLists] = useState([]);
  const [archivedSharedLists, setArchivedSharedLists] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [showAddList, setShowAddList] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      let myListsResponse, sharedListsResponse, archivedMyListsResponse, archivedSharedListsResponse;

      if (useMockData) {
        myListsResponse = { ok: true, data: mockData["list/list"] };
        sharedListsResponse = { ok: true, data: mockData["list/list"] };
        archivedMyListsResponse = { ok: true, data: mockData["list/list"] };
        archivedSharedListsResponse = { ok: true, data: mockData["list/list"] };
      } else {
        myListsResponse = await FetchHelper.list.list(null, useMockData);
        sharedListsResponse = await FetchHelper.list.list(useMockData);
        archivedMyListsResponse = await FetchHelper.list.list(null, useMockData);
        archivedSharedListsResponse = await FetchHelper.list.list(useMockData);
      }

      if (myListsResponse.ok) setMyLists(myListsResponse.data);
      if (sharedListsResponse.ok) setSharedLists(sharedListsResponse.data);
      if (archivedMyListsResponse.ok) setArchivedMyLists(archivedMyListsResponse.data);
      if (archivedSharedListsResponse.ok) setArchivedSharedLists(archivedSharedListsResponse.data);
    };
    fetchLists();
  }, [useMockData]);

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

  const handleListAdd = ({ name }) => {
    if (name.trim()) {
      const newId = myLists.length ? myLists[myLists.length - 1].id + 1 : 1;
      setMyLists([...myLists, { id: newId, name: name }]);
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
