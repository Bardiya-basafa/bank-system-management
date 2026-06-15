import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createStaff } from "../../api/staffApi";

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
    marginBottom: '36px',
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
  formCard: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '12px',
    padding: '36px',
    maxWidth: '680px',
  },
  formSection: {
    marginBottom: '28px',
  },
  sectionLabel: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    fontWeight: 600,
    marginBottom: '16px',
    paddingBottom: '10px',
    borderBottom: '1px solid #1E3A5F',
  },
  fieldGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  fieldFull: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    gridColumn: '1 / -1',
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#94A3B8',
    letterSpacing: '0.5px',
  },
  requiredStar: {
    color: '#F87171',
    marginLeft: '2px',
  },
  input: {
    background: '#0A1628',
    border: '1px solid #1E3A5F',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#F1F5F9',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
    width: '100%',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
  },
  select: {
    background: '#0A1628',
    border: '1px solid #1E3A5F',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#F1F5F9',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
    width: '100%',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    cursor: 'pointer',
    appearance: 'none' as const,
  },
  divider: {
    height: '1px',
    background: '#1E3A5F',
    margin: '28px 0',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px',
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
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.15s',
    fontFamily: 'inherit',
  },
  submitBtn: {
    padding: '10px 28px',
    background: '#2563EB',
    border: '1px solid rgba(37,99,235,0.5)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontFamily: 'inherit',
  },
  successBanner: {
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    borderRadius: '8px',
    padding: '14px 18px',
    color: '#34D399',
    fontSize: '14px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  errorBanner: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '8px',
    padding: '14px 18px',
    color: '#F87171',
    fontSize: '14px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
};

const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = '#2563EB';
  e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)';
};
const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = '#1E3A5F';
  e.target.style.boxShadow = 'none';
};

export default function CreateStaffPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    email: '',
    phone: '',
    password: '',
    role: 'employee',
    address: '',
    hireDate: '',
    terminationDate: null as string | null,
    branchId: 1,
    status: 'active',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.firstName || !form.lastName || !form.email) {
      setStatus('error');
      return;
    }
    setLoading(true);
    try {
      await createStaff(form);
      setStatus('success');
      setForm({
        firstName: '', lastName: '', ssn: '', email: '', phone: '',
        password: '', role: 'employee', address: '', hireDate: '',
        terminationDate: null, branchId: 1, status: 'active',
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Link to="/manager/staff" style={styles.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >
        ← Back to Staff
      </Link>

      <div style={styles.header}>
        <div style={styles.eyebrow}>Staff Management</div>
        <h1 style={styles.h1}>Create Staff Member</h1>
      </div>

      {status === 'success' && (
        <div style={styles.successBanner}>✓ Staff member created successfully.</div>
      )}
      {status === 'error' && (
        <div style={styles.errorBanner}>✕ Please fill in all required fields.</div>
      )}

      <div style={styles.formCard}>
        {/* Personal Info */}
        <div style={styles.formSection}>
          <div style={styles.sectionLabel}>Personal Information</div>
          <div style={styles.fieldGroup}>

            <div style={styles.field}>
              <label style={styles.label}>
                First Name <span style={styles.requiredStar}>*</span>
              </label>
              <input
                style={styles.input}
                name="firstName"
                placeholder="e.g. Jane"
                value={form.firstName}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Last Name <span style={styles.requiredStar}>*</span>
              </label>
              <input
                style={styles.input}
                name="lastName"
                placeholder="e.g. Smith"
                value={form.lastName}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>SSN</label>
              <input
                style={{ ...styles.input, fontFamily: 'monospace' }}
                name="ssn"
                placeholder="XXX-XX-XXXX"
                value={form.ssn}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Phone</label>
              <input
                style={styles.input}
                name="phone"
                placeholder="e.g. +1 555-0100"
                value={form.phone}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            <div style={styles.fieldFull}>
              <label style={styles.label}>Address</label>
              <input
                style={styles.input}
                name="address"
                placeholder="Street, City, State, ZIP"
                value={form.address}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

          </div>
        </div>

        <div style={styles.divider} />

        {/* Account Details */}
        <div style={styles.formSection}>
          <div style={styles.sectionLabel}>Account Details</div>
          <div style={styles.fieldGroup}>

            <div style={styles.fieldFull}>
              <label style={styles.label}>
                Email Address <span style={styles.requiredStar}>*</span>
              </label>
              <input
                style={styles.input}
                name="email"
                placeholder="jane.smith@bank.com"
                value={form.email}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Role</label>
              <select
                style={styles.select}
                name="role"
                value={form.role}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select
                style={styles.select}
                name="status"
                value={form.status}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Hire Date</label>
              <input
                style={styles.input}
                type="date"
                name="hireDate"
                value={form.hireDate}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

          </div>
        </div>

        <div style={styles.divider} />

        <div style={styles.footer}>
          <Link to="/manager/staff" style={styles.cancelBtn}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#F1F5F9';
              (e.currentTarget as HTMLElement).style.borderColor = '#94A3B8';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = '#94A3B8';
              (e.currentTarget as HTMLElement).style.borderColor = '#1E3A5F';
            }}
          >
            Cancel
          </Link>
          <button
            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
            onClick={submit}
            disabled={loading}
            onMouseEnter={e => !loading && ((e.currentTarget as HTMLElement).style.background = '#1D4ED8')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#2563EB')}
          >
            {loading ? 'Creating…' : 'Create Staff Member'}
          </button>
        </div>
      </div>
    </div>
  );
}
