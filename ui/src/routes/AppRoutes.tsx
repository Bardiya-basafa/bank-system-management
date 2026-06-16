import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
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

import ClientCreateAccountPage from '../pages/customers/CreateAccountPage';
import DeleteAccountPage from '../pages/customers/DeleteAccountPage';
import CustomerDashboardPage from '../pages/customers/CustomerDashboardPage';
import CurrencyAdminPage from '../pages/admin/CurrencyAdminPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';
import BranchAdminPage from '../pages/admin/BranchAdminPage';
import EditAccountPage from '../pages/customers/EditAccountPage';
import CreateCustomerPage from '../pages/customers/CreateCustomerPage';
import CreateLoanPage from '../pages/loan/CreateLoanPage';
import LoanManagerPage from '../pages/loan/LoanManagerPage';
import CreateTransactionPage from '../pages/transaction/CreateTransactionPage';
import TransactionAdminPage from '../pages/transaction/TransactionAdminPage';





const SmartRoot = () => {
  const token = localStorage.getItem('jwt');
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decodedToken: any = jwtDecode(token);
    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodedToken.role;
    const rolesArray = (Array.isArray(userRole) ? userRole : [userRole]).map(r => String(r).toLowerCase());

    if (rolesArray.includes('admin')) return <Navigate to="/admin" replace />;
    if (rolesArray.includes('manager')) return <Navigate to="/manager" replace />;
    if (rolesArray.includes('employee')) return <Navigate to="/employee" replace />;
    if (rolesArray.includes('customer')) return <Navigate to="/client/dashboard" replace />; 
    
    return <Navigate to="/login" replace />;
  } catch {
    localStorage.removeItem('jwt');
    return <Navigate to="/login" replace />;
  }
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SmartRoot />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />

        {/* --- ADMIN  --- */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/branches"    element={<BranchAdminPage />} />
          <Route path="/admin/currencies"  element={<CurrencyAdminPage />} />
          <Route path="/admin/settings"    element={<AdminSettingsPage />} />
        </Route>

        {/* --- MANAGER ROUTES --- */}
        <Route element={<ProtectedRoute allowedRoles={['manager', 'admin']} />}> 
          <Route path="/manager" element={<ManagerDashboardPage />} />
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
        </Route>

        {/* --- EMPLOYEE --- */}
        <Route element={<ProtectedRoute allowedRoles={['employee', 'manager', 'admin']} />}>
          <Route path="/employee" element={<EmployeeDashboardPage />} />

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

          {/* Loan */}
          <Route
            path="/loan/create"
            element={<CreateLoanPage />}
          />
        </Route>
        {/* --- CUSTOMER --- */}
        <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
          <Route element={<ProtectedRoute allowedRoles={['employee', 'manager', 'admin', 'customer']} />}>
          <Route path="/client/:id" element={<CustomerDashboardPage />} />

          <Route
            path="/client/:id/create"
            element={<ClientCreateAccountPage />}
          />

          <Route
            path="/client/:id/edit"
            element={<EditAccountPage />}
          />

          {/* Transaction */}
          <Route
            path="/trx/create"
            element={<CreateTransactionPage />}
          />

          <Route
            path="/trx/admin"
            element={<TransactionAdminPage />}
          />


          <Route path="/"                                              element={<LoginPage />} />
          <Route path="/login"                                         element={<LoginPage />} />


          <Route path="/customer/:id"                                  element={<CustomerDashboardPage />} />
          <Route path="/customer/:id/account/create"                   element={<ClientCreateAccountPage />} />
          <Route path="/customer/:id/account/:aid/edit"                element={<EditAccountPage />} />
          <Route path="/customer/:id/account/:aid/delete"              element={<DeleteAccountPage />} />


          <Route path="/employee/customers/create"                     element={<CreateCustomerPage />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}