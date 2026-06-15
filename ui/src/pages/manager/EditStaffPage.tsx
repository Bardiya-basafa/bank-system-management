import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStaffById, updateStaff } from "../../api/staffApi";

const toBase64 = (str: string) => btoa(str);

export default function EditStaffPage() {
  const { id } = useParams<{ id: string }>();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [ssn, setSsn] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>(""); 
  const [role, setRole] = useState<string>("staff");
  const [address, setAddress] = useState<string>("");
  const [hireDate, setHireDate] = useState<string>("");
  const [terminationDate, setTerminationDate] = useState<string>("");
  const [branchId, setBranchId] = useState<number>(1);
  const [status, setStatus] = useState<string>("active");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  useEffect(() => {
    if (!id) return;

    getStaffById(Number(id))
      .then(res => {
        const data = res.data;
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        try { setSsn(data.ssn ? atob(data.ssn) : ""); } catch { setSsn(data.ssn || ""); }
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setRole(data.role || "staff");
        setAddress(data.address || "");
        setHireDate(formatDateForInput(data.hireDate));
        setTerminationDate(formatDateForInput(data.terminationDate));
        setBranchId(data.branchId || 1);
        setStatus(data.status || "active");
        
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch staff info:", err);
        alert("Could not load staff details.");
        setIsLoading(false);
      });
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSubmitting(true);

    try {
      const formattedHireDate = hireDate ? `${hireDate}T00:00:00` : "";
      const formattedTerminationDate = terminationDate ? `${terminationDate}T00:00:00` : null;

      await updateStaff({
        staffId: Number(id),
        firstName: firstName,
        lastName: lastName,
        ssn: toBase64(ssn),
        email: email,
        phone: phone,
        passwordHash: toBase64(password),
        role: role,
        address: address,
        hireDate: formattedHireDate,
        terminationDate: formattedTerminationDate,
        branchId: Number(branchId),
        status: status
      });

      alert("Staff profile successfully updated!");
    } catch (error) {
      console.error("Failed to update staff:", error);
      alert("Failed to update staff. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading staff details...</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <Link to={`/admin/staff`} style={{ textDecoration: "none", color: "#0275d8" }}>
        ← Back to Staff Directory
      </Link>

      <h1 style={{ marginBottom: "0.5rem" }}>Edit Staff Member</h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Updating records for <strong>Staff #{id}</strong>
      </p>

      <form onSubmit={submit} style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>

        <div style={{ flex: "1 1 45%" }}>
          <label>First Name:</label><br />
          <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Last Name:</label><br />
          <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>SSN (Raw Number):</label><br />
          <input type="text" required value={ssn} onChange={(e) => setSsn(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Email Address:</label><br />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Phone:</label><br />
          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>New Password (Required):</label><br />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ flex: "1 1 100%" }}>
          <label>Address:</label><br />
          <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ flex: "1 1 30%" }}>
          <label>Role:</label><br/>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: "100%", padding: "6px" }}>
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div style={{ flex: "1 1 30%" }}>
          <label>Branch ID:</label><br />
          <input type="number" required value={branchId} onChange={(e) => setBranchId(Number(e.target.value))} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ flex: "1 1 30%" }}>
          <label>Status:</label><br/>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: "100%", padding: "6px" }}>
            <option value="active">Active</option>
            <option value="on_leave">On Leave</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Hire Date:</label><br />
          <input type="date" required value={hireDate} onChange={(e) => setHireDate(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ flex: "1 1 45%" }}>
          <label>Termination Date (Optional):</label><br />
          <input type="date" value={terminationDate} onChange={(e) => setTerminationDate(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting || !id || !password}
          style={{ marginTop: "15px", padding: "10px", width: "100%", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          {isSubmitting ? "Saving..." : "Save Staff Changes"}
        </button>

      </form>
    </div>
  );
}