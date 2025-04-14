import React, { useState } from "react";
import "./list.css";
import { FaTrash, FaArchive, FaPlus, FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const List = () => {
  const [myLists, setMyLists] = useState([
    { id: 1, name: "Shopping List 1", items: ["milk", "eggs", "honey"] },
    { id: 2, name: "Shopping List 2", items: ["bread", "cheese", "butter"] },
    { id: 3, name: "Shopping List 3", items: ["apples", "bananas", "oranges"] },
  ]);
  const [sharedLists, setSharedLists] = useState([
    { id: 4, name: "Shared List 1", items: ["chicken", "fish", "beef"] },
  ]);
  const [archivedMyLists, setArchivedMyLists] = useState([
    { id: 5, name: "Archived My List 1", items: ["pasta", "rice", "beans"] },
    { id: 6, name: "Archived My List 2", items: ["tomatoes", "cucumbers", "lettuce"] },
  ]);
  const [archivedSharedLists, setArchivedSharedLists] = useState([
    { id: 7, name: "Archived Shared List 1", items: ["soda", "juice", "water"] },
    { id: 8, name: "Archived Shared List 2", items: ["chips", "cookies", "candy"] },
    { id: 9, name: "Archived Shared List 3", items: ["flour", "sugar", "salt"] },
  ]);
  const [newListName, setNewListName] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const handleListRemove = (id) => {
    const newLists = myLists.filter(list => list.id !== id);
    setMyLists(newLists);
  };

  const handleListArchive = (id) => {
    const listToArchive = myLists.find(list => list.id === id);
    setArchivedMyLists([...archivedMyLists, listToArchive]);
    handleListRemove(id);
  };

  const handleListAdd = () => {
    if (newListName.trim()) {
      const newId = myLists.length ? myLists[myLists.length - 1].id + 1 : 1;
      setMyLists([...myLists, { id: newId, name: newListName, items: [] }]);
      setNewListName("");
    }
  };

  return (
    <div className="list-container">
      <div className="add-list">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Add new list"
        />
        <FaPlus className="add-icon" onClick={handleListAdd} />
      </div>
      <h1 className="section-title">My shopping lists</h1>
      <div className="lists">
        {myLists.map((list) => (
          <div key={list.id} className="list-tile">
            <div className="list-header">
              <h2 className="list-name">{list.name}</h2>
              <div className="icons">
                <FaTrash className="remove-icon" onClick={() => handleListRemove(list.id)} />
                <FaArchive className="archive-icon" onClick={() => handleListArchive(list.id)} />
              </div>
            </div>
            <ul className="list-items">
              {list.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h1 className="section-title">Shared shopping lists</h1>
      <div className="lists">
        {sharedLists.map((list) => (
          <div key={list.id} className="list-tile">
            <h2 className="list-name">{list.name}</h2>
            <ul className="list-items">
              {list.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className="show-archived-button" onClick={() => setShowArchived(!showArchived)}>
        {showArchived ? "Hide archived lists" : "Show archived lists"} {showArchived ? <FaChevronUp className="arrow-icon" /> : <FaChevronDown className="arrow-icon" />}
      </button>
      {showArchived && (
        <>
          <h1 className="section-title">My archived shopping lists</h1>
          <div className="lists">
            {archivedMyLists.map((list) => (
              <div key={list.id} className="list-tile archived">
                <div className="list-header">
                  <h2 className="list-name">{list.name}</h2>
                  <FaTrash className="remove-icon" onClick={() => handleListRemove(list.id)} />
                </div>
                <ul className="list-items archived">
                  {list.items.map((item, index) => (
                    <li key={index}><FaCheck className="check-icon" /> {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h1 className="section-title">Shared archived shopping lists</h1>
          <div className="lists">
            {archivedSharedLists.map((list) => (
              <div key={list.id} className="list-tile archived">
                <h2 className="list-name">{list.name}</h2>
                <ul className="list-items archived">
                  {list.items.map((item, index) => (
                    <li key={index}><FaCheck className="check-icon" /> {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
