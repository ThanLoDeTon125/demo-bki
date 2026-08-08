import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Mobile from "./routes/Mobile";
import Admin from "./routes/Admin";
import Projector from "./routes/Projector";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/mobile" replace />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/projector" element={<Projector />} />
      </Routes>
    </BrowserRouter>
  );
}
