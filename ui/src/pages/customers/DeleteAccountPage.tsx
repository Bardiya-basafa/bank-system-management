import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { deleteAccount } from "../../api/accountApi";

export default function DeleteAccountPage() {
  const { id, aid } = useParams<{ id: string; aid: string }>();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!aid) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete Account #${aid}? This action cannot be undone.`
    );
    
    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      await deleteAccount(Number(aid));
      alert("Account successfully deleted!"); 
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!aid) return <div>Invalid Account ID</div>;

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <Link to={`/client/${id}`}>← Back to Profile</Link>

      <h1 style={{ color: "#d9534f" }}>Delete Account</h1>
      
      <p>
        You are about to permanently close and delete 
        <strong> Account #{aid}</strong> for Client #{id}.
      </p>

      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        style={{ 
          marginTop: "10px", 
          padding: "8px", 
          backgroundColor: "#d9534f", 
          color: "white", 
          border: "none", 
          cursor: "pointer",
          width: "100%"
        }}
      >
        {isDeleting ? "Deleting..." : "Confirm Deletion"}
      </button>
    </div>
  );
}