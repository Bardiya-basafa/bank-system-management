import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createLoan } from "../../api/loanApi";

export default function CreateLoanPage() {
  const [accountId, setAccountId] = useState<string>("");
  const [guarantorCustomerId, setGuarantorCustomerId] = useState<string>("");
  const [amount, setAmount] = useState<string>("10000");
  const [interestRate, setInterestRate] = useState<string>("10.0");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("36");
  const [repaymentStatus, setRepaymentStatus] = useState<string>("active");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createLoan({
        accountId: Number(accountId),
        guarantorCustomerId: Number(guarantorCustomerId),
        amount: Number(amount),
        interestRate: Number(interestRate),
        loanTermMonths: Number(loanTermMonths),
        repaymentStatus: repaymentStatus
      });

      alert("Loan successfully issued!");

      setAccountId("");
      setGuarantorCustomerId("");
      setAmount("0");
      setInterestRate("0");
      setLoanTermMonths("12");
      setRepaymentStatus("active");
      
    } catch (error) {
      console.error("Failed to create loan:", error);
      alert("Failed to create loan. Please check your inputs and ensure the Account and Guarantor IDs exist in the database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Issue New Loan</h1>

      <form onSubmit={submit} style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>

        <div style={{ flex: "1 1 45%" }}>
          <label>Target Account ID:</label><br />
          <input
            type="number"
            required
            placeholder="e.g. 3"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Guarantor Customer ID:</label><br />
          <input
            type="number"
            required
            placeholder="e.g. 1"
            value={guarantorCustomerId}
            onChange={(e) => setGuarantorCustomerId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Principal Amount ($):</label><br />
          <input
            type="number"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Interest Rate (%):</label><br />
          <input
            type="number"
            step="0.01"
            required
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Term Length (Months):</label><br />
          <input
            type="number"
            required
            value={loanTermMonths}
            onChange={(e) => setLoanTermMonths(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Initial Status:</label><br/>
          <select 
            value={repaymentStatus} 
            onChange={(e) => setRepaymentStatus(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            marginTop: "10px", 
            padding: "12px", 
            width: "100%",
            backgroundColor: "#0275d8", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {isSubmitting ? "Processing..." : "Issue Loan"}
        </button>

      </form>
    </div>
  );
}