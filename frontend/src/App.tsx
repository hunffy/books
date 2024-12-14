import React from "react";
import "./App.css";
import BooksPage from "./pages/BooksPage.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BookDetail from "./components/BookDetail.tsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/detail/:id" element={<BookDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
