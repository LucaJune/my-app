import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Detail from "./list/detail/detail";
import DetailShared from "./list/detail/shared-detail";
import DetailArchived from "./list/detail/archived-detail";
import DetailArchivedShared from "./list/detail/archived-shared-detail";
import ShoppingList from "./list/list";
import "./App.css";

function App() {
  const [useMockData, setUseMockData] = useState(true);
  const [language, setLanguage] = useState("CZ");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleCheckboxChange = () => {
    setUseMockData(!useMockData);
    console.log("useMockData:", !useMockData);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  return (
    <div className={`app-container ${theme}`}>
      <div className="header">
        <div className="language-buttons">
          <button onClick={() => handleLanguageChange("EN")}>EN</button>
          <button onClick={() => handleLanguageChange("CZ")}>CZ</button>
        </div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={useMockData}
            onChange={handleCheckboxChange}
            className="checkbox-input"
          />
          {language === "CZ" ? "Použít mockovací data" : "Use mock data"}
        </label>
        <div className="theme-buttons">
          <button onClick={() => handleThemeChange("light")}>
            {language === "CZ" ? "Světlý režim" : "Light mode"}
          </button>
          <button className="dark-mode" onClick={() => handleThemeChange("dark")}>
            {language === "CZ" ? "Tmavý režim" : "Dark mode"}
          </button>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout useMockData={useMockData} language={language} theme={theme} />}>
            <Route index element={<ShoppingList useMockData={useMockData} language={language} theme={theme} />} />
            <Route path="/DetailList/:id" element={<Detail useMockData={useMockData} language={language} theme={theme} />} />
            <Route path="/DetailShared/:id" element={<DetailShared useMockData={useMockData} language={language} theme={theme} />} />
            <Route path="/DetailArchived/:id" element={<DetailArchived useMockData={useMockData} language={language} theme={theme} />} />
            <Route path="/DetailArchivedShared/:id" element={<DetailArchivedShared useMockData={useMockData} language={language} theme={theme} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
