import React, { useEffect, useState } from 'react';
import { getCurrencies, createCurrency, updateCurrency, deleteCurrency } from "../../api/currencyApi";
import DataTable from '../../components/common/DataTable';

export default function CurrencyAdminPage() {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currencyCode, setCurrencyCode] = useState<string>("");
  const [currencyName, setCurrencyName] = useState<string>("");
  const [currencySymbol, setCurrencySymbol] = useState<string>("");
  const [isForeign, setIsForeign] = useState<boolean>(true);
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadCurrencies = async () => {
    try {
      const res = await getCurrencies();
      setCurrencies(res.data);
    } catch (error) {
      console.error("Failed to load currencies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrencies();
  }, []);

  // Reset form to default empty state
  const resetForm = () => {
    setEditingId(null);
    setCurrencyCode("");
    setCurrencyName("");
    setCurrencySymbol("");
    setIsForeign(true);
  };

  // Populate form when Edit is clicked
  const handleEditClick = (currency: any) => {
    setEditingId(currency.currencyId);
    setCurrencyCode(currency.currencyCode);
    setCurrencyName(currency.currencyName);
    setCurrencySymbol(currency.currencySymbol);
    setIsForeign(currency.isForeign);
    
    // Smooth scroll to the form at the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle both Create and Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        // UPDATE MODE
        await updateCurrency({ 
          currencyId: editingId, 
          currencyCode, 
          currencyName, 
          currencySymbol, 
          isForeign 
        });
        alert("Currency successfully updated!");
      } else {
        // CREATE MODE
        await createCurrency({ 
          currencyCode, 
          currencyName, 
          currencySymbol, 
          isForeign 
        });
        alert("Currency successfully added!");
      }
      
      resetForm();
      await loadCurrencies();

    } catch (error) {
      console.error("Failed to save currency:", error);
      alert("Failed to save currency. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCurrency = async (id: number, code: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the ${code} currency?`);
    if (!confirmDelete) return;

    try {
      await deleteCurrency(id);
      alert(`${code} deleted successfully.`);
      
      // If the user deletes the currency they are currently editing, reset the form
      if (editingId === id) resetForm();
      
      await loadCurrencies(); 
    } catch (error) {
      console.error("Failed to delete currency:", error);
      alert("Failed to delete currency. It might be in use.");
    }
  };

  if (loading) return <div>Loading currencies...</div>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem" }}>
      <h1>Currency Management</h1>
      <hr style={{ marginBottom: "2rem" }} />

      {/* --- SMART FORM (Handles both Add & Edit) --- */}
      <h2>{editingId ? `Edit Currency #${editingId}` : "Add New Currency"}</h2>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          padding: '1rem', 
          border: editingId ? '2px solid #0275d8' : '1px solid #ddd', 
          backgroundColor: editingId ? '#f7fbfc' : 'transparent',
          borderRadius: '4px', 
          display: 'flex', 
          gap: '15px', 
          alignItems: 'flex-end', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ flex: 1, minWidth: '100px' }}>
          <label>Code</label><br/>
          <input type="text" required maxLength={5} value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value.toUpperCase())} style={{ width: "100%", padding: "4px" }} />
        </div>

        <div style={{ flex: 2, minWidth: '150px' }}>
          <label>Name</label><br/>
          <input type="text" required value={currencyName} onChange={(e) => setCurrencyName(e.target.value)} style={{ width: "100%", padding: "4px" }} />
        </div>

        <div style={{ flex: 1, minWidth: '80px' }}>
          <label>Symbol</label><br/>
          <input type="text" required value={currencySymbol} onChange={(e) => setCurrencySymbol(e.target.value)} style={{ width: "100%", padding: "4px" }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', paddingBottom: '4px' }}>
          <input type="checkbox" id="foreignCheck" checked={isForeign} onChange={(e) => setIsForeign(e.target.checked)} />
          <label htmlFor="foreignCheck" style={{ cursor: "pointer" }}>Is Foreign?</label>
        </div>

        <div style={{ display: 'flex', gap: '5px', minWidth: '120px' }}>
          <button type="submit" disabled={isSubmitting || !currencyCode || !currencyName || !currencySymbol} style={{ padding: "6px 12px", flex: 1 }}>
            {isSubmitting ? "Saving..." : (editingId ? "Update" : "Add")}
          </button>
          
          {/* Show cancel button only if editing */}
          {editingId && (
            <button type="button" onClick={resetForm} style={{ padding: "6px 12px", backgroundColor: "#ccc", border: "none", cursor: "pointer" }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* --- CURRENCY LIST SECTION --- */}
      <h2>Available Currencies</h2>
      {currencies.length === 0 ? (
        <p>No currencies found.</p>
      ) : (
        <DataTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Foreign?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency.currencyId}>
                <td>{currency.currencyId}</td>
                <td><strong>{currency.currencyCode}</strong></td>
                <td>{currency.currencyName}</td>
                <td>{currency.currencySymbol}</td>
                <td>{currency.isForeign ? "Yes" : "No"}</td>
                <td>
                  <button 
                    onClick={() => handleEditClick(currency)}
                    style={{ padding: "4px 8px", marginRight: "5px", backgroundColor: "#0275d8", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCurrency(currency.currencyId, currency.currencyCode)}
                    style={{ padding: "4px 8px", backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      )}
    </div>
  );
}