import React from 'react';
import { useEffect, useState } from "react";
import { getCustomers } from "../../api/customerApi";
import { Link } from "react-router-dom";
import DataTable from '../../components/common/DataTable';

export default function CustomerListPage() {

  const [customers,setCustomers] = useState([]);

  useEffect(() => {
    getCustomers()
      .then(res => setCustomers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>

      <h1>Customers</h1>

      

      <DataTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c:any) => (
            <tr key={c.customerId}>
                <td>

<Link
  to={`/employee/customer/${c.customerId}`}
>
  Details
</Link>

{" | "}

<Link
  to={`/employee/customer/${c.customerId}/accounts`}
>
  Accounts
</Link>

</td>
              <td>{c.customerId}</td>
              <td>{c.customerType}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              
            </tr>
          ))}
        </tbody>

      </DataTable>

    </div>
  );
}