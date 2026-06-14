import React from 'react';
import { useState } from "react";
import { createStaff } from "../../api/staffApi";
import ErrorMessage from '../../components/common/ErrorMessage';

export default function CreateStaffPage() {

  const [form,setForm] = useState({
    firstName:"",
    lastName:"",
    ssn:"",
    email:"",
    phone:"",
    password:"",
    role:"employee",
    address:"",
    hireDate:"",
    terminationDate:null,
    branchId:1,
    status:"active"
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submit = async() => {

    try {

      const result =
        await createStaff(form);

      console.log(result.data);

      alert("Staff Created");

    }
    catch(error) {

      console.error(error);

      return <ErrorMessage message="Create Failed" />;

    }

  };

  return (

    <div>

      <h1>Create Staff</h1>

      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
      />

      <br />

      <input
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
      />

      <br />

      <input
        name="ssn"
        placeholder="SSN"
        onChange={handleChange}
      />

      <br />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <br />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />

      <br />

      <input
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <br />

      <input
        name="role"
        placeholder="Role"
        onChange={handleChange}
      />

      <br />

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />

      <br />

      <input
        type="date"
        name="hireDate"
        onChange={handleChange}
      />

      <br />

      <button onClick={submit}>
        Create Staff
      </button>

    </div>

  );
}