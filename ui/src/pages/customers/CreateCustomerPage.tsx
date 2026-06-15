import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createCustomer } from "../../api/customerApi";

const hashToBase64 = async (plainText: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64String = btoa(String.fromCharCode(...hashArray));
  return base64String;
};

export default function CreateCustomerPage() {
  const [customerType, setCustomerType] = useState<string>("individual");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<string>("active");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const hashedPassword = await hashToBase64(password);

      await createCustomer({
        customerType: customerType,
        phone: phone,
        email: email,
        Password: hashedPassword, 
        status: status
      });

      alert("Customer successfully registered!");

      setPhone("");
      setEmail("");
      setPassword("");
      
    } catch (error) {
      console.error("Failed to create customer:", error);
      alert("Failed to create customer. Check your backend console for exact constraint errors (like duplicate emails).");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "0 auto", padding: "1rem" }}>
      <Link to={`/employee/customers`} style={{ textDecoration: "none", color: "#0275d8" }}>
        ← Back to Customer List
      </Link>

      <h1 style={{ marginBottom: "1.5rem" }}>Register New Customer</h1>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <div>
          <label>Customer Type:</label><br/>
          <select 
            value={customerType} 
            onChange={(e) => setCustomerType(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="individual">Individual</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>

        <div>
          <label>Email Address:</label><br />
          <input
            type="email"
            required
            placeholder="e.g. user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Phone Number:</label><br />
          <input
            type="tel"
            required
            placeholder="e.g. 09120000011"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            required
            placeholder="Enter secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Initial Status:</label><br/>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            marginTop: "10px", 
            padding: "12px", 
            backgroundColor: "#0275d8", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {isSubmitting ? "Registering..." : "Register Customer"}
        </button>

      </form>
    </div>
  );
}