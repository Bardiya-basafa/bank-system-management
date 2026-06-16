import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { getCustomers } from '../api/customerApi';

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

import DeleteAccountPage from '../pages/customers/DeleteAccountPage';
import CustomerDashboardPage from '../pages/customers/CustomerDashboardPage';
import CurrencyAdminPage from '../pages/admin/CurrencyAdminPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';
import BranchAdminPage from '../pages/admin/BranchAdminPage';
import EditAccountPage from '../pages/customers/EditAccountPage';
import CreateLoanPage from '../pages/loan/CreateLoanPage';
import LoanManagerPage from '../pages/loan/LoanManagerPage';
import CreateTransactionPage from '../pages/transaction/CreateTransactionPage';
import TransactionAdminPage from '../pages/transaction/TransactionAdminPage';
import CustomerCreateAccountPage from '../pages/customers/CustomerCreateAccountPage';





const SmartRoot = () => {
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const routeUser = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setRedirectPath('/login');
        return;
      }

      try {
        const decodedToken: any = jwtDecode(token);
        
        // Extract Roles
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodedToken.role;
        const rolesArray = (Array.isArray(userRole) ? userRole : [userRole]).map(r => String(r).toLowerCase());

        // Handle Staff Routing
        if (rolesArray.includes('admin')) return setRedirectPath('/admin');
        if (rolesArray.includes('manager')) return setRedirectPath('/manager');
        if (rolesArray.includes('employee')) return setRedirectPath('/employee');
        
        // Handle Customer Routing
        if (rolesArray.includes('customer')) {
          // Check if ID is directly in token
          const directId = decodedToken.customerId || decodedToken.nameid;
          if (directId && !isNaN(Number(directId))) {
            return setRedirectPath(`/customer/${directId}`);
          }

          // If ID is not in token, extract email from claims
          const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] 
                     || decodedToken.email 
                     || decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
                     || decodedToken.name;

          if (email) {
            // Fetch customers and find the match
            const res = await getCustomers();
            const foundCustomer = res.data.find((c: any) => c.email.toLowerCase() === email.toLowerCase());
            
            if (foundCustomer) {
              return setRedirectPath(`/customer/${foundCustomer.customerId}`);
            }
          }
          
          setAuthError("Could not locate your customer profile. Please contact support.");
          return;
        }
        
        setRedirectPath('/login');
      } catch (err) {
        console.error("Routing error:", err);
        localStorage.removeItem('jwt');
        setRedirectPath('/login');
      }
    };

    routeUser();
  }, []);

  if (authError) return <div style={{ padding: '48px', color: '#F87171', background: '#0A1628', minHeight: '100vh', fontFamily: 'sans-serif' }}>{authError}</div>;
  if (redirectPath) return <Navigate to={redirectPath} replace />;
  
  return <div style={{ padding: '48px', color: '#38BDF8', background: '#0A1628', minHeight: '100vh', fontFamily: 'sans-serif' }}>Authenticating...</div>;
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

          <Route
            path="/manager/loans"
            element={<LoanManagerPage />}
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
        <Route element={<ProtectedRoute allowedRoles={['employee', 'manager', 'admin', 'customer']} />}>
          <Route path="/customer/:id" element={<CustomerDashboardPage />} />
          <Route path="/customer/:id/account/create" element={<CustomerCreateAccountPage />} />
          <Route path="/customer/:id/account/:aid/edit" element={<EditAccountPage />} />
          <Route path="/customer/:id/account/:aid/delete" element={<DeleteAccountPage />} />
        </Route>        
        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}