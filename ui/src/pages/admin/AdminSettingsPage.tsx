import React, { useState } from 'react';
import { api, updateBaseUrl, resetBaseUrl } from '../../api/client';

export default function AdminSettingsPage() {
  // Initialize state with whatever the current baseURL is
  const [currentUrl, setCurrentUrl] = useState<string>(api.defaults.baseURL as string);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure the URL is valid before saving
    if (!currentUrl.startsWith("http")) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    updateBaseUrl(currentUrl);
    alert(`Success! The app is now pointing to: ${currentUrl}`);
  };

  const handleReset = () => {
    resetBaseUrl();
    setCurrentUrl(api.defaults.baseURL as string);
    alert("Reset to default URL.");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1>System Settings</h1>
      <hr style={{ marginBottom: "2rem" }} />

      <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff8e1' }}>
        <h2 style={{ color: '#d35400', marginTop: 0 }}>API Connection Settings</h2>
        <p>
          Warning: Changing this URL will redirect all API calls for your current browser session. 
          Use this to point the dashboard to a staging or testing server.
        </p>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div>
            <label><strong>Target API Base URL:</strong></label><br/>
            <input 
              type="text" 
              required
              value={currentUrl} 
              onChange={(e) => setCurrentUrl(e.target.value)} 
              style={{ width: "100%", padding: "8px", marginTop: "5px", fontFamily: "monospace" }} 
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit" 
              style={{ padding: "8px 16px", backgroundColor: "#0275d8", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
            >
              Save Configuration
            </button>
            
            <button 
              type="button" 
              onClick={handleReset}
              style={{ padding: "8px 16px", backgroundColor: "#ccc", border: "none", borderRadius: "3px", cursor: "pointer" }}
            >
              Reset to Default
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}