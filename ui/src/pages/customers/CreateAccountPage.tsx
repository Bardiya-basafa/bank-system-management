import React, { useState } from 'react';
import { clientcreateAccount } from "../../api/accountApi";

export default function ClientCreateAccountPage() {
  const [customerId, setCustomerId] = useState<string>("");
  const [currencyId, setCurrencyId] = useState<string>("1");
  const [accountType, setAccountType] = useState<string>("saving");
  const [balance, setBalance] = useState<string>("0");
  const [accountStatus, setAccountStatus] = useState<string>("active");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await clientcreateAccount({
        customerId: Number(customerId),
        currencyId: Number(currencyId),
        accountType: accountType,
        balance: Number(balance),
        accountStatus: accountStatus
      });

      alert("Account successfully created!");

      setCustomerId("");
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

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <div>
          <label>Customer ID:</label><br/>
          <input
            type="number"
            required
            placeholder="e.g. 123"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Currency ID:</label><br/>
          <input
            type="number"
            required
            placeholder="e.g. 1"
            value={currencyId}
            onChange={(e) => setCurrencyId(e.target.value)}
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
            <option value="checking">Checking</option>
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
