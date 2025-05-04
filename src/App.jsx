import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Detail from "./list/detail/detail";
import DetailShared from "./list/detail/shared-detail";
import DetailArchived from "./list/detail/archived-detail";
import DetailArchivedShared from "./list/detail/archived-shared-detail";
import ShoppingList from "./list/list";
import "./App.css"; // Import CSS file

function App() {
  const [useMockData, setUseMockData] = useState(true); // Nastavení mockovacích dat jako výchozí

  const handleCheckboxChange = () => {
    setUseMockData(!useMockData);
    console.log("useMockData:", !useMockData);
  };

  return (
    <div className="app-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={useMockData}
          onChange={handleCheckboxChange}
          className="checkbox-input"
        />
        Použít mockovací data
      </label>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout useMockData={useMockData} />}>
            <Route index element={<ShoppingList useMockData={useMockData} />} />
            <Route path="/DetailList/:id" element={<Detail useMockData={useMockData} />} />
            <Route path="/DetailShared/:id" element={<DetailShared useMockData={useMockData} />} />
            <Route path="/DetailArchived/:id" element={<DetailArchived useMockData={useMockData} />} />
            <Route path="/DetailArchivedShared/:id" element={<DetailArchivedShared useMockData={useMockData} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
