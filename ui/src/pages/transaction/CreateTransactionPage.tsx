import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createTransaction } from "../../api/transactionApi";

const fs: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0A1628', fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: '48px' },
  backLink: { display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#94A3B8', textDecoration: 'none', fontSize: '13px', marginBottom: '24px', transition: 'color 0.15s' },
  header: { marginBottom: '36px' },
  eyebrow: { fontSize: '11px', letterSpacing: '2px', color: '#38BDF8', textTransform: 'uppercase' as const, marginBottom: '6px' },
  h1: { fontSize: '26px', fontWeight: 700, color: '#F1F5F9', margin: 0 },
  formCard: { background: '#112240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '36px', maxWidth: '600px' },
  sectionLabel: { fontSize: '11px', letterSpacing: '2px', color: '#94A3B8', textTransform: 'uppercase' as const, fontWeight: 600, marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #1E3A5F' },
  fieldGroup: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column' as const, gap: '6px' },
  fieldFull: { display: 'flex', flexDirection: 'column' as const, gap: '6px', gridColumn: '1 / -1' },
  label: { fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px' },
  star: { color: '#F87171', marginLeft: '2px' },
  input: { background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '10px 14px', color: '#F1F5F9', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' as const, fontFamily: 'inherit', transition: 'border-color 0.15s' },
  select: { background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '10px 14px', color: '#F1F5F9', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' as const, fontFamily: 'inherit', cursor: 'pointer', appearance: 'none' as const },
  divider: { height: '1px', background: '#1E3A5F', margin: '28px 0' },
  footer: { display: 'flex', justifyContent: 'flex-end', gap: '12px' },
  cancelBtn: { padding: '10px 24px', background: 'transparent', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#94A3B8', fontSize: '14px', fontWeight: 500, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', transition: 'all 0.15s' },
  submitBtn: { padding: '10px 28px', background: '#2563EB', border: '1px solid rgba(37,99,235,0.5)', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' },
  generateBtn: { background: 'rgba(56,189,248,0.1)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '8px', padding: '0 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' as const },
  successBanner: { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '14px 18px', color: '#34D399', fontSize: '14px', marginBottom: '24px', maxWidth: '600px' },
  errorBanner: { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '14px 18px', color: '#F87171', fontSize: '14px', marginBottom: '24px', maxWidth: '600px', lineHeight: '1.5' },
};

const fo = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)'; };
const bl = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => { e.target.style.borderColor = '#1E3A5F'; e.target.style.boxShadow = 'none'; };

export default function CreateTransactionPage() {
  const [referenceCode, setReferenceCode] = useState<string>("");
  const [sourceAccountId, setSourceAccountId] = useState<string>("");
  const [targetAccountId, setTargetAccountId] = useState<string>("");
  const [sourceDeviceId, setSourceDeviceId] = useState<string>("1");
  const [transactionType, setTransactionType] = useState<string>("transfer");
  const [amount, setAmount] = useState<string>("0.00");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const generateRefCode = () => {
    const randomNum = Math.floor(Math.random() * 1000000);
    setReferenceCode(`REF-${randomNum}`);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBanner(null);

    try {
      await createTransaction({
        referenceCode: referenceCode,
        sourceAccountId: Number(sourceAccountId),
        targetAccountId: Number(targetAccountId),
        sourceDeviceId: Number(sourceDeviceId),
        transactionType: transactionType,
        amount: Number(amount)
      });

      setBanner({ type: 'success', msg: 'Transaction successfully processed and recorded.' });

      setReferenceCode("");
      setSourceAccountId("");
      setTargetAccountId("");
      setAmount("0.00");
      
    } catch (error) {
      console.error("Failed to process transaction:", error);
      setBanner({ 
        type: 'error', 
        msg: 'Failed to process transaction. Please verify account IDs, ensure sufficient funds, and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={fs.page}>
      <Link to="/employee" style={fs.backLink}
        onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
        onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
      >← Back to Dashboard</Link>

      <div style={fs.header}>
        <div style={fs.eyebrow}>Transaction Operations</div>
        <h1 style={fs.h1}>Execute Transaction</h1>
      </div>

      {banner && (
        <div style={banner.type === 'success' ? fs.successBanner : fs.errorBanner}>
          {banner.type === 'success' ? '✓' : '✕'} {banner.msg}
        </div>
      )}

      <div style={fs.formCard}>
        <div style={fs.sectionLabel}>Transfer Details</div>
        <form onSubmit={submit}>
          
          <div style={fs.fieldGroup}>
            <div style={fs.fieldFull}>
              <label style={fs.label}>Reference Code <span style={fs.star}>*</span></label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  style={{ ...fs.input, fontFamily: 'monospace', flex: 1 }} 
                  type="text" 
                  required 
                  placeholder="e.g. REF-123456" 
                  value={referenceCode} 
                  onChange={e => setReferenceCode(e.target.value)} 
                  onFocus={fo} 
                  onBlur={bl} 
                />
                <button 
                  type="button" 
                  onClick={generateRefCode}
                  style={fs.generateBtn}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.2)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.1)'; }}
                >
                  Generate
                </button>
              </div>
            </div>

            <div style={fs.field}>
              <label style={fs.label}>Transaction Type</label>
              <select style={fs.select} value={transactionType} onChange={e => setTransactionType(e.target.value)} onFocus={fo} onBlur={bl}>
                <option value="transfer">Transfer</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="payment">Payment</option>
              </select>
            </div>

            <div style={fs.field}>
              <label style={fs.label}>Amount ($) <span style={fs.star}>*</span></label>
              <input style={{ ...fs.input, fontFamily: 'monospace', fontSize: '16px' }} type="number" step="0.01" required value={amount} onChange={e => setAmount(e.target.value)} onFocus={fo} onBlur={bl} />
            </div>

            <div style={fs.field}>
              <label style={fs.label}>Source Account ID <span style={fs.star}>*</span></label>
              <input style={{ ...fs.input, fontFamily: 'monospace' }} type="number" required placeholder="e.g. 1" value={sourceAccountId} onChange={e => setSourceAccountId(e.target.value)} onFocus={fo} onBlur={bl} />
            </div>

            <div style={fs.field}>
              <label style={fs.label}>Target Account ID <span style={fs.star}>*</span></label>
              <input style={{ ...fs.input, fontFamily: 'monospace' }} type="number" required placeholder="e.g. 2" value={targetAccountId} onChange={e => setTargetAccountId(e.target.value)} onFocus={fo} onBlur={bl} />
            </div>

            <div style={fs.fieldFull}>
              <label style={fs.label}>Source Device ID <span style={fs.star}>*</span></label>
              <input style={{ ...fs.input, fontFamily: 'monospace' }} type="number" required value={sourceDeviceId} onChange={e => setSourceDeviceId(e.target.value)} onFocus={fo} onBlur={bl} />
            </div>
          </div>

          <div style={fs.divider} />
          
          <div style={fs.footer}>
            <Link to="/employee" style={fs.cancelBtn}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F1F5F9'; (e.currentTarget as HTMLElement).style.borderColor = '#94A3B8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94A3B8'; (e.currentTarget as HTMLElement).style.borderColor = '#1E3A5F'; }}
            >Cancel</Link>
            
            <button type="submit" disabled={isSubmitting}
              style={{ ...fs.submitBtn, opacity: isSubmitting ? 0.7 : 1 }}
              onMouseEnter={e => !isSubmitting && ((e.currentTarget as HTMLElement).style.background = '#1D4ED8')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#2563EB')}
            >
              {isSubmitting ? 'Processing…' : 'Execute Transaction'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}