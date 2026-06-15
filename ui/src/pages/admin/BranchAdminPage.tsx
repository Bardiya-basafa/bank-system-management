import React, { useEffect, useState } from 'react';
import { getBranches, createBranch, deleteBranch } from "../../api/branchApi";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0A1628',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: '48px',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: '#94A3B8',
    textDecoration: 'none',
    fontSize: '13px',
    marginBottom: '24px',
    transition: 'color 0.15s',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '32px',
  },
  eyebrow: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#F87171',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  },
  h1: { fontSize: '26px', fontWeight: 700, color: '#F1F5F9', margin: 0 },
  formCard: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    padding: '32px',
    marginBottom: '32px',
  },
  formSectionLabel: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    fontWeight: 600,
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #1E3A5F',
  },
  fieldGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '16px',
    marginBottom: '16px',
  },
  fieldGroupWide: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '16px',
    marginBottom: '20px',
  },
  field: { display: 'flex', flexDirection: 'column' as const, gap: '6px' },
  label: { fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px' },
  requiredStar: { color: '#F87171', marginLeft: '2px' },
  input: {
    background: '#0A1628',
    border: '1px solid #1E3A5F',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#F1F5F9',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  },
  select: {
    background: '#0A1628',
    border: '1px solid #1E3A5F',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#F1F5F9',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    cursor: 'pointer',
    appearance: 'none' as const,
    transition: 'border-color 0.15s',
  },
  footer: { display: 'flex', justifyContent: 'flex-end', marginTop: '8px' },
  submitBtn: {
    padding: '10px 28px',
    background: '#F87171',
    border: '1px solid rgba(248,113,113,0.4)',
    borderRadius: '8px',
    color: '#0A1628',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
  },
  tableCard: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  tableHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #1E3A5F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableTitle: { fontSize: '14px', fontWeight: 600, color: '#F1F5F9' },
  badge: {
    background: 'rgba(248,113,113,0.12)',
    color: '#F87171',
    fontSize: '11px',
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '20px',
    border: '1px solid rgba(248,113,113,0.25)',
  },
  table: { width: '100%', borderCollapse: 'collapse' as const },
  th: {
    padding: '12px 24px',
    textAlign: 'left' as const,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    color: '#94A3B8',
    background: 'rgba(10,22,40,0.5)',
    borderBottom: '1px solid #1E3A5F',
  },
  td: {
    padding: '14px 24px',
    fontSize: '14px',
    color: '#CBD5E1',
    borderBottom: '1px solid rgba(30,58,95,0.5)',
  },
  tdMono: {
    padding: '14px 24px',
    fontSize: '13px',
    color: '#94A3B8',
    fontFamily: 'monospace',
    borderBottom: '1px solid rgba(30,58,95,0.5)',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize' as const,
  },
  dot: { width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' },
  deleteBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid rgba(239,68,68,0.25)',
    background: 'rgba(239,68,68,0.08)',
    color: '#F87171',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
  },
  successBanner: {
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    borderRadius: '8px',
    padding: '14px 18px',
    color: '#34D399',
    fontSize: '14px',
    marginBottom: '24px',
  },
  errorBanner: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '8px',
    padding: '14px 18px',
    color: '#F87171',
    fontSize: '14px',
    marginBottom: '24px',
  },
};

function getStatusStyle(status: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    active: { background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' },
    inactive: { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.25)' },
    closing: { background: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.25)' },
  };
  return map[status?.toLowerCase()] ?? { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' };
}

const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = '#F87171';
  e.target.style.boxShadow = '0 0 0 3px rgba(248,113,113,0.15)';
};
const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = '#1E3A5F';
  e.target.style.boxShadow = 'none';
};

import { Link } from 'react-router-dom';

export default function BranchAdminPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [branchCode, setBranchCode] = useState('');
  const [branchName, setBranchName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [establishDate, setEstablishDate] = useState('');
  const [status, setStatus] = useState('active');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadBranches = async () => {
    try {
      const res = await getBranches();
      setBranches(res.data.branches);
    } catch {
      setBanner({ type: 'error', msg: 'Failed to load branches.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBranches(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createBranch({ branchCode, branchName, city, address, establishDate: `${establishDate}T00:00:00`, status });
      setBanner({ type: 'success', msg: `Branch ${branchCode} registered successfully.` });
      setBranchCode(''); setBranchName(''); setCity(''); setAddress(''); setEstablishDate(''); setStatus('active');
      await loadBranches();
    } catch {
      setBanner({ type: 'error', msg: 'Failed to create branch. Check your inputs.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, code: string) => {
    if (!window.confirm(`Delete branch ${code}? This cannot be undone.`)) return;
    try {
      await deleteBranch(id);
      setBanner({ type: 'success', msg: `Branch ${code} deleted.` });
      await loadBranches();
    } catch {
      setBanner({ type: 'error', msg: `Cannot delete branch ${code}. It may have active staff or accounts.` });
    }
  };

  const formatDate = (d: string) => d ? d.split('T')[0] : '—';

  return (
    <div style={styles.page}>
      <Link to="/admin" style={styles.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >
        ← Back to Dashboard
      </Link>

      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>Administration</div>
          <h1 style={styles.h1}>Branch Directory</h1>
        </div>
      </div>

      {banner && (
        <div style={banner.type === 'success' ? styles.successBanner : styles.errorBanner}>
          {banner.type === 'success' ? '✓' : '✕'} {banner.msg}
        </div>
      )}

      {/* Form */}
      <div style={styles.formCard}>
        <div style={styles.formSectionLabel}>Register New Branch</div>
        <form onSubmit={handleCreate}>
          <div style={styles.fieldGroup}>
            <div style={styles.field}>
              <label style={styles.label}>Branch Code <span style={styles.requiredStar}>*</span></label>
              <input style={styles.input} placeholder="e.g. BR16" value={branchCode}
                onChange={e => setBranchCode(e.target.value.toUpperCase())}
                onFocus={focusStyle} onBlur={blurStyle} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Branch Name <span style={styles.requiredStar}>*</span></label>
              <input style={styles.input} placeholder="e.g. Central" value={branchName}
                onChange={e => setBranchName(e.target.value)}
                onFocus={focusStyle} onBlur={blurStyle} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>City <span style={styles.requiredStar}>*</span></label>
              <input style={styles.input} placeholder="e.g. Tabriz" value={city}
                onChange={e => setCity(e.target.value)}
                onFocus={focusStyle} onBlur={blurStyle} required />
            </div>
          </div>
          <div style={styles.fieldGroupWide}>
            <div style={styles.field}>
              <label style={styles.label}>Address <span style={styles.requiredStar}>*</span></label>
              <input style={styles.input} placeholder="e.g. Ferdowsi St, Block 4" value={address}
                onChange={e => setAddress(e.target.value)}
                onFocus={focusStyle} onBlur={blurStyle} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Establish Date</label>
              <input style={styles.input} type="date" value={establishDate}
                onChange={e => setEstablishDate(e.target.value)}
                onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select style={styles.select} value={status} onChange={e => setStatus(e.target.value)}
                onFocus={focusStyle} onBlur={blurStyle}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="closing">Closing</option>
              </select>
            </div>
          </div>
          <div style={styles.footer}>
            <button type="submit" disabled={isSubmitting}
              style={{ ...styles.submitBtn, opacity: isSubmitting ? 0.7 : 1 }}
              onMouseEnter={e => !isSubmitting && ((e.currentTarget as HTMLElement).style.background = '#FCA5A5')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#F87171')}
            >
              {isSubmitting ? 'Registering…' : 'Register Branch'}
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <span style={styles.tableTitle}>All Branches</span>
          <span style={styles.badge}>{branches.length} branches</span>
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              {['ID', 'Code', 'Name', 'City', 'Address', 'Established', 'Status', 'Actions'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ ...styles.td, textAlign: 'center', color: '#94A3B8', padding: '40px' }}>Loading branches…</td></tr>
            ) : branches.length === 0 ? (
              <tr><td colSpan={8} style={{ ...styles.td, textAlign: 'center', padding: '60px', color: '#64748B' }}>No branches found.</td></tr>
            ) : branches.map(b => (
              <tr key={b.branchId}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(30,58,95,0.4)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                style={{ transition: 'background 0.15s' }}
              >
                <td style={styles.tdMono}>#{b.branchId}</td>
                <td style={{ ...styles.td, fontWeight: 700, color: '#F1F5F9', fontFamily: 'monospace' }}>{b.branchCode}</td>
                <td style={styles.td}>{b.branchName}</td>
                <td style={styles.td}>{b.city}</td>
                <td style={{ ...styles.td, color: '#94A3B8', fontSize: '13px' }}>{b.address}</td>
                <td style={styles.tdMono}>{formatDate(b.establishDate)}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.statusBadge, ...getStatusStyle(b.status) }}>
                    <span style={styles.dot} />{b.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={styles.deleteBtn}
                    onClick={() => handleDelete(b.branchId, b.branchCode)}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.5)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.25)'; }}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
