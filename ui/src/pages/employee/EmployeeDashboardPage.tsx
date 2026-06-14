import React from 'react';
import { Link } from "react-router-dom";

export default function EmployeeDashboardPage() {

  return (
    <div>

      <h1>Employee Dashboard</h1>

      <ul>

        <li>
          <Link to="/employee/customers">
            Customers
          </Link>
        </li>

        <li>
          <Link to="/employee/account/create">
            Create Account
          </Link>
        </li>

      </ul>

    </div>
  );
}