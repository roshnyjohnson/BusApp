import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "./pages/Student";
import Driver from "./pages/Driver";

export default function App() {

  console.log("APP RENDERED");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/driver" element={<Driver />} />
      </Routes>
    </BrowserRouter>
  );
}
