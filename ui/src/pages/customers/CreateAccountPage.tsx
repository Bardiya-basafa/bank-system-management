import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { clientcreateAccount } from "../../api/accountApi";

export default function ClientCreateAccountPage() {
  const { customer_id } = useParams<{ customer_id: string }>();

  const [accountNumber, setAccountNumber] = useState<string>("");
  const [currencyId, setCurrencyId] = useState<number>(1);
  const [accountType, setAccountType] = useState<string>("current");
  const [balance, setBalance] = useState<string>("0");
  const [accountStatus, setAccountStatus] = useState<string>("active");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer_id) {
      alert("Customer ID is missing from the URL.");
      return;
    }

    setIsSubmitting(true);

    try {
      await clientcreateAccount(Number(customer_id), {
        accountNumber: accountNumber,
        currencyId: Number(currencyId),
        accountType: accountType,
        balance: Number(balance),
        accountStatus: accountStatus
      });

      alert("Account successfully created!");

      setAccountNumber("");
      setBalance("0");
      
    } catch (error) {
      console.error("Failed to create account:", error);
      alert("Failed to create account. Please check your inputs and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h1>Create New Account</h1>
      <p style={{ color: "gray", fontSize: "0.9rem" }}>
        Creating account for Customer ID: <strong>{customer_id}</strong>
      </p>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <div>
          <label>Account Number:</label><br/>
          <input
            type="text"
            required
            placeholder="e.g. 1000000000000116"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Currency ID:</label><br />
          <input
            type="number"
            required
            placeholder="e.g. 3"
            value={currencyId}
            onChange={(e) => setCurrencyId(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Account Type:</label><br/>
          <select 
            value={accountType} 
            onChange={(e) => setAccountType(e.target.value)}
            style={{ width: "100%", padding: "4px" }}
          >
            <option value="saving">Saving</option>
            <option value="current">Current</option>
            <option value="credit">Credit</option>
          </select>
        </div>

        <div>
          <label>Initial Balance ($):</label><br/>
          <input
            type="number"
            step="0.01"
            required
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Account Status:</label><br/>
          <select 
            value={accountStatus} 
            onChange={(e) => setAccountStatus(e.target.value)}
            style={{ width: "100%", padding: "4px" }}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="frozen">Frozen</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ marginTop: "10px", padding: "8px" }}
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>

      </form>
    </div>
  );
}