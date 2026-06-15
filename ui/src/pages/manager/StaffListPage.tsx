import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getStaff, deleteStaff } from "../../api/staffApi";

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
  createBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 20px',
    background: '#2563EB',
    border: '1px solid rgba(37,99,235,0.5)',
    borderRadius: '8px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 600,
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
  tableTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#F1F5F9',
  },
  badge: {
    background: 'rgba(56,189,248,0.12)',
    color: '#38BDF8',
    fontSize: '11px',
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '20px',
    border: '1px solid rgba(56,189,248,0.25)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
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
  tdId: {
    padding: '14px 24px',
    fontSize: '13px',
    color: '#94A3B8',
    fontFamily: 'monospace',
    borderBottom: '1px solid rgba(30,58,95,0.5)',
  },
  actionLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    marginRight: '8px',
  },
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
    transition: 'all 0.15s ease',
    fontFamily: 'inherit',
  },
  roleBadge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize' as const,
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
  dot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'currentColor',
    display: 'inline-block',
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

function getRoleStyle(role: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    manager: { background: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.25)' },
    employee: { background: 'rgba(37,99,235,0.15)', color: '#60A5FA', border: '1px solid rgba(37,99,235,0.3)' },
  };
  return map[role?.toLowerCase()] ?? { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' };
}

function getStatusStyle(status: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    active: { background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' },
    inactive: { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.25)' },
    terminated: { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' },
  };
  return map[status?.toLowerCase()] ?? { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' };
}

export default function StaffListPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const remove = async (id: number) => {
    await deleteStaff(id);
    setStaff(prev => prev.filter(x => x.staffId !== id));
  };

  useEffect(() => {
    getStaff()
      .then(res => setStaff(res.data.staff))
      .catch(() => setError('Failed to load staff'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      <Link to="/manager" style={styles.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >
        ← Back to Dashboard
      </Link>

      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>Management</div>
          <h1 style={styles.h1}>Staff</h1>
        </div>
        <Link
          to="/manager/staff/create"
          style={styles.createBtn}
          onMouseEnter={e => (e.currentTarget.style.background = '#1D4ED8')}
          onMouseLeave={e => (e.currentTarget.style.background = '#2563EB')}
        >
          + Create Staff
        </Link>
      </div>

      {error && <div style={styles.errorBanner}>{error}</div>}

      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <span style={styles.tableTitle}>All Staff Members</span>
          <span style={styles.badge}>{staff.length} records</span>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              {['ID', 'Name', 'Role', 'Email', 'Phone', 'Status', 'Actions'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ ...styles.td, textAlign: 'center', color: '#94A3B8', padding: '40px' }}>
                  Loading staff…
                </td>
              </tr>
            ) : staff.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ ...styles.td, textAlign: 'center', padding: '60px', color: '#64748B' }}>
                  No staff members found.
                </td>
              </tr>
            ) : (
              staff.map(employee => (
                <tr
                  key={employee.staffId}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(30,58,95,0.4)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                  style={{ transition: 'background 0.15s' }}
                >
                  <td style={styles.tdId}>#{employee.staffId}</td>
                  <td style={{ ...styles.td, fontWeight: 500, color: '#F1F5F9' }}>
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.roleBadge, ...getRoleStyle(employee.role) }}>
                      {employee.role}
                    </span>
                  </td>
                  <td style={styles.td}>{employee.email}</td>
                  <td style={styles.td}>{employee.phone}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.statusBadge, ...getStatusStyle(employee.status) }}>
                      <span style={styles.dot} />
                      {employee.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <Link
                      to={`/manager/staff/${employee.staffId}`}
                      style={{
                        ...styles.actionLink,
                        background: 'rgba(37,99,235,0.12)',
                        color: '#60A5FA',
                        border: '1px solid rgba(37,99,235,0.25)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.25)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.12)')}
                    >
                      View
                    </Link>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => remove(employee.staffId)}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.18)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.5)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.25)';
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
