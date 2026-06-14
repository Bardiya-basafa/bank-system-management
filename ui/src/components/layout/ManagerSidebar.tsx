import React from 'react';
import { Link } from "react-router-dom";

export default function ManagerSidebar() {
  return (
    <div>

      <h3>Manager</h3>

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