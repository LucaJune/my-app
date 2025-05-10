import React, { useState, useEffect } from "react";
import "./detail.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchHelper from "../../fetch-helper";
import mockData from "../../mockData";

const DetailArchivedShared = ({ useMockData, language, theme }) => {
  const [listName, setListName] = useState(language === "CZ" ? "Archivovaný sdílený seznam" : "Archived Shared List");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let response;
      if (useMockData) {
        const data = mockData[language.toLowerCase()];
        response = { ok: true, data: data["item/list"] };
      } else {
        response = await FetchHelper.item.list(useMockData);
      }

      if (response.ok) {
        // Ensure all items are checked
        const checkedItems = response.data.map(item => ({ ...item, checked: true }));
        setItems(checkedItems);
      } else {
        console.error("Failed to fetch items:", response.status);
      }
    };
    fetchItems();
  }, [useMockData, language]);

  useEffect(() => {
    setListName(language === "CZ" ? "Archivovaný sdílený seznam" : "Archived Shared List");
  }, [language]);

  const handleItemCheck = () => {
    alert(language === "CZ" ? "Archivované položky nelze upravovat." : "Archived items cannot be edited.");
  };

  return (
    <div className={`detail-container ${theme}`}>
      <div className="header">
        <h1 className="list-name">{listName}</h1>
      </div>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={item.checked}
              readOnly 
              onClick={handleItemCheck}
            />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailArchivedShared;
