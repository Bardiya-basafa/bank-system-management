import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTransactions } from "../../api/transactionApi"; // Update path if needed

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
  statusBadge: { padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', border: '1px solid transparent' },
  mutedText: { color: '#64748B', fontStyle: 'italic', fontSize: '13px' }
};

export default function TransactionAdminPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to load transactions:", err);
        setError("Failed to load transaction ledger.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "—";
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

  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'successful') return { background: 'rgba(52,211,153,0.1)', color: '#34D399', borderColor: 'rgba(52,211,153,0.3)' };
    if (s === 'failed') return { background: 'rgba(248,113,113,0.1)', color: '#F87171', borderColor: 'rgba(248,113,113,0.3)' };
    // Default for pending or others
    return { background: 'rgba(251,191,36,0.1)', color: '#FBBF24', borderColor: 'rgba(251,191,36,0.3)' };
  };

  if (loading) {
    return <div style={{ ...fs.page, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#38BDF8' }}>Loading transactions...</div>;
  }

  return (
    <div style={fs.page}>
      <Link to="/employee" style={fs.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >← Back to Dashboard</Link>

      <div style={fs.header}>
        <div>
          <div style={fs.eyebrow}>Global Records</div>
          <h1 style={fs.h1}>Transaction Ledger</h1>
        </div>
        <Link to="/trx/create" style={fs.createBtn}
          onMouseEnter={e => (e.currentTarget.style.background = '#7DD3FC')}
          onMouseLeave={e => (e.currentTarget.style.background = '#38BDF8')}
        >
          + Execute Transaction
        </Link>
      </div>

      {error && (
        <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: '8px', padding: '14px 18px', color: '#F87171', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <div style={fs.card}>
        {transactions.length === 0 && !error ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94A3B8' }}>
            No transactions found in the system.
          </div>
        ) : (
          <table style={fs.table}>
            <thead>
              <tr>
                <th style={fs.th}>ID</th>
                <th style={fs.th}>Ref Code</th>
                <th style={fs.th}>Type</th>
                <th style={fs.th}>Source Acc</th>
                <th style={fs.th}>Target Acc</th>
                <th style={fs.th}>Amount</th>
                <th style={fs.th}>Date Issued</th>
                <th style={fs.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.transactionId} style={{ transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ ...fs.td, color: '#94A3B8' }}>{tx.transactionId}</td>
                  <td style={{ ...fs.td, fontFamily: 'monospace', color: '#38BDF8', fontWeight: 600 }}>{tx.referenceCode}</td>
                  <td style={{ ...fs.td, textTransform: 'capitalize' }}>
                    {tx.transactionType.replace("_", " ")}
                  </td>
                  
                  <td style={{ ...fs.td, fontFamily: 'monospace' }}>
                    {tx.sourceAccountId ? tx.sourceAccountId : <span style={fs.mutedText}>External/Cash</span>}
                  </td>
                  <td style={{ ...fs.td, fontFamily: 'monospace' }}>
                    {tx.targetAccountId ? tx.targetAccountId : <span style={fs.mutedText}>External/Cash</span>}
                  </td>
                  
                  <td style={{ ...fs.td, fontWeight: 700 }}>{formatMoney(tx.amount)}</td>
                  <td style={{ ...fs.td, color: '#94A3B8', fontSize: '13px' }}>{formatDateTime(tx.issuedAt)}</td>
                  <td style={fs.td}>
                    <span style={{ ...fs.statusBadge, ...getStatusStyle(tx.transactionStatus) }}>
                      {tx.transactionStatus}
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