import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createTransaction } from "../../api/transactionApi";

export default function CreateTransactionPage() {
  const [referenceCode, setReferenceCode] = useState<string>("");
  const [sourceAccountId, setSourceAccountId] = useState<string>("");
  const [targetAccountId, setTargetAccountId] = useState<string>("");
  const [sourceDeviceId, setSourceDeviceId] = useState<string>("1");
  const [transactionType, setTransactionType] = useState<string>("transfer");
  const [amount, setAmount] = useState<string>("0.00");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const generateRefCode = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    setReferenceCode(`REF${randomNum}`);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createTransaction({
        referenceCode: referenceCode,
        sourceAccountId: Number(sourceAccountId),
        targetAccountId: Number(targetAccountId),
        sourceDeviceId: Number(sourceDeviceId),
        transactionType: transactionType,
        amount: Number(amount)
      });

      alert("Transaction successfully processed!");

      setReferenceCode("");
      setSourceAccountId("");
      setTargetAccountId("");
      setAmount("0.00");
      
    } catch (error) {
      console.error("Failed to process transaction:", error);
      alert("Failed to process transaction. Please check your inputs and ensure the Account IDs are valid and have sufficient funds.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Execute Transaction</h1>

      <form onSubmit={submit} style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>

        <div style={{ flex: "1 1 100%" }}>
          <label>Reference Code:</label><br />
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              required
              placeholder="e.g. REF14"
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
            />
            <button 
              type="button" 
              onClick={generateRefCode}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              Generate
            </button>
          </div>
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Transaction Type:</label><br/>
          <select 
            value={transactionType} 
            onChange={(e) => setTransactionType(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="transfer">Transfer</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="payment">Payment</option>
          </select>
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Amount ($):</label><br />
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
          <label>Source Account ID:</label><br />
          <input
            type="number"
            required
            placeholder="e.g. 1"
            value={sourceAccountId}
            onChange={(e) => setSourceAccountId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Target Account ID:</label><br />
          <input
            type="number"
            required
            placeholder="e.g. 2"
            value={targetAccountId}
            onChange={(e) => setTargetAccountId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ flex: "1 1 100%" }}>
          <label>Source Device ID:</label><br />
          <input
            type="number"
            required
            value={sourceDeviceId}
            onChange={(e) => setSourceDeviceId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
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
          {isSubmitting ? "Processing..." : "Execute Transaction"}
        </button>

      </form>
    </div>
  );
}