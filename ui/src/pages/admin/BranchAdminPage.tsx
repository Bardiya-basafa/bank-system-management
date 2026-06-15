import React, { useEffect, useState } from 'react';
import { getBranches, createBranch, deleteBranch } from "../../api/branchApi";
import DataTable from '../../components/common/DataTable';

export default function BranchAdminPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form State
  const [branchCode, setBranchCode] = useState<string>("");
  const [branchName, setBranchName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [establishDate, setEstablishDate] = useState<string>("");
  const [status, setStatus] = useState<string>("active");
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadBranches = async () => {
    try {
      const res = await getBranches();
      setBranches(res.data.branches);
    } catch (error) {
      console.error("Failed to load branches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const handleCreateBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedDate = `${establishDate}T00:00:00`;

      await createBranch({
        branchCode,
        branchName,
        city,
        address,
        establishDate: formattedDate,
        status
      });

      alert("Branch successfully added!");

      setBranchCode("");
      setBranchName("");
      setCity("");
      setAddress("");
      setEstablishDate("");
      setStatus("active");

      await loadBranches();
    } catch (error) {
      console.error("Failed to create branch:", error);
      alert("Failed to create branch. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // NEW: Handle Deletion
  const handleDeleteBranch = async (id: number, code: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete branch ${code}?`);
    if (!confirmDelete) return;

    try {
      await deleteBranch(id);
      alert(`Branch ${code} deleted successfully.`);
      await loadBranches(); // Refresh the table
    } catch (error) {
      console.error("Failed to delete branch:", error);
      alert("Failed to delete branch. It might have active staff or accounts tied to it.");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  if (loading) return <div>Loading branches...</div>;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1rem" }}>
      <h1>Branch Directory</h1>
      <hr style={{ marginBottom: "2rem" }} />

      {/* --- ADD NEW BRANCH SECTION --- */}
      <h2>Register New Branch</h2>
      <form 
        onSubmit={handleCreateBranch} 
        style={{ 
          padding: '1rem', 
          border: '1px solid #ddd', 
          borderRadius: '4px', 
          display: 'flex', 
          gap: '15px', 
          alignItems: 'flex-end', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ flex: 1, minWidth: '120px' }}>
          <label>Branch Code</label><br/>
          <input type="text" required placeholder="e.g. BR16" value={branchCode} onChange={(e) => setBranchCode(e.target.value.toUpperCase())} style={{ width: "100%", padding: "4px" }} />
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>
          <label>Branch Name</label><br/>
          <input type="text" required placeholder="e.g. Central" value={branchName} onChange={(e) => setBranchName(e.target.value)} style={{ width: "100%", padding: "4px" }} />
        </div>

        <div style={{ flex: 1, minWidth: '120px' }}>
          <label>City</label><br/>
          <input type="text" required placeholder="e.g. Tabriz" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: "100%", padding: "4px" }} />
        </div>

        <div style={{ flex: 2, minWidth: '200px' }}>
          <label>Address</label><br/>
          <input type="text" required placeholder="e.g. Ferdowsi St" value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: "4px" }} />
        </div>

        <div style={{ flex: 1, minWidth: '140px' }}>
          <label>Establish Date</label><br/>
          <input type="date" required value={establishDate} onChange={(e) => setEstablishDate(e.target.value)} style={{ width: "100%", padding: "4px" }} />
        </div>

        <div style={{ flex: 1, minWidth: '100px' }}>
          <label>Status</label><br/>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: "100%", padding: "5px" }}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="closing">Closing</option>
          </select>
        </div>

        <div style={{ minWidth: '120px', width: '100%' }}>
          <button type="submit" disabled={isSubmitting} style={{ padding: "8px 12px", width: "100%", backgroundColor: "#0275d8", color: "white", border: "none", cursor: "pointer", borderRadius: "3px" }}>
            {isSubmitting ? "Adding..." : "Add Branch"}
          </button>
        </div>
      </form>

      {/* --- BRANCH LIST SECTION --- */}
      <h2>Active Branches</h2>
      {branches.length === 0 ? (
        <p>No branches found.</p>
      ) : (
        <DataTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Established</th>
              <th>Status</th>
              <th>Actions</th> {/* NEW COLUMN HEADER */}
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.branchId}>
                <td>{branch.branchId}</td>
                <td><strong>{branch.branchCode}</strong></td>
                <td>{branch.branchName}</td>
                <td>{branch.city}</td>
                <td>{branch.address}</td>
                <td>{formatDate(branch.establishDate)}</td>
                <td>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "12px", 
                    backgroundColor: branch.status === "active" ? "#d4edda" : "#f8d7da",
                    color: branch.status === "active" ? "#155724" : "#721c24",
                    fontSize: "0.9em"
                  }}>
                    {branch.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  {/* NEW DELETE BUTTON */}
                  <button 
                    onClick={() => handleDeleteBranch(branch.branchId, branch.branchCode)}
                    style={{ 
                      padding: "4px 8px", 
                      backgroundColor: "#d9534f", 
                      color: "white", 
                      border: "none", 
                      borderRadius: "3px", 
                      cursor: "pointer" 
                    }}
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