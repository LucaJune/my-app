import React, { useState, useEffect } from "react";
import "./list.css";
import { FaTrash, FaArchive, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import ListDeleteDialog from "./list-delete.jsx";
import ListCreateForm from "./list-form-create.jsx";
import FetchHelper from "../fetch-helper";
import mockData from "../mockData";

const List = ({ useMockData, language, theme }) => {
  const [myLists, setMyLists] = useState([]);
  const [sharedLists, setSharedLists] = useState([]);
  const [archivedMyLists, setArchivedMyLists] = useState([]);
  const [archivedSharedLists, setArchivedSharedLists] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [showAddList, setShowAddList] = useState(false);

  const texts = {
    en: {
      createList: "Create a new shopping list",
      myLists: "MY SHOPPING LISTS",
      sharedLists: "SHARED SHOPPING LISTS",
      hideArchived: "Hide archived lists",
      showArchived: "Show archived lists",
      myArchivedLists: "MY ARCHIVED SHOPPING LISTS",
      archivedSharedLists: "ARCHIVED SHARED SHOPPING LISTS",
      viewDetail: "View detail"
    },
    cz: {
      createList: "Vytvořit nový nákupní seznam",
      myLists: "MOJE NÁKUPNÍ SEZNAMY",
      sharedLists: "SDÍLENÉ NÁKUPNÍ SEZNAMY",
      hideArchived: "Skrýt archivované seznamy",
      showArchived: "Zobrazit archivované seznamy",
      myArchivedLists: "MOJE ARCHIVOVANÉ NÁKUPNÍ SEZNAMY",
      archivedSharedLists: "ARCHIVOVANÉ SDÍLENÉ NÁKUPNÍ SEZNAMY",
      viewDetail: "Zobrazit detail"
    }
  };

  const t = language === "CZ" ? texts.cz : texts.en;

  useEffect(() => {
    const fetchLists = async () => {
      let myListsResponse, sharedListsResponse, archivedMyListsResponse, archivedSharedListsResponse;

      if (useMockData) {
        const data = mockData[language.toLowerCase()];
        myListsResponse = { ok: true, data: data["list/list"] };
        sharedListsResponse = { ok: true, data: data["list/list"] };
        archivedMyListsResponse = { ok: true, data: data["list/list"] };
        archivedSharedListsResponse = { ok: true, data: data["list/list"] };
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
  }, [useMockData, language]);

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
    <div className={`list-container ${theme}`}>
      <div className="add-list">
        <button className="add-list-button" onClick={() => setShowAddList(true)}>
          <FaPlus className="add-icon" />{t.createList}
        </button>
      </div>
      <h1 className="section-title">{t.myLists}</h1>
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
            <Link to={`/DetailList/${list.id}`} className="view-detail">{t.viewDetail}</Link>
          </div>
        ))}
      </div>
      <h1 className="section-title">{t.sharedLists}</h1>
      <div className="lists">
        {sharedLists.map((list) => (
          <div key={list.id} className="list-tile">
            <div className="list-header">
              <h2 className="list-name">{list.name}</h2>
            </div>
            <Link to={`/DetailShared/${list.id}`} className="view-detail">{t.viewDetail}</Link>
          </div>
        ))}
      </div>
      <button className="show-archived-button" onClick={() => setShowArchived(!showArchived)}>
        {showArchived ? t.hideArchived : t.showArchived} {showArchived ? <FaChevronUp className="arrow-icon" /> : <FaChevronDown className="arrow-icon" />}
      </button>
      {showArchived && (
        <>
          <h1 className="section-title">{t.myArchivedLists}</h1>
          <div className="lists">
            {archivedMyLists.map((list) => (
              <div key={list.id} className="list-tile archived">
                <div className="list-header">
                  <h2 className="list-name archived-name">{list.name}</h2>
                  <FaTrash className="remove-icon" onClick={() => handleDeleteClick(list)} />
                </div>
                <Link to={`/DetailArchived/${list.id}`} className="view-detail archived-detail">{t.viewDetail}</Link>
              </div>
            ))}
          </div>
          <h1 className="section-title">{t.archivedSharedLists}</h1>
          <div className="lists">
            {archivedSharedLists.map((list) => (
              <div key={list.id} className="list-tile archived">
                <div className="list-header">
                  <h2 className="list-name archived-name">{list.name}</h2>
                </div>
                <Link to={`/DetailArchivedShared/${list.id}`} className="view-detail archived-detail">{t.viewDetail}</Link>
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
          useMockData={useMockData}
          language={language}
          theme={theme}
        />
      )}
      {showAddList && (
        <ListCreateForm
          onSave={handleListAdd}
          onClose={() => setShowAddList(false)}
          useMockData={useMockData}
          language={language}
          theme={theme}
        />
      )}
    </div>
  );
};

export default List;
