import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const manager = {
  name: "Ehsan Bordbar",
  branch: "Central Branch",
  managerId: "MG-0000",
  salary: "150000000",
  level: "Senior Manager",
};

const employees = [
  {
    id: 1,
    name: "Kian Kaveh",
    position: "Cashier",
    status: "Active",
  },
  {
    id: 2,
    name: "Aida Khojasteh",
    position: "Customer Service",
    status: "Suspended",
  },
];

const atms = [
  {
    id: 1,
    location: "Azadi Street",
    status: "Active",
  },
  {
    id: 2,
    location: "Mehrabad Airport Branch",
    status: "Offline",
  },
];

const poses = [
  {
    id: 1,
    merchant: "Tech Store",
    status: "Active",
  },
  {
    id: 2,
    merchant: "Hamvatam Market",
    status: "Inactive",
  },
];

const requests = [
  {
    id: 1,
    type: "Loan Approval",
    customer: "Ali Ahmadi",
    status: "Pending",
  },
  {
    id: 2,
    type: "Account Verification",
    customer: "Saba Mohammadi",
    status: "Approved",
  },
];

const reports = [
  {
    id: 1,
    title: "ATM Maintenance",
    date: "2026-04-10",
  },
  {
    id: 2,
    title: "Daily Transactions",
    date: "2026-05-10",
  }
];

export default function ManagerDashboard() {
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
          Manager Panel
        </h1>

        <nav className="space-y-2">
          {[
            "Dashboard",
            "Employees",
            "ATM Management",
            "POS Management",
            "Requests",
            "Reports",
            "Profile",
          ].map((item) => (
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
              Khosh omadi!, {manager.name}
            </h2>

            <p>
              Branch: {manager.branch}
            </p>

            <p>
              Manager ID: {manager.managerId}
            </p>

            <div className="mt-6">
              <p>Branch Status</p>

              <h3 className="text-4xl font-bold">
                Operational
              </h3>
            </div>
          </div>
        )}

        {section === "Employees" && (
          <div className="grid md:grid-cols-2 gap-6">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white rounded-2xl p-6 shadow"
              >
                <div className="flex justify-between">
                  <h4>
                    {employee.name}
                  </h4>

                  <span>
                    {employee.position}
                  </span>
                </div>

                <p className="mt-6">
                  Status: {employee.status}
                </p>
              </div>
            ))}
          </div>
        )}

        {section === "ATM Management" && (
          <div className="grid md:grid-cols-2 gap-6">
            {atms.map((atm) => (
              <div
                key={atm.id}
                className="bg-white rounded-2xl p-6 shadow"
              >
                <div className="flex justify-between">
                  <h4>
                    ATM #{atm.id}
                  </h4>

                  <span>
                    {atm.location}
                  </span>
                </div>

                <p className="mt-6">
                  Status: {atm.status}
                </p>
              </div>
            ))}
          </div>
        )}

        {section === "POS Management" && (
          <div className="grid md:grid-cols-2 gap-6">
            {poses.map((pos) => (
              <div
                key={pos.id}
                className="bg-white rounded-2xl p-6 shadow"
              >
                <div className="flex justify-between">
                  <h4>
                    POS #{pos.id}
                  </h4>

                  <span>
                    {pos.merchant}
                  </span>
                </div>

                <p className="mt-6">
                  Status: {pos.status}
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
                    {request.type}
                  </h4>

                  <span>
                    {request.customer}
                  </span>
                </div>

                <p className="mt-6">
                  Status: {request.status}
                </p>
              </div>
            ))}
          </div>
        )}

        {section === "Reports" && (
          <div className="grid md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl p-6 shadow"
              >
                <div className="flex justify-between">
                  <h4>
                    {report.title}
                  </h4>

                  <span>
                    {report.date}
                  </span>
                </div>

                <p className="mt-6">
                  Report ID: {report.id}
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

            <p>Name: {manager.name}</p>
            <p>Branch: {manager.branch}</p>
            <p>Manager ID: {manager.managerId}</p>
            <p>Salary: {manager.salary}</p>
            <p>Level: {manager.level}</p>
          </div>
        )}

      </main>
    </div>
  );
}