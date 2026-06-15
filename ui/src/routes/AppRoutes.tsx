import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeDashboardPage from "../pages/employee/EmployeeDashboardPage";
import CustomerListPage from "../pages/employee/CustomerListPage";
import CustomerDetailsPage from "../pages/employee/CustomerDetailsPage";
import CustomerAccountsPage from "../pages/employee/CustomerAccountsPage";
import CreateAccountPage from "../pages/employee/CreateAccountPage";

import ManagerDashboardPage from "../pages/manager/ManagerDashboardPage";
import StaffListPage from "../pages/manager/StaffListPage";
import CreateStaffPage from "../pages/manager/CreateStaffPage";
import StaffDetailsPage from "../pages/manager/StaffDetailsPage";
import ReportsPage from "../pages/manager/ReportsPage";
import NotFoundPage from '../pages/NotFoundPage';

import ClientCreateAccountPage from '../pages/employee/CreateAccountPage';
import DeleteAccountPage from '../pages/customers/DeleteAccountPage';
import CustomerDashboardPage from '../pages/customers/CustomerDashboardPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<h1>Bank System</h1>} />

        <Route
          path="/client/:id"
          element={<CustomerDashboardPage />}
        />

        <Route
          path="/client/:id/create"
          element={<ClientCreateAccountPage />}
        />

        <Route
          path="/client/:id/delete/:aid"
          element={<DeleteAccountPage />}
        />



        {/* Employee */}
        <Route
          path="/employee"
          element={<EmployeeDashboardPage />}
        />

        <Route
          path="/employee/customers"
          element={<CustomerListPage />}
        />

        <Route
          path="/employee/customer/:id"
          element={<CustomerDetailsPage />}
        />

        <Route
          path="/employee/customer/:id/accounts"
          element={<CustomerAccountsPage />}
        />

        <Route
          path="/employee/account/create"
          element={<CreateAccountPage />}
        />

        {/* Manager */}
        <Route
          path="/manager"
          element={<ManagerDashboardPage />}
        />

        <Route
          path="/manager/staff"
          element={<StaffListPage />}
        />

        <Route
          path="/manager/staff/create"
          element={<CreateStaffPage />}
        />

        <Route
          path="/manager/staff/:id"
          element={<StaffDetailsPage />}
        />

        <Route
          path="/manager/reports"
          element={<ReportsPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />


      </Routes>
    </BrowserRouter>
  );
}