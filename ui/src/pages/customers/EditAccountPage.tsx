import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAccountById, updateAccount } from "../../api/accountApi";

export default function EditAccountPage() {
  const { id } = useParams<{ id: string }>();

  // Form State
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [currencyId, setCurrencyId] = useState<number>(1);
  const [accountType, setAccountType] = useState<string>("current");
  const [balance, setBalance] = useState<string>("0");
  const [accountStatus, setAccountStatus] = useState<string>("active"); // <-- Added state

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch the existing account data when the page loads
  useEffect(() => {
    if (!id) return;

    getAccountById(Number(id))
      .then(res => {
        const data = res.data;
        // Pre-fill the form with the data from the database
        setAccountNumber(data.accountNumber || "");
        setCurrencyId(data.currencyId || 1);
        setAccountType(data.accountType || "current");
        setBalance(data.balance ? data.balance.toString() : "0");
        setAccountStatus(data.accountStatus || "active"); // <-- Pre-fill status
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch account info:", err);
        alert("Could not load account details.");
        setIsLoading(false);
      });
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSubmitting(true);

    try {
      await updateAccount({
        accountId: Number(id),
        accountNumber: accountNumber,
        currencyId: Number(currencyId),
        accountType: accountType,
        balance: Number(balance),
        accountStatus: accountStatus // <-- Include in payload
      });

      alert("Account successfully updated!");
    } catch (error) {
      console.error("Failed to update account:", error);
      alert("Failed to update account. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading account details...</div>;

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <Link to={`/`} style={{ textDecoration: "none", color: "#0275d8" }}>
        ← Go Back
      </Link>

      <h1 style={{ marginBottom: "0.5rem" }}>Edit Account</h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Updating Account <strong>#{id}</strong>
      </p>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <div>
          <label>Account Number:</label><br />
          <input
            type="text"
            required
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <div>
          <label>Currency ID:</label><br />
          <input
            type="number"
            required
            value={currencyId}
            onChange={(e) => setCurrencyId(Number(e.target.value))}
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <div>
          <label>Account Type:</label><br/>
          <select 
            value={accountType} 
            onChange={(e) => setAccountType(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          >
            <option value="saving">Saving</option>
            <option value="checking">Checking</option>
            <option value="current">Current</option>
            <option value="credit">Credit</option>
          </select>
        </div>

        <div>
          <label>Balance ($):</label><br/>
          <input
            type="number"
            step="0.01"
            required
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        {/* --- NEW STATUS DROPDOWN --- */}
        <div>
          <label>Account Status:</label><br/>
          <select 
            value={accountStatus} 
            onChange={(e) => setAccountStatus(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="frozen">Frozen</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting || !id}
          style={{ 
            marginTop: "10px", 
            padding: "10px", 
            backgroundColor: "#28a745", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {isSubmitting ? "Updating..." : "Save Changes"}
        </button>

      </form>
    </div>
  );
}