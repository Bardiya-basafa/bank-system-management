import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerById } from "../../api/customerApi";
import Loading from '../../components/common/Loading';


export default function CustomerDetailsPage() {

  const { id } = useParams();

  const [customer,setCustomer] = useState<any>(null);

  useEffect(() => {
    getCustomerById(Number(id))
      .then(res => setCustomer(res.data))
      .catch(console.error);
  }, [id]);

  if (!customer)
    return <Loading />;

  return (
    <div>

      <h1>Customer Details</h1>

      <p>ID: {customer.customerId}</p>

      <p>Email: {customer.email}</p>

      <p>Phone: {customer.phone}</p>

      <p>Type: {customer.customerType}</p>

      <p>Status: {customer.status}</p>

    </div>
  );
}