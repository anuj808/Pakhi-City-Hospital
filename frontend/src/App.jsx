import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";
import BookTest from "./pages/BookTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/book-test" element={<BookTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;