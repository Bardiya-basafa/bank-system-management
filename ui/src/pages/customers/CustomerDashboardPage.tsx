import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCustomerById, getCustomerAccounts } from "../../api/customerApi";
import { clientcreateAccount, deleteAccount } from "../../api/accountApi"; 
import DataTable from '../../components/common/DataTable';

interface Customer {
  customerId: number;
  customerType: string;
  email: string;
  phone: string;
}

interface Account {
  accountId: number;
  accountNumber: string;
  currencyId: number;
  accountType: string;
  balance: number;
  accountStatus: string;
}

export default function CustomerDashboardPage() {
  const { id } = useParams<{ id: string }>();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [accountNumber, setAccountNumber] = useState<string>("");
  const [currencyId, setCurrencyId] = useState<string>("1");
  const [accountType, setAccountType] = useState<string>("saving");
  const [balance, setBalance] = useState<string>("0");
  const [accountStatus, setAccountStatus] = useState<string>("active");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadDashboardData = async () => {
    if (!id) return;
    try {
      const [customerRes, accountsRes] = await Promise.all([
        getCustomerById(Number(id)),
        getCustomerAccounts(Number(id))
      ]);
      setCustomer(customerRes.data);
      setAccounts(accountsRes.data);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [id]);

  const handleDeleteAccount = async (accountId: number) => {
    if (!window.confirm(`Are you sure you want to delete Account #${accountId}?`)) return;

    try {
      await deleteAccount(accountId);
      await loadDashboardData();
    } catch (error) {
      alert("Failed to delete account.");
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsSubmitting(true);

    try {
      await clientcreateAccount(Number(id), {
        accountNumber: accountNumber,
        currencyId: Number(currencyId),
        accountType: accountType,
        balance: Number(balance),
        accountStatus: accountStatus
      });
      
      alert("Account successfully created!");
      setAccountNumber("");
      setBalance("0");
      await loadDashboardData(); 
    } catch (error) {
      console.error("Failed to create account:", error);
      alert("Failed to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (!customer) return <div>Customer not found.</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <Link to="/employee/customers">← Back to Customers</Link>
      <h1>Customer Dashboard</h1>
      
      <h2>Profile Information</h2>
      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', background: '#f9f9f9' }}>
        <p><strong>ID:</strong> {customer.customerId} | <strong>Email:</strong> {customer.email}</p>
      </div>

      <h2>Accounts</h2>
      <DataTable>
        <thead>
          <tr><th>Number</th><th>Type</th><th>Status</th><th>Balance</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.accountId}>
              <td>{acc.accountNumber}</td>
              <td>{acc.accountType}</td>
              <td>{acc.accountStatus}</td>
              <td>${acc.balance.toFixed(2)}</td>
              <td>
                <button onClick={() => handleDeleteAccount(acc.accountId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>

      <h2>Open New Account</h2>
      <form onSubmit={handleCreateAccount} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Account Number" required value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
        <input type="number" placeholder="Currency ID" required value={currencyId} onChange={(e) => setCurrencyId(e.target.value)} />
        <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
          <option value="saving">Saving</option>
          <option value="current">Current</option>
          <option value="business">Business</option>
        </select>
        <input type="number" step="0.01" placeholder="Balance" required value={balance} onChange={(e) => setBalance(e.target.value)} />
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Create"}</button>
      </form>
    </div>
  );
}