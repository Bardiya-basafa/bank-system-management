import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { api } from '../api/client';

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0A1628',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  container: {
    width: '100%',
    maxWidth: '420px',
  },
  logoArea: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  logoLabel: {
    fontSize: '10px',
    letterSpacing: '3px',
    color: '#38BDF8',
    textTransform: 'uppercase' as const,
    marginBottom: '10px',
  },
  logoTitle: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#F1F5F9',
    margin: 0,
  },
  logoSub: {
    fontSize: '13px',
    color: '#64748B',
    marginTop: '6px',
  },
  card: {
    background: '#112240',
    border: '1px solid #1E3A5F',
    borderRadius: '16px',
    padding: '40px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#F1F5F9',
    marginBottom: '6px',
  },
  cardSub: {
    fontSize: '13px',
    color: '#94A3B8',
    marginBottom: '32px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    marginBottom: '20px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#94A3B8',
    letterSpacing: '0.5px',
  },
  input: {
    background: '#0A1628',
    border: '1px solid #1E3A5F',
    borderRadius: '8px',
    padding: '11px 14px',
    color: '#F1F5F9',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  },
  divider: {
    height: '1px',
    background: '#1E3A5F',
    margin: '28px 0 24px',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    background: '#2563EB',
    border: '1px solid rgba(37,99,235,0.5)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
    letterSpacing: '0.3px',
  },
  errorBanner: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#F87171',
    fontSize: '13px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  footer: {
    textAlign: 'center' as const,
    marginTop: '24px',
    fontSize: '12px',
    color: '#475569',
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#2563EB';
    e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#1E3A5F';
    e.target.style.boxShadow = 'none';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('jwt', token);

      const decoded: any = jwtDecode(token);
      const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role;
      const roles = (Array.isArray(userRole) ? userRole : [userRole]).map((r: any) => String(r).toLowerCase());

      if (roles.includes('admin')) navigate('/admin');
      else if (roles.includes('manager')) navigate('/manager');
      else if (roles.includes('employee')) navigate('/employee');
      else if (roles.includes('customer')) {
        const customerId = decoded.customerId || decoded.sub || decoded.nameid;
        navigate(customerId ? `/customer/${customerId}` : '/');
      } else navigate('/');
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.logoArea}>
          <div style={styles.logoLabel}>Banking System</div>
          <h1 style={styles.logoTitle}>Welcome Back</h1>
          <p style={styles.logoSub}>Sign in to access your portal</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>Sign In</div>
          <div style={styles.cardSub}>Enter your credentials to continue</div>

          {error && (
            <div style={styles.errorBanner}>
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={styles.input}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={styles.input}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            <div style={styles.divider} />

            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.submitBtn, opacity: loading ? 0.75 : 1 }}
              onMouseEnter={e => !loading && ((e.currentTarget as HTMLElement).style.background = '#1D4ED8')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#2563EB')}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <div style={styles.footer}>
          Secure login · All sessions are encrypted
        </div>
      </div>
    </div>
  );
}
