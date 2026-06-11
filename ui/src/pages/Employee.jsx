import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const user = {
  name: "Bardyia Omidi",
  accountNumber: "0123-4567-8910",
  balance: 120000000.0,
  branch: "Central Branch",
  Shift: "8 AM - 4 PM",
  Salary: "75000000",
  Level: "Junior"
};

const requests = [
  {
    id: 1,
    type: "Open Account",
    accountNumber: "2589-4578-1423",
    status: "Pending"
  },
  {
    id: 2,
    type: "Transfer of Ownership",
    accountNumber: "1458-3654-1478",
    status: "Accepted"
  },
];

const customers = [
  {
    id: 1,
    name: "Ali Ahmadi",
    account: "5632-1478",
    status: "Active"
  },
  {
    id: 2,
    name: "Sarah Rahimi",
    account: "1478-2369",
    status: "Frozen"
  },
];

const schedules = [
  {
    id: 1,
    day: "Monday",
    shift: "8 AM - 4 PM",
    status: "Present"
  },
  {
    id: 2,
    day: "Tuesday",
    shift: "12 PM - 8 PM",
    status: "Pending"
  },
];

export default function EmployeeDashboard() {
  const [section, setSection] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">

      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-xl font-bold mb-10">
          Employee Panel
        </h1>

        <nav className="space-y-2">
          {["Dashboard", "Customers", "Requests", "Schedule", "Profile"].map((item) => (
            <button
              key={item}
              onClick={() => setSection(item)}
              className={`w-full text-left px-4 py-3 rounded-xl transition ${
                section === item
                  ? "bg-slate-800"
                  : "hover:bg-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition mt-6"
          >
          Logout
        </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">

        {section === "Dashboard" && (
          <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8">
            <h2 className="text-xl">
              Khosh omadi!, {user.name}
            </h2>

            <p>
              Branch: {user.branch}
            </p>

            <p>
              Shift: {user.Shift}
            </p>

            <p>
              Account: {user.accountNumber}
            </p>

            <div className="mt-6">
              <p>Current Balance</p>

              <h3 className="text-4xl font-bold">
                {user.balance}
              </h3>
            </div>
          </div>
        )}

        {section === "Customers" && (
          <div className="grid md:grid-cols-2 gap-6">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white rounded-2xl p-6 shadow"
              >
                <div className="flex justify-between">
                  <h4>
                    Customer: {customer.name}
                  </h4>

                  <span>
                    Account: {customer.account}
                  </span>
                </div>

                <p className="mt-6">
                  Status: {customer.status}
                </p>
              </div>
            ))}
          </div>
        )}

        {section === "Requests" && (
          <div className="grid md:grid-cols-2 gap-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-2xl p-6 shadow"
              >
                <div className="flex justify-between">
                  <h4>
                    Request Type: {request.type}
                  </h4>

                  <span>
                    Account Number: {request.accountNumber}
                  </span>
                </div>

                <p className="mt-6">
                  {request.status}
                </p>
              </div>
            ))}
          </div>
        )}

        {section === "Schedule" && (
          <div className="grid md:grid-cols-2 gap-6">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-white rounded-2xl p-6 shadow"
              >
                <div className="flex justify-between">
                  <h4>
                    Day: {schedule.day}
                  </h4>

                  <span>
                    Shift: {schedule.shift}
                  </span>
                </div>

                <p className="mt-6">
                  Status: {schedule.status}
                </p>
              </div>
            ))}
          </div>
        )}

        {section === "Profile" && (
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4">
              Profile
            </h2>

            <p>Name: {user.name}</p>
            <p>Account: {user.accountNumber}</p>
            <p>Branch: {user.branch}</p>
            <p>Shift: {user.Shift}</p>
            <p>Salary: {user.Salary}</p>
            <p>Level: {user.Level}</p>
          </div>
        )}

      </main>
    </div>
  );
}