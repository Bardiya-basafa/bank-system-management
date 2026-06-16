import React, { useEffect, useState } from 'react';
import { getLoans } from "../../api/loanApi";
import DataTable from '../../components/common/DataTable';
import { Link } from 'react-router-dom';

export default function LoanManagerPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await getLoans();
        setLoans(res.data);
      } catch (error) {
        console.error("Failed to load loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) return <div>Loading loans...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h1>Loan Directory</h1>
        <Link 
          to="/loan/create" 
          style={{ 
            padding: "8px 16px", 
            backgroundColor: "#0275d8", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "4px",
            fontWeight: "bold"
          }}
        >
          + Issue New Loan
        </Link>
      </div>
      
      <hr style={{ marginBottom: "2rem" }} />

      {loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        <DataTable>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Account ID</th>
              <th>Guarantor ID</th>
              <th>Amount</th>
              <th>Interest Rate</th>
              <th>Term</th>
              <th>Issue Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.loanId}>
                <td><strong>{loan.loanId}</strong></td>
                <td>{loan.accountId}</td>
                <td>{loan.guarantorCustomerId}</td>
                <td><strong>{formatMoney(loan.amount)}</strong></td>
                <td>{loan.interestRate.toFixed(2)}%</td>
                <td>{loan.loanTermMonths} months</td>
                <td>{formatDate(loan.issueDate)}</td>
                <td>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "12px", 
                    backgroundColor: loan.repaymentStatus === "active" ? "#d4edda" : "#fff3cd",
                    color: loan.repaymentStatus === "active" ? "#155724" : "#856404",
                    fontSize: "0.9em"
                  }}>
                    {loan.repaymentStatus.toUpperCase()}
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