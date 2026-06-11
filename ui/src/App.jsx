import { BrowserRouter, Routes, Route } from "react-router-dom";

import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/Employee";
import ManagerDashboard from "./pages/Manager";
import LoginPage from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}