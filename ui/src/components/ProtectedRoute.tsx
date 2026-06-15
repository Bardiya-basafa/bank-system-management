import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem('jwt');

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decodedToken: any = jwtDecode(token);
    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodedToken.role;
    
    if (!userRole) return <Navigate to="/login" replace />;

    const rolesArray = (Array.isArray(userRole) ? userRole : [userRole]).map(r => String(r).toLowerCase());
    const hasPermission = rolesArray.some((role: string) => allowedRoles.map(r => r.toLowerCase()).includes(role));

    return hasPermission ? <Outlet /> : <Navigate to="/" replace />;

  } catch (error) {
    localStorage.removeItem('jwt');
    return <Navigate to="/login" replace />;
  }
}