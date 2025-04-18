import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Detail from "./list/detail/detail";
import DetailShared from "./list/detail/shared-detail";
import DetailArchived from "./list/detail/archived-detail";
import DetailArchivedShared from "./list/detail/archived-shared-detail";
import ShoppingList from "./list/list";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ShoppingList />} />
            <Route path="/DetailList/:id" element={<Detail />} />
            <Route path="/DetailShared/:id" element={<DetailShared />} />
            <Route path="/DetailArchived/:id" element={<DetailArchived />} />
            <Route path="/DetailArchivedShared/:id" element={<DetailArchivedShared />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
