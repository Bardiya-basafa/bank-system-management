import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { clientcreateAccount } from "../../api/accountApi";

const fs: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0A1628', fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: '48px' },
  backLink: { display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#94A3B8', textDecoration: 'none', fontSize: '13px', marginBottom: '24px', transition: 'color 0.15s' },
  header: { marginBottom: '36px' },
  eyebrow: { fontSize: '11px', letterSpacing: '2px', color: '#A78BFA', textTransform: 'uppercase' as const, marginBottom: '6px' },
  h1: { fontSize: '26px', fontWeight: 700, color: '#F1F5F9', margin: 0 },
  formCard: { background: '#112240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '36px', maxWidth: '560px' },
  sectionLabel: { fontSize: '11px', letterSpacing: '2px', color: '#94A3B8', textTransform: 'uppercase' as const, fontWeight: 600, marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #1E3A5F' },
  fieldGroup: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column' as const, gap: '6px' },
  fieldFull: { display: 'flex', flexDirection: 'column' as const, gap: '6px', gridColumn: '1 / -1' },
  label: { fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px' },
  star: { color: '#F87171', marginLeft: '2px' },
  input: { background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '10px 14px', color: '#F1F5F9', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' as const, fontFamily: 'inherit', transition: 'border-color 0.15s' },
  select: { background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '10px 14px', color: '#F1F5F9', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' as const, fontFamily: 'inherit', cursor: 'pointer', appearance: 'none' as const },
  divider: { height: '1px', background: '#1E3A5F', margin: '28px 0' },
  footer: { display: 'flex', justifyContent: 'flex-end', gap: '12px' },
  cancelBtn: { padding: '10px 24px', background: 'transparent', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#94A3B8', fontSize: '14px', fontWeight: 500, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', transition: 'all 0.15s' },
  submitBtn: { padding: '10px 28px', background: '#A78BFA', border: '1px solid rgba(167,139,250,0.4)', borderRadius: '8px', color: '#0A1628', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' },
  successBanner: { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '14px 18px', color: '#34D399', fontSize: '14px', marginBottom: '24px', maxWidth: '560px' },
  errorBanner: { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '14px 18px', color: '#F87171', fontSize: '14px', marginBottom: '24px', maxWidth: '560px' },
  customerChip: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '8px', padding: '8px 14px', color: '#C4B5FD', fontSize: '13px', marginBottom: '28px' },
};

const fo = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => { e.target.style.borderColor = '#A78BFA'; e.target.style.boxShadow = '0 0 0 3px rgba(167,139,250,0.15)'; };
const bl = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => { e.target.style.borderColor = '#1E3A5F'; e.target.style.boxShadow = 'none'; };

export default function ClientCreateAccountPage() {
  const { customer_id } = useParams<{ customer_id: string }>();
  const [accountNumber, setAccountNumber] = useState('');
  const [currencyId, setCurrencyId] = useState('1');
  const [accountType, setAccountType] = useState('saving');
  const [balance, setBalance] = useState('0');
  const [accountStatus, setAccountStatus] = useState('active');
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer_id) { setBanner({ type: 'error', msg: 'Customer ID is missing from the URL.' }); return; }
    setLoading(true);
    try {
      await clientcreateAccount(Number(customer_id), {
        accountNumber,
        currencyId: Number(currencyId),
        accountType,
        balance: Number(balance),
        accountStatus,
      });
      setBanner({ type: 'success', msg: 'Account created successfully.' });
      setAccountNumber(''); setBalance('0');
    } catch {
      setBanner({ type: 'error', msg: 'Failed to create account. Please check your inputs.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={fs.page}>
      <Link to={`/customer/${customer_id}`} style={fs.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >← Back to Dashboard</Link>

      <div style={fs.header}>
        <div style={fs.eyebrow}>Account Management</div>
        <h1 style={fs.h1}>Open New Account</h1>
      </div>

      {banner && <div style={banner.type === 'success' ? fs.successBanner : fs.errorBanner}>{banner.type === 'success' ? '✓' : '✕'} {banner.msg}</div>}

      <div style={fs.customerChip}>
        👤 Creating for Customer ID: <strong style={{ fontFamily: 'monospace' }}>#{customer_id}</strong>
      </div>

      <div style={fs.formCard}>
        <div style={fs.sectionLabel}>Account Details</div>
        <form onSubmit={submit}>
          <div style={fs.fieldGroup}>
            <div style={fs.fieldFull}>
              <label style={fs.label}>Account Number <span style={fs.star}>*</span></label>
              <input style={{ ...fs.input, fontFamily: 'monospace' }} type="text" required placeholder="e.g. 1000000000000116" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} onFocus={fo} onBlur={bl} />
            </div>
            <div style={fs.field}>
              <label style={fs.label}>Account Type</label>
              <select style={fs.select} value={accountType} onChange={e => setAccountType(e.target.value)} onFocus={fo} onBlur={bl}>
                <option value="saving">Saving</option>
                <option value="current">Current</option>
                <option value="credit">Credit</option>
              </select>
            </div>
            <div style={fs.field}>
              <label style={fs.label}>Currency ID</label>
              <input style={{ ...fs.input, fontFamily: 'monospace' }} type="number" required value={currencyId} onChange={e => setCurrencyId(e.target.value)} onFocus={fo} onBlur={bl} />
            </div>
            <div style={fs.field}>
              <label style={fs.label}>Initial Balance ($)</label>
              <input style={{ ...fs.input, fontFamily: 'monospace' }} type="number" step="0.01" required value={balance} onChange={e => setBalance(e.target.value)} onFocus={fo} onBlur={bl} />
            </div>
            <div style={fs.field}>
              <label style={fs.label}>Account Status</label>
              <select style={fs.select} value={accountStatus} onChange={e => setAccountStatus(e.target.value)} onFocus={fo} onBlur={bl}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="frozen">Frozen</option>
              </select>
            </div>
          </div>

          <div style={fs.divider} />
          <div style={fs.footer}>
            <Link to={`/customer/${customer_id}`} style={fs.cancelBtn}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F1F5F9'; (e.currentTarget as HTMLElement).style.borderColor = '#94A3B8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94A3B8'; (e.currentTarget as HTMLElement).style.borderColor = '#1E3A5F'; }}
            >Cancel</Link>
            <button type="submit" disabled={loading}
              style={{ ...fs.submitBtn, opacity: loading ? 0.7 : 1 }}
              onMouseEnter={e => !loading && ((e.currentTarget as HTMLElement).style.background = '#C4B5FD')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#A78BFA')}
            >{loading ? 'Creating…' : 'Open Account'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
