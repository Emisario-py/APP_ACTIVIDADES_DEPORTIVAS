import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";

function Dashboard() {
  return <h1>🏋️ Bienvenido al Dashboard</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
