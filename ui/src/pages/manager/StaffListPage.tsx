import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStaff } from "../../api/staffApi";
import type { Staff } from "../../types/staff";
import { deleteStaff } from "../../api/staffApi";
import DataTable from '../../components/common/DataTable';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

export default function StaffListPage() {

  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const remove = async(id:number) => {

    await deleteStaff(id);
  
    setStaff(prev =>
      prev.filter(x => x.staffId !== id)
    );
  
  };

  useEffect(() => {
    getStaff()
      .then((response) => {
        setStaff(response.data.staff);
      })
      .catch((err) => {
        console.error("FULL ERROR:", err);
      
        if (err.response) {
          console.log("Response:", err.response.data);
          console.log("Status:", err.response.status);
        }
      
        setError("Failed to load staff");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>Staff List</h1>

      <Link to="/manager/staff/create">
        Create Staff
      </Link>

      <DataTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          
          {staff.map((employee) => (
            <tr key={employee.staffId}>
              <td>{employee.staffId}</td>
              <td>
                {employee.firstName} {employee.lastName}
              </td>
              <td>{employee.role}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.status}</td>
              <td><Link to={`/manager/staff/${employee.staffId}`}>
                    View
                  </Link>

                    {" | "}

                  <button onClick={() => remove(employee.staffId)}>
                    Delete
                  </button>

              </td>
            </tr>
          ))}
        </tbody>
        
      </DataTable>
    </div>
  );
}