import React from 'react';
import { Link } from "react-router-dom";

export default function ManagerDashboardPage() {

  return (
    <div>

      <h1>Manager Dashboard</h1>

      <ul>
        <li>
          <Link to="/manager/staff">
            Staff
          </Link>
        </li>

        <li>
          <Link to="/manager/staff/create">
            Create Staff
          </Link>
        </li>

        <li>
          <Link to="/manager/reports">
            Reports
          </Link>
        </li>

        <li>
          <Link to="/manager/requests">
            Requests
          </Link>
        </li>
      </ul>

    </div>
  );
}