import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { getCustomerById } from "../../api/customerApi";
import Loading from '../../components/common/Loading';

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
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
  },
  divider: {
    height: '1px',
    background: '#1E3A5F',
    margin: '20px 0',
  },
  accountsBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'rgba(37,99,235,0.15)',
    color: '#60A5FA',
    border: '1px solid rgba(37,99,235,0.3)',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 500,
    marginTop: '8px',
    transition: 'all 0.15s',
  },
};

function getStatusStyle(status: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    active: { background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' },
    inactive: { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.25)' },
    suspended: { background: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.25)' },
  };
  return map[status?.toLowerCase()] ?? { background: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: '1px solid rgba(148,163,184,0.2)' };
}

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    getCustomerById(Number(id))
      .then(res => setCustomer(res.data))
      .catch(console.error);
  }, [id]);

  if (!customer) return <Loading />;

  return (
    <div style={styles.page}>
      <Link to="/employee/customers" style={styles.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >
        ← Back to Customers
      </Link>

      <div style={styles.header}>
        <div style={styles.eyebrow}>Customer Profile</div>
        <h1 style={styles.h1}>Customer Details</h1>
      </div>

      <div style={styles.layout}>
        {/* Identity card */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Identity</div>

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Customer ID</div>
            <div style={styles.fieldValueMono}>#{customer.customerId}</div>
          </div>

          <div style={styles.divider} />

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Email Address</div>
            <div style={styles.fieldValue}>{customer.email}</div>
          </div>

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Phone Number</div>
            <div style={styles.fieldValue}>{customer.phone}</div>
          </div>
        </div>

        {/* Status card */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Account Info</div>

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Customer Type</div>
            <div style={{ ...styles.statusBadge, ...{ background: 'rgba(37,99,235,0.12)', color: '#60A5FA', border: '1px solid rgba(37,99,235,0.25)' } }}>
              {customer.customerType}
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Status</div>
            <div style={{ ...styles.statusBadge, ...getStatusStyle(customer.status) }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'currentColor', display: 'inline-block'
              }} />
              {customer.status}
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.field}>
            <div style={styles.fieldLabel}>Bank Accounts</div>
            <Link
              to={`/employee/customer/${customer.customerId}/accounts`}
              style={styles.accountsBtn}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.15)')}
            >
              🏦 View Accounts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
