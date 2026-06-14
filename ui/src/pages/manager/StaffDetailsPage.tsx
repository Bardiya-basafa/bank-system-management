import React from 'react';
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getStaffById } from "../../api/staffApi";
import Loading from '../../components/common/Loading';


export default function StaffDetailsPage() {

  const { id } = useParams();

  const [staff,setStaff] = useState<any>(null);

  useEffect(() => {

    getStaffById(Number(id))
      .then(res => {

        setStaff(res.data.staff);

      })
      .catch(console.error);

  }, [id]);

  if (!staff)
    return <Loading />;

  return (

    <div>

      <h1>Staff Details</h1>

      <p>ID: {staff.staffId}</p>

      <p>Name:
        {staff.firstName}
        {" "}
        {staff.lastName}
      </p>

      <p>Email:
        {staff.email}
      </p>

      <p>Phone:
        {staff.phone}
      </p>

      <p>Role:
        {staff.role}
      </p>

      <p>Status:
        {staff.status}
      </p>

    </div>

  );
}