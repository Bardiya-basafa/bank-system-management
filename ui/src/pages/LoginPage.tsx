import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { api } from '../api/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/auth/login', { email, password });
      const token = response.data.token;
      
      localStorage.setItem('jwt', token);

      const decodedToken: any = jwtDecode(token);
      const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodedToken.role;
      const rolesArray = (Array.isArray(userRole) ? userRole : [userRole]).map(r => String(r).toLowerCase());

      if (rolesArray.includes('admin')) navigate('/admin');
      else if (rolesArray.includes('manager')) navigate('/manager');
      else if (rolesArray.includes('employee')) navigate('/employee');
      else if (rolesArray.includes('customer')) navigate('/'); 
      else navigate('/');

    } catch (err: any) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #1E3A5F', borderRadius: '8px', background: '#112240', color: '#F1F5F9' }}>
      <h2 style={{ marginBottom: '20px' }}>System Login</h2>
      {error && <div style={{ color: '#F87171', marginBottom: '15px' }}>{error}</div>}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#94A3B8' }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #1E3A5F', background: '#0A1628', color: 'white' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#94A3B8' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #1E3A5F', background: '#0A1628', color: 'white' }} />
        </div>
        <button type="submit" style={{ padding: '12px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>Login</button>
      </form>
    </div>
  );
}