import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrencies, createCurrency, updateCurrency, deleteCurrency } from "../../api/currencyApi";

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
    maxWidth: '720px',
  },
  formCardEdit: {
    background: '#112240',
    border: '2px solid #F87171',
    borderRadius: '12px',
    padding: '32px',
    marginBottom: '32px',
    maxWidth: '720px',
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
  formSectionLabelEdit: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#F87171',
    textTransform: 'uppercase' as const,
    fontWeight: 600,
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid rgba(248,113,113,0.3)',
  },
  fieldGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    gap: '16px',
    marginBottom: '20px',
    alignItems: 'end',
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
  checkboxField: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 0',
    color: '#CBD5E1',
    fontSize: '14px',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    accentColor: '#F87171',
    cursor: 'pointer',
  },
  footer: { display: 'flex', justifyContent: 'flex-end', gap: '12px' },
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
  cancelBtn: {
    padding: '10px 24px',
    background: 'transparent',
    border: '1px solid #1E3A5F',
    borderRadius: '8px',
    color: '#94A3B8',
    fontSize: '14px',
    fontWeight: 500,
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
  actionLink: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
    marginRight: '8px',
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

const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.style.borderColor = '#F87171';
  e.target.style.boxShadow = '0 0 0 3px rgba(248,113,113,0.15)';
};
const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.style.borderColor = '#1E3A5F';
  e.target.style.boxShadow = 'none';
};

export default function CurrencyAdminPage() {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [currencyCode, setCurrencyCode] = useState('');
  const [currencyName, setCurrencyName] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [isForeign, setIsForeign] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCurrencies = async () => {
    try {
      const res = await getCurrencies();
      setCurrencies(res.data);
    } catch {
      setBanner({ type: 'error', msg: 'Failed to load currencies.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCurrencies(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setCurrencyCode(''); setCurrencyName(''); setCurrencySymbol(''); setIsForeign(true);
  };

  const handleEditClick = (currency: any) => {
    setEditingId(currency.currencyId);
    setCurrencyCode(currency.currencyCode);
    setCurrencyName(currency.currencyName);
    setCurrencySymbol(currency.currencySymbol);
    setIsForeign(currency.isForeign);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateCurrency({ currencyId: editingId, currencyCode, currencyName, currencySymbol, isForeign });
        setBanner({ type: 'success', msg: `Currency ${currencyCode} updated successfully.` });
      } else {
        await createCurrency({ currencyCode, currencyName, currencySymbol, isForeign });
        setBanner({ type: 'success', msg: `Currency ${currencyCode} added successfully.` });
      }
      resetForm();
      await loadCurrencies();
    } catch {
      setBanner({ type: 'error', msg: 'Failed to save currency. Please check your inputs.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, code: string) => {
    if (!window.confirm(`Delete currency ${code}? This cannot be undone.`)) return;
    try {
      await deleteCurrency(id);
      setBanner({ type: 'success', msg: `Currency ${code} deleted.` });
      if (editingId === id) resetForm();
      await loadCurrencies();
    } catch {
      setBanner({ type: 'error', msg: `Cannot delete ${code}. It may be in use.` });
    }
  };

  const isEditing = editingId !== null;

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
          <h1 style={styles.h1}>Currency Management</h1>
        </div>
      </div>

      {banner && (
        <div style={banner.type === 'success' ? styles.successBanner : styles.errorBanner}>
          {banner.type === 'success' ? '✓' : '✕'} {banner.msg}
        </div>
      )}

      {/* Smart Form */}
      <div style={isEditing ? styles.formCardEdit : styles.formCard}>
        <div style={isEditing ? styles.formSectionLabelEdit : styles.formSectionLabel}>
          {isEditing ? `Editing Currency #${editingId}` : 'Add New Currency'}
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.fieldGroup}>
            <div style={styles.field}>
              <label style={styles.label}>Code <span style={styles.requiredStar}>*</span></label>
              <input style={{ ...styles.input, fontFamily: 'monospace' }} maxLength={5}
                placeholder="e.g. USD" value={currencyCode}
                onChange={e => setCurrencyCode(e.target.value.toUpperCase())}
                onFocus={focusStyle} onBlur={blurStyle} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Name <span style={styles.requiredStar}>*</span></label>
              <input style={styles.input} placeholder="e.g. US Dollar" value={currencyName}
                onChange={e => setCurrencyName(e.target.value)}
                onFocus={focusStyle} onBlur={blurStyle} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Symbol <span style={styles.requiredStar}>*</span></label>
              <input style={{ ...styles.input, fontFamily: 'monospace', textAlign: 'center' }}
                placeholder="$" value={currencySymbol}
                onChange={e => setCurrencySymbol(e.target.value)}
                onFocus={focusStyle} onBlur={blurStyle} required />
            </div>
          </div>

          <label style={styles.checkboxField}>
            <input type="checkbox" style={styles.checkbox} checked={isForeign} onChange={e => setIsForeign(e.target.checked)} />
            Mark as foreign currency
          </label>

          <div style={{ ...styles.footer, marginTop: '20px' }}>
            {isEditing && (
              <button type="button" style={styles.cancelBtn} onClick={resetForm}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F1F5F9'; (e.currentTarget as HTMLElement).style.borderColor = '#94A3B8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94A3B8'; (e.currentTarget as HTMLElement).style.borderColor = '#1E3A5F'; }}
              >Cancel</button>
            )}
            <button type="submit" disabled={isSubmitting || !currencyCode || !currencyName || !currencySymbol}
              style={{ ...styles.submitBtn, opacity: (isSubmitting || !currencyCode || !currencyName || !currencySymbol) ? 0.6 : 1 }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#FCA5A5')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#F87171')}
            >
              {isSubmitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Add Currency'}
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <span style={styles.tableTitle}>Available Currencies</span>
          <span style={styles.badge}>{currencies.length} currencies</span>
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              {['ID', 'Code', 'Name', 'Symbol', 'Foreign?', 'Actions'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ ...styles.td, textAlign: 'center', color: '#94A3B8', padding: '40px' }}>Loading currencies…</td></tr>
            ) : currencies.length === 0 ? (
              <tr><td colSpan={6} style={{ ...styles.td, textAlign: 'center', padding: '60px', color: '#64748B' }}>No currencies found.</td></tr>
            ) : currencies.map(c => (
              <tr key={c.currencyId}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = editingId === c.currencyId ? 'rgba(248,113,113,0.05)' : 'rgba(30,58,95,0.4)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = editingId === c.currencyId ? 'rgba(248,113,113,0.05)' : 'transparent')}
                style={{ transition: 'background 0.15s', background: editingId === c.currencyId ? 'rgba(248,113,113,0.05)' : 'transparent' }}
              >
                <td style={styles.tdMono}>#{c.currencyId}</td>
                <td style={{ ...styles.td, fontWeight: 700, color: '#F1F5F9', fontFamily: 'monospace' }}>{c.currencyCode}</td>
                <td style={styles.td}>{c.currencyName}</td>
                <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '16px', color: '#38BDF8' }}>{c.currencySymbol}</td>
                <td style={styles.td}>
                  <span style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                    ...(c.isForeign
                      ? { background: 'rgba(56,189,248,0.12)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.25)' }
                      : { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' }),
                  }}>
                    {c.isForeign ? 'Foreign' : 'Domestic'}
                  </span>
                </td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.actionLink, background: 'rgba(37,99,235,0.12)', color: '#60A5FA', border: '1px solid rgba(37,99,235,0.25)' }}
                    onClick={() => handleEditClick(c)}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.25)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.12)')}
                  >Edit</button>
                  <button
                    style={{ ...styles.actionLink, background: 'rgba(239,68,68,0.08)', color: '#F87171', border: '1px solid rgba(239,68,68,0.25)' }}
                    onClick={() => handleDelete(c.currencyId, c.currencyCode)}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.18)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
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
