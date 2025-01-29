import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Admin/Header";
import { Menu } from "./components/Admin/Menu";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Header />}>
        <Route path="/admin" element={<Menu />} />
      </Route>
    </Routes>
  );
}

export default App;
