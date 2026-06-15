import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { getStaffById } from "../../api/staffApi";

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
    marginBottom: '32px',
  },
  eyebrow: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#38BDF8',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  },
  h1: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#F1F5F9',
    margin: 0,
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    maxWidth: '860px',
  },
  card: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    padding: '28px',
  },
  cardWide: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    padding: '28px',
    gridColumn: '1 / -1',
  },
  cardTitle: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    marginBottom: '20px',
    fontWeight: 600,
  },
  field: {
    marginBottom: '20px',
  },
  fieldLabel: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '1px',
    color: '#64748B',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  },
  fieldValue: {
    fontSize: '15px',
    color: '#F1F5F9',
    fontWeight: 500,
  },
  fieldValueMono: {
    fontSize: '15px',
    color: '#F1F5F9',
    fontWeight: 500,
    fontFamily: 'monospace',
  },
  divider: {
    height: '1px',
    background: '#1E3A5F',
    margin: '20px 0',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'currentColor',
    display: 'inline-block',
  },
  loadingState: {
    minHeight: '100vh',
    background: '#0A1628',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94A3B8',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    fontSize: '14px',
  },
};

function getStatusStyle(status: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    active: { background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' },
    inactive: { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.25)' },
    terminated: { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' },
  };
  return map[status?.toLowerCase()] ?? { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' };
}

function getRoleStyle(role: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    manager: { background: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.25)' },
    employee: { background: 'rgba(37,99,235,0.15)', color: '#60A5FA', border: '1px solid rgba(37,99,235,0.3)' },
  };
  return map[role?.toLowerCase()] ?? { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' };
}

export default function StaffDetailsPage() {
  const { id } = useParams();
  const [staff, setStaff] = useState<any>(null);

  useEffect(() => {
    getStaffById(Number(id))
      .then(res => setStaff(res.data.staff))
      .catch(console.error);
  }, [id]);

  if (!staff) return <div style={styles.loadingState}>Loading staff details…</div>;

  return (
    <div style={styles.page}>
      <Link to="/manager/staff" style={styles.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >
        ← Back to Staff
      </Link>

      <div style={styles.header}>
        <div style={styles.eyebrow}>Staff Profile</div>
        <h1 style={styles.h1}>
          {staff.firstName} {staff.lastName}
        </h1>
      </div>

      <div style={styles.layout}>
        {/* Identity card */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Identity</div>

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Staff ID</div>
            <div style={styles.fieldValueMono}>#{staff.staffId}</div>
          </div>

          <div style={styles.divider} />

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Email Address</div>
            <div style={styles.fieldValue}>{staff.email}</div>
          </div>

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Phone Number</div>
            <div style={styles.fieldValue}>{staff.phone}</div>
          </div>
        </div>

        {/* Role & Status card */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Employment</div>

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Role</div>
            <span style={{ ...styles.badge, ...getRoleStyle(staff.role) }}>
              {staff.role}
            </span>
          </div>

          <div style={styles.divider} />

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Status</div>
            <span style={{ ...styles.badge, ...getStatusStyle(staff.status) }}>
              <span style={styles.dot} />
              {staff.status}
            </span>
          </div>

          {staff.hireDate && (
            <>
              <div style={styles.divider} />
              <div style={styles.field}>
                <div style={styles.fieldLabel}>Hire Date</div>
                <div style={styles.fieldValue}>
                  {new Date(staff.hireDate).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Address card (full width) */}
        {staff.address && (
          <div style={styles.cardWide}>
            <div style={styles.cardTitle}>Address</div>
            <div style={styles.field}>
              <div style={styles.fieldValue}>{staff.address}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
