import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createCustomer } from "../../api/customerApi";

const hashToBase64 = async (plainText: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return btoa(String.fromCharCode(...hashArray));
};

const fs: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0A1628', fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: '48px' },
  backLink: { display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#94A3B8', textDecoration: 'none', fontSize: '13px', marginBottom: '24px', transition: 'color 0.15s' },
  header: { marginBottom: '36px' },
  eyebrow: { fontSize: '11px', letterSpacing: '2px', color: '#38BDF8', textTransform: 'uppercase' as const, marginBottom: '6px' },
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
  submitBtn: { padding: '10px 28px', background: '#2563EB', border: '1px solid rgba(37,99,235,0.5)', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' },
  successBanner: { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '14px 18px', color: '#34D399', fontSize: '14px', marginBottom: '24px' },
  errorBanner: { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '14px 18px', color: '#F87171', fontSize: '14px', marginBottom: '24px' },
};

const fo = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)'; };
const bl = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => { e.target.style.borderColor = '#1E3A5F'; e.target.style.boxShadow = 'none'; };

export default function CreateCustomerPage() {
  const [customerType, setCustomerType] = useState('individual');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const hashedPassword = await hashToBase64(password);
      await createCustomer({ customerType, phone, email, Password: hashedPassword, status });
      setBanner({ type: 'success', msg: 'Customer registered successfully.' });
      setPhone(''); setEmail(''); setPassword('');
    } catch {
      setBanner({ type: 'error', msg: 'Failed to register customer. The email may already be in use.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={fs.page}>
      <Link to="/employee/customers" style={fs.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >← Back to Customers</Link>

      <div style={fs.header}>
        <div style={fs.eyebrow}>Customer Management</div>
        <h1 style={fs.h1}>Register New Customer</h1>
      </div>

      {banner && <div style={{ ...(banner.type === 'success' ? fs.successBanner : fs.errorBanner), maxWidth: '560px' }}>{banner.type === 'success' ? '✓' : '✕'} {banner.msg}</div>}

      <div style={fs.formCard}>
        <div style={fs.sectionLabel}>Account Information</div>
        <form onSubmit={submit}>
          <div style={fs.fieldGroup}>
            <div style={{ ...fs.fieldFull }}>
              <label style={fs.label}>Customer Type</label>
              <select style={fs.select} value={customerType} onChange={e => setCustomerType(e.target.value)} onFocus={fo} onBlur={bl}>
                <option value="individual">Individual</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
            <div style={fs.fieldFull}>
              <label style={fs.label}>Email Address <span style={fs.star}>*</span></label>
              <input style={fs.input} type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onFocus={fo} onBlur={bl} />
            </div>
            <div style={fs.field}>
              <label style={fs.label}>Phone Number <span style={fs.star}>*</span></label>
              <input style={fs.input} type="tel" required placeholder="e.g. 09120000011" value={phone} onChange={e => setPhone(e.target.value)} onFocus={fo} onBlur={bl} />
            </div>
            <div style={fs.field}>
              <label style={fs.label}>Initial Status</label>
              <select style={fs.select} value={status} onChange={e => setStatus(e.target.value)} onFocus={fo} onBlur={bl}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div style={fs.fieldFull}>
              <label style={fs.label}>Password <span style={fs.star}>*</span></label>
              <input style={fs.input} type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onFocus={fo} onBlur={bl} />
            </div>
          </div>

          <div style={fs.divider} />
          <div style={fs.footer}>
            <Link to="/employee/customers" style={fs.cancelBtn}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F1F5F9'; (e.currentTarget as HTMLElement).style.borderColor = '#94A3B8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94A3B8'; (e.currentTarget as HTMLElement).style.borderColor = '#1E3A5F'; }}
            >Cancel</Link>
            <button type="submit" disabled={loading}
              style={{ ...fs.submitBtn, opacity: loading ? 0.7 : 1 }}
              onMouseEnter={e => !loading && ((e.currentTarget as HTMLElement).style.background = '#1D4ED8')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#2563EB')}
            >{loading ? 'Registering…' : 'Register Customer'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
