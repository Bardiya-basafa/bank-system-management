import React from 'react';
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerAccounts } from "../../api/customerApi";


export default function CustomerAccountsPage() {

  const { id } = useParams();

  const [accounts,setAccounts] = useState<any[]>([]);

  useEffect(() => {

    getCustomerAccounts(Number(id))
      .then(res => setAccounts(res.data))
      .catch(console.error);

  }, [id]);

  return (
    <div>

      <h1>Customer Accounts</h1>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Account Number</th>
            <th>Balance</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {accounts.map(account => (

            <tr key={account.accountId}>
              <td>{account.accountId}</td>
              <td>{account.accountNumber}</td>
              <td>{account.balance}</td>
              <td>{account.accountStatus}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}