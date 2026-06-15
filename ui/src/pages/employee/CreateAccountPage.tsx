import React, { useState } from 'react';
import { clientcreateAccount } from "../../api/accountApi";

export default function CreateAccountPage() {
  const [customerId, setCustomerId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [currencyId, setCurrencyId] = useState("1");
  const [accountType, setAccountType] = useState("saving");
  const [balance, setBalance] = useState("0");
  const [accountStatus, setAccountStatus] = useState("active");

  const submit = async () => {
    if (!customerId || !accountNumber) {
      alert("Customer ID and Account Number are required.");
      return;
    }

    try {
      await clientcreateAccount(
        Number(customerId),
        {
          accountNumber,
          currencyId: Number(currencyId),
          accountType,
          balance: Number(balance),
          accountStatus
        }
      );

      alert("Account Created");

      setCustomerId("");
      setAccountNumber("");
      setBalance("0");

    } catch (error) {
      console.error(error);
      alert("Create Failed");
    }
  };

  return (
    <div>
      <h1>Create Account</h1>

      <input
        placeholder="Customer Id"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <br />

      <input
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <br />

      <input
        placeholder="Currency Id"
        value={currencyId}
        onChange={(e) => setCurrencyId(e.target.value)}
      />
      <br />

      <input
        placeholder="Account Type"
        value={accountType}
        onChange={(e) => setAccountType(e.target.value)}
      />
      <br />

      <input
        placeholder="Initial Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />
      <br />

      <input
        placeholder="Status"
        value={accountStatus}
        onChange={(e) => setAccountStatus(e.target.value)}
      />
      <br />

      <button onClick={submit}>
        Create Account
      </button>

    </div>
  );
}