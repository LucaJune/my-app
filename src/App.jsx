import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Detail from "./list/detail";
import ShoppingList from "./list/list";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ShoppingList />} />
            <Route path="/DetailList" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;