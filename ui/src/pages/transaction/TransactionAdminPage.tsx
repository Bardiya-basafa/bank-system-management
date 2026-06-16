import React, { useEffect, useState } from 'react';
import { getTransactions } from "../../api/transactionApi";
import DataTable from '../../components/common/DataTable';
import { Link } from 'react-router-dom';

export default function TransactionAdminPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res.data);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) return <div>Loading transactions...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h1>Transaction Ledger</h1>
        <Link 
          to="/trx/create" 
          style={{ 
            padding: "8px 16px", 
            backgroundColor: "#0275d8", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "4px",
            fontWeight: "bold"
          }}
        >
          + Execute Transaction
        </Link>
      </div>
      
      <hr style={{ marginBottom: "2rem" }} />

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <DataTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ref Code</th>
              <th>Type</th>
              <th>Source Acc</th>
              <th>Target Acc</th>
              <th>Amount</th>
              <th>Date Issued</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.transactionId}>
                <td>{tx.transactionId}</td>
                <td><strong>{tx.referenceCode}</strong></td>
                <td>
                  <span style={{ textTransform: "capitalize", color: "#495057" }}>
                    {tx.transactionType.replace("_", " ")}
                  </span>
                </td>
                
                <td>{tx.sourceAccountId ? tx.sourceAccountId : <span style={{ color: "#aaa" }}>N/A</span>}</td>
                <td>{tx.targetAccountId ? tx.targetAccountId : <span style={{ color: "#aaa" }}>N/A</span>}</td>
                
                <td><strong>{formatMoney(tx.amount)}</strong></td>
                <td>{formatDateTime(tx.issuedAt)}</td>
                <td>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "12px", 
                    backgroundColor: tx.transactionStatus === "successful" ? "#d4edda" : (tx.transactionStatus === "failed" ? "#f8d7da" : "#fff3cd"),
                    color: tx.transactionStatus === "successful" ? "#155724" : (tx.transactionStatus === "failed" ? "#721c24" : "#856404"),
                    fontSize: "0.9em"
                  }}>
                    {tx.transactionStatus.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      )}
    </div>
  );
}