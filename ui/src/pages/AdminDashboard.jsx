import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const admin = {
  name: "Admin User",
  role: "System Administrator",
  branch: "Central Control",
};

const initialUsers = [
  {
    id: 1,
    name: "Asghar Asghari",
    account: "3315-1410",
    balance: "14,145,260",
    status: "Active",
  },
  {
    id: 2,
    name: "Morteza Rezaei",
    account: "8888-6666",
    balance: "15,181,000",
    status: "Active",
  },
];

const transactions = [
  {
    id: 1,
    user: "Asghae Asghari",
    type: "Transfer",
    amount: "250,000",
    status: "Completed",
  },
  {
    id: 2,
    user: "Morteza Rezaei",
    type: "Withdrawal",
    amount: "50,000",
    status: "Pending",
  },
];

const databaseInfo = [
  {
    id: 1,
    name: "Users Database",
    records: 320,
    status: "Healthy",
  },
  {
    id: 2,
    name: "Transactions Database",
    records: 1250,
    status: "Healthy",
  },
];

export default function AdminDashboard() {
  const [section, setSection] = useState("Dashboard");
  const [users, setUsers] = useState(initialUsers);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">

      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-xl font-bold mb-10">
          Admin Panel
        </h1>

        <nav className="space-y-2">
          {[
            "Dashboard",
            "Users",
            "Transactions",
            "Database",
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
          <>
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-semibold">
                System Overview
              </h2>

              <p className="opacity-80">
                Admin control center for banking system
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div>
                  <p className="text-sm opacity-80">
                    Total Users
                  </p>

                  <h3 className="text-2xl font-bold">
                    {users.length}
                  </h3>
                </div>

                <div>
                  <p className="text-sm opacity-80">
                    Active Accounts
                  </p>

                  <h3 className="text-2xl font-bold">
                    {
                      users.filter(
                        (u) => u.status === "Active"
                      ).length
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-sm opacity-80">
                    Blocked
                  </p>

                  <h3 className="text-2xl font-bold">
                    {
                      users.filter(
                        (u) => u.status === "Blocked"
                      ).length
                    }
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {users.slice(0, 2).map((u) => (
                <div
                  key={u.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">
                      {u.name}
                    </h3>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        u.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </div>

                  <p className="mt-4">
                    Account: {u.account}
                  </p>

                  <p>
                    Balance: {u.balance}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "Users" && (
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                User Management
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Account</th>
                    <th className="p-4">Balance</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="p-4">
                        {u.id}
                      </td>

                      <td className="p-4 font-medium">
                        {u.name}
                      </td>

                      <td className="p-4">
                        {u.account}
                      </td>

                      <td className="p-4">
                        {u.balance}
                      </td>

                      <td className="p-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            u.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>

                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() =>
                            toggleUserStatus(u.id)
                          }
                          className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                        >
                          Toggle
                        </button>

                        <button
                          onClick={() =>
                            deleteUser(u.id)
                          }
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </section>
        )}

        {section === "Transactions" && (
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                Transactions
              </h3>
            </div>

            <div className="space-y-4">
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className="border border-slate-200 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">
                      {t.user}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {t.type}
                    </p>
                  </div>

                  <div>
                    <p>{t.amount}</p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      t.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              ))}
            </div>

          </section>
        )}

        {section === "Database" && (
          <section className="grid md:grid-cols-2 gap-6">
            {databaseInfo.map((db) => (
              <div
                key={db.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    {db.name}
                  </h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    {db.status}
                  </span>
                </div>

                <p className="mt-6 text-slate-600">
                  Total Records
                </p>

                <p className="text-2xl font-bold mt-2">
                  {db.records}
                </p>

                <button className="mt-6 w-full border border-slate-300 py-2 rounded-xl hover:bg-slate-100 transition">
                  Manage Database
                </button>
              </div>
            ))}
          </section>
        )}

        {section === "Profile" && (
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4">
              Admin Profile
            </h2>

            <div className="space-y-3">
              <p>
                Name: {admin.name}
              </p>

              <p>
                Role: {admin.role}
              </p>

              <p>
                Branch: {admin.branch}
              </p>

              <p>
                System Access: Full Access
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}