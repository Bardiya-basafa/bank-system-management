import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteAccount } from "../../api/accountApi";

const fs: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0A1628', fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  backLink: { display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#94A3B8', textDecoration: 'none', fontSize: '13px', marginBottom: '40px', alignSelf: 'flex-start', transition: 'color 0.15s' },
  card: { background: '#112240', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '16px', padding: '48px', maxWidth: '480px', width: '100%', textAlign: 'center' },
  iconWrap: { width: '64px', height: '64px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 24px' },
  h1: { fontSize: '22px', fontWeight: 700, color: '#F1F5F9', margin: '0 0 12px' },
  desc: { fontSize: '14px', color: '#94A3B8', lineHeight: '1.7', margin: '0 0 8px' },
  accountBadge: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '8px 16px', color: '#F87171', fontSize: '14px', fontFamily: 'monospace', fontWeight: 600, margin: '16px 0 32px' },
  divider: { height: '1px', background: '#1E3A5F', margin: '0 0 28px' },
  deleteBtn: { width: '100%', padding: '12px', background: '#DC2626', border: '1px solid rgba(220,38,38,0.5)', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', marginBottom: '12px' },
  cancelLink: { display: 'block', width: '100%', padding: '10px', background: 'transparent', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#94A3B8', fontSize: '14px', fontWeight: 500, textDecoration: 'none', textAlign: 'center', transition: 'all 0.15s' },
  successBanner: { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '14px 18px', color: '#34D399', fontSize: '14px', marginBottom: '20px', textAlign: 'left' },
  errorBanner: { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '14px 18px', color: '#F87171', fontSize: '14px', marginBottom: '20px', textAlign: 'left' },
};

export default function DeleteAccountPage() {
  const { id, aid } = useParams<{ id: string; aid: string }>();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleDelete = async () => {
    if (!aid) return;
    setIsDeleting(true);
    try {
      await deleteAccount(Number(aid));
      setBanner({ type: 'success', msg: 'Account deleted successfully.' });
      setTimeout(() => navigate(`/customer/${id}`), 1500);
    } catch {
      setBanner({ type: 'error', msg: 'Failed to delete account. Please try again.' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!aid) return <div style={{ ...fs.page, color: '#F87171' }}>Invalid Account ID.</div>;

  const backTo = `/customer/${id}`;

  return (
    <div style={fs.page}>
      <Link to={backTo} style={fs.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >← Back to Dashboard</Link>

      <div style={fs.card}>
        <div style={fs.iconWrap}>⚠️</div>
        <h1 style={fs.h1}>Close Account</h1>
        <p style={fs.desc}>
          You are about to permanently close and delete this account for Customer #{id}.
          This action <strong style={{ color: '#F87171' }}>cannot be undone</strong>.
        </p>

        <div style={fs.accountBadge}>🏦 Account #{aid}</div>

        {banner && (
          <div style={banner.type === 'success' ? fs.successBanner : fs.errorBanner}>
            {banner.type === 'success' ? '✓' : '✕'} {banner.msg}
          </div>
        )}

        <div style={fs.divider} />

        <button
          onClick={handleDelete}
          disabled={isDeleting || banner?.type === 'success'}
          style={{ ...fs.deleteBtn, opacity: (isDeleting || banner?.type === 'success') ? 0.7 : 1 }}
          onMouseEnter={e => !(isDeleting || banner?.type === 'success') && ((e.currentTarget as HTMLElement).style.background = '#B91C1C')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#DC2626')}
        >
          {isDeleting ? 'Closing account…' : 'Confirm — Close Account'}
        </button>

        <Link to={backTo} style={fs.cancelLink}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F1F5F9'; (e.currentTarget as HTMLElement).style.borderColor = '#94A3B8'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94A3B8'; (e.currentTarget as HTMLElement).style.borderColor = '#1E3A5F'; }}
        >Cancel</Link>
      </div>
    </div>
  );
}
