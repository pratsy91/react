import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Lesson from "./pages/Lesson/Lesson";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lesson/:lessonId" element={<Lesson />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
