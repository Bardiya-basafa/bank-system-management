import React from 'react';
import { useState } from "react";
import { createAccount } from "../../api/accountApi";

export default function CreateAccountPage() {

  const [customerId,setCustomerId] = useState("");
  const [currencyId,setCurrencyId] = useState("1");
  const [accountType,setAccountType] = useState("saving");
  const [balance,setBalance] = useState("0");
  const [accountStatus,setAccountStatus] = useState("active");

  const submit = async() => {

    try {

      await createAccount(
        Number(customerId),
        {
          currencyId:Number(currencyId),
          accountType,
          balance:Number(balance),
          accountStatus
        }
      );

      alert("Account Created");

    } catch(error) {

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
        onChange={(e)=>setCustomerId(e.target.value)}
      />

      <br/>

      <input
        placeholder="Currency Id"
        value={currencyId}
        onChange={(e)=>setCurrencyId(e.target.value)}
      />

      <br/>

      <input
        placeholder="Account Type"
        value={accountType}
        onChange={(e)=>setAccountType(e.target.value)}
      />

      <br/>

      <input
        placeholder="Initial Balance"
        value={balance}
        onChange={(e)=>setBalance(e.target.value)}
      />

      <br/>

      <input
        placeholder="Status"
        value={accountStatus}
        onChange={(e)=>setAccountStatus(e.target.value)}
      />

      <br/>

      <button onClick={submit}>
        Create Account
      </button>

    </div>
  );
}