import React from 'react';
import { Link } from "react-router-dom";

export default function EmployeeSidebar() {
  return (
    <div>

      <h3>Employee</h3>

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