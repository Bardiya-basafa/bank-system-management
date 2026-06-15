import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api, updateBaseUrl, resetBaseUrl } from '../../api/client';

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
  header: { marginBottom: '36px' },
  eyebrow: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#F87171',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  },
  h1: { fontSize: '26px', fontWeight: 700, color: '#F1F5F9', margin: 0 },
  warningCard: {
    background: 'rgba(248,113,113,0.07)',
    border: '1px solid rgba(248,113,113,0.3)',
    borderRadius: '12px',
    padding: '20px 24px',
    marginBottom: '28px',
    maxWidth: '600px',
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
  },
  warningIcon: { fontSize: '20px', flexShrink: 0, marginTop: '1px' },
  warningTitle: { fontSize: '13px', fontWeight: 700, color: '#F87171', marginBottom: '6px' },
  warningText: { fontSize: '13px', color: '#FCA5A5', lineHeight: '1.6', margin: 0 },
  formCard: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    padding: '36px',
    maxWidth: '600px',
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
  field: { display: 'flex', flexDirection: 'column' as const, gap: '6px', marginBottom: '24px' },
  label: { fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px' },
  input: {
    background: '#0A1628',
    border: '1px solid #1E3A5F',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#F1F5F9',
    fontSize: '14px',
    fontFamily: 'monospace',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.15s',
  },
  hint: { fontSize: '12px', color: '#64748B', marginTop: '4px' },
  divider: { height: '1px', background: '#1E3A5F', margin: '8px 0 24px' },
  footer: { display: 'flex', justifyContent: 'flex-end', gap: '12px' },
  resetBtn: {
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
  saveBtn: {
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
  successBanner: {
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    borderRadius: '8px',
    padding: '14px 18px',
    color: '#34D399',
    fontSize: '14px',
    marginBottom: '24px',
    maxWidth: '600px',
  },
  errorBanner: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '8px',
    padding: '14px 18px',
    color: '#F87171',
    fontSize: '14px',
    marginBottom: '24px',
    maxWidth: '600px',
  },
};

export default function AdminSettingsPage() {
  const [currentUrl, setCurrentUrl] = useState<string>(api.defaults.baseURL as string);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUrl.startsWith('http')) {
      setBanner({ type: 'error', msg: 'Invalid URL. Must start with http:// or https://' });
      return;
    }
    updateBaseUrl(currentUrl);
    setBanner({ type: 'success', msg: `API now pointing to: ${currentUrl}` });
  };

  const handleReset = () => {
    resetBaseUrl();
    setCurrentUrl(api.defaults.baseURL as string);
    setBanner({ type: 'success', msg: 'API URL reset to default.' });
  };

  return (
    <div style={styles.page}>
      <Link to="/admin" style={styles.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >
        ← Back to Dashboard
      </Link>

      <div style={styles.header}>
        <div style={styles.eyebrow}>Administration</div>
        <h1 style={styles.h1}>System Settings</h1>
      </div>

      {banner && (
        <div style={banner.type === 'success' ? styles.successBanner : styles.errorBanner}>
          {banner.type === 'success' ? '✓' : '✕'} {banner.msg}
        </div>
      )}

      <div style={styles.warningCard}>
        <div style={styles.warningIcon}>⚠️</div>
        <div>
          <div style={styles.warningTitle}>Caution: Connection Settings</div>
          <p style={styles.warningText}>
            Changing the API base URL redirects all requests for your current browser session.
            Use this to target a staging or testing server. Incorrect values will break the app.
          </p>
        </div>
      </div>

      <div style={styles.formCard}>
        <div style={styles.formSectionLabel}>API Connection</div>
        <form onSubmit={handleSave}>
          <div style={styles.field}>
            <label style={styles.label}>Target API Base URL</label>
            <input
              style={styles.input}
              type="text"
              required
              value={currentUrl}
              onChange={e => setCurrentUrl(e.target.value)}
              onFocus={e => { e.target.style.borderColor = '#F87171'; e.target.style.boxShadow = '0 0 0 3px rgba(248,113,113,0.15)'; }}
              onBlur={e => { e.target.style.borderColor = '#1E3A5F'; e.target.style.boxShadow = 'none'; }}
            />
            <span style={styles.hint}>Changes apply immediately for this session only.</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.footer}>
            <button type="button" style={styles.resetBtn} onClick={handleReset}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F1F5F9'; (e.currentTarget as HTMLElement).style.borderColor = '#94A3B8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94A3B8'; (e.currentTarget as HTMLElement).style.borderColor = '#1E3A5F'; }}
            >Reset to Default</button>
            <button type="submit" style={styles.saveBtn}
              onMouseEnter={e => (e.currentTarget.style.background = '#FCA5A5')}
              onMouseLeave={e => (e.currentTarget.style.background = '#F87171')}
            >Save Configuration</button>
          </div>
        </form>
      </div>
    </div>
  );
}
