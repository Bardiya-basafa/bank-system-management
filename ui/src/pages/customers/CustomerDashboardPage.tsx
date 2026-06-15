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
    const confirmDelete = window.confirm(`Are you sure you want to delete Account #${accountId}?`);
    if (!confirmDelete) return;

    try {
      await deleteAccount(accountId);
      alert("Account deleted.");
      await loadDashboardData();
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account.");
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsSubmitting(true);

    try {
      await clientcreateAccount({
        customerId: Number(id),
        currencyId: Number(currencyId),
        accountType: accountType,
        balance: Number(balance),
        accountStatus: accountStatus
      });
      
      alert("Account successfully created!");
      
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

      <h1 style={{ marginBottom: "0.5rem" }}>Customer Dashboard</h1>
      <hr style={{ marginBottom: "2rem" }} />

      {/* --- 1. PROFILE SECTION --- */}
      <h2>Profile Information</h2>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
        <p><strong>ID:</strong> {customer.customerId}</p>
        <p><strong>Type:</strong> {customer.customerType}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
      </div>

      {/* --- 2. ACCOUNTS LIST SECTION --- */}
      <h2>Accounts & Balances</h2>
      {accounts.length === 0 ? (
        <p style={{ marginBottom: '2rem' }}>No accounts found for this customer.</p>
      ) : (
        <div style={{ marginBottom: '2rem' }}>
          <DataTable>
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Account Number</th>
                <th>Type</th>
                <th>Status</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => (
                <tr key={acc.accountId}>
                  <td>{acc.accountId}</td>
                  <td>{acc.accountNumber}</td>
                  <td>{acc.accountType}</td>
                  <td>{acc.accountStatus}</td>
                  <td>${acc.balance.toFixed(2)}</td>
                  <td>
                    <button 
                      onClick={() => handleDeleteAccount(acc.accountId)}
                      style={{ padding: "4px 8px", backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </div>
      )}

      {/* --- 3. CREATE ACCOUNT SECTION --- */}
      <h2>Open New Account</h2>
      <form onSubmit={handleCreateAccount} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        
        <div style={{ flex: 1, minWidth: '100px' }}>
          <label>Currency ID</label><br/>
          <input type="number" required value={currencyId} onChange={(e) => setCurrencyId(e.target.value)} style={{ width: "100%" }} />
        </div>

        <div style={{ flex: 1, minWidth: '120px' }}>
          <label>Type</label><br/>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)} style={{ width: "100%", padding: "2px" }}>
            <option value="saving">Saving</option>
            <option value="checking">Checking</option>
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '100px' }}>
          <label>Initial Deposit</label><br/>
          <input type="number" step="0.01" required value={balance} onChange={(e) => setBalance(e.target.value)} style={{ width: "100%" }} />
        </div>

        <div style={{ flex: 1, minWidth: '120px' }}>
          <label>Status</label><br/>
          <select value={accountStatus} onChange={(e) => setAccountStatus(e.target.value)} style={{ width: "100%", padding: "2px" }}>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '120px' }}>
          <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "4px" }}>
            {isSubmitting ? "Saving..." : "Create"}
          </button>
        </div>

      </form>

    </div>
  );
}