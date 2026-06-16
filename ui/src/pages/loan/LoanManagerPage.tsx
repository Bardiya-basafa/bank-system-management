import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLoans } from "../../api/loanApi";

const fs: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0A1628', fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: '48px', color: '#F1F5F9' },
  backLink: { display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#94A3B8', textDecoration: 'none', fontSize: '13px', marginBottom: '24px', transition: 'color 0.15s' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' },
  eyebrow: { fontSize: '11px', letterSpacing: '2px', color: '#38BDF8', textTransform: 'uppercase', marginBottom: '6px' },
  h1: { fontSize: '28px', fontWeight: 700, margin: 0 },
  createBtn: { background: '#38BDF8', color: '#0A1628', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, transition: 'background 0.2s' },
  card: { background: '#112240', border: '1px solid #1E3A5F', borderRadius: '12px', overflow: 'hidden', marginTop: '24px' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' },
  th: { padding: '16px 24px', color: '#94A3B8', borderBottom: '1px solid #1E3A5F', fontWeight: 600, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', background: 'rgba(30,58,95,0.2)' },
  td: { padding: '16px 24px', borderBottom: '1px solid rgba(30,58,95,0.5)', verticalAlign: 'middle', color: '#F1F5F9' },
  statusBadge: { padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', border: '1px solid transparent' }
};

export default function LoanManagerPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await getLoans();
        setLoans(res.data);
      } catch (err) {
        console.error("Failed to load loans:", err);
        setError("Failed to load loan directory.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    return dateString.split("T")[0];
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'active') return { background: 'rgba(52,211,153,0.1)', color: '#34D399', borderColor: 'rgba(52,211,153,0.3)' };
    if (s === 'pending') return { background: 'rgba(251,191,36,0.1)', color: '#FBBF24', borderColor: 'rgba(251,191,36,0.3)' };
    return { background: 'rgba(248,113,113,0.1)', color: '#F87171', borderColor: 'rgba(248,113,113,0.3)' };
  };

  if (loading) {
    return <div style={{ ...fs.page, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#38BDF8' }}>Loading loan directory...</div>;
  }

  return (
    <div style={fs.page}>
      <Link to="/manager" style={fs.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >← Back to Manager Dashboard</Link>

      <div style={fs.header}>
        <div>
          <div style={fs.eyebrow}>Loan Portfolio</div>
          <h1 style={fs.h1}>Loan Directory</h1>
        </div>
        <Link to="/loan/create" style={fs.createBtn}
          onMouseEnter={e => (e.currentTarget.style.background = '#7DD3FC')}
          onMouseLeave={e => (e.currentTarget.style.background = '#38BDF8')}
        >
          + Issue New Loan
        </Link>
      </div>
      
      {error && (
        <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: '8px', padding: '14px 18px', color: '#F87171', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <div style={fs.card}>
        {loans.length === 0 && !error ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94A3B8' }}>
            No loans found in the system.
          </div>
        ) : (
          <table style={fs.table}>
            <thead>
              <tr>
                <th style={fs.th}>Loan ID</th>
                <th style={fs.th}>Account ID</th>
                <th style={fs.th}>Guarantor</th>
                <th style={fs.th}>Principal</th>
                <th style={fs.th}>Rate</th>
                <th style={fs.th}>Term</th>
                <th style={fs.th}>Issue Date</th>
                <th style={fs.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.loanId} style={{ transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ ...fs.td, fontFamily: 'monospace', color: '#38BDF8', fontWeight: 600 }}>#{loan.loanId}</td>
                  <td style={{ ...fs.td, fontFamily: 'monospace' }}>{loan.accountId}</td>
                  <td style={{ ...fs.td, fontFamily: 'monospace' }}>{loan.guarantorCustomerId}</td>
                  <td style={{ ...fs.td, fontWeight: 700 }}>{formatMoney(loan.amount)}</td>
                  <td style={fs.td}>{loan.interestRate.toFixed(2)}%</td>
                  <td style={fs.td}>{loan.loanTermMonths} mo</td>
                  <td style={{ ...fs.td, color: '#94A3B8' }}>{formatDate(loan.issueDate)}</td>
                  <td style={fs.td}>
                    <span style={{ ...fs.statusBadge, ...getStatusStyle(loan.repaymentStatus) }}>
                      {loan.repaymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}