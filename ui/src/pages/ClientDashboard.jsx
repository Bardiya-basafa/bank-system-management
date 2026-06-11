import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const user = {
  name: "Asghar Asghari",
  accountNumber: "1258-2580-9915",
  balance: 10256512,
  branch: "Central Branch",
  email: "asghar@example.com",
  phone: "+98 901 901 9001",
  level: "Premium Client",
};

const cards = [
  {
    id: 1,
    type: "White",
    number: "** ** 1290",
    status: "Active",
  },
  {
    id: 2,
    type: "Black",
    number: "** ** 8821",
    status: "Inactive",
  },
];

const loans = [
  {
    id: 1,
    amount: "50,000,000",
    status: "Pending",
  },
  {
    id: 2,
    amount: "120,000,000",
    status: "Approved",
  },
];

export default function ClientDashboard() {
  const [section, setSection] = useState("Dashboard");
  const [cardData, setCardData] = useState(cards);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleCardStatus = (id) => {
    setCardData((prev) =>
      prev.map((card) =>
        card.id === id
          ? {
              ...card,
              status:
                card.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : card
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">

      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-xl font-bold mb-10">
          Client Panel
        </h1>

        <nav className="space-y-2">
          {["Dashboard", "Cards", "Loans", "Profile"].map(
            (item) => (
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
            )
          )}
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
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg mb-8">
              <h2 className="text-xl">
                Khosh omadi!, {user.name}
              </h2>

              <p className="opacity-80">
                Account: {user.accountNumber}
              </p>

              <p className="opacity-80">
                Branch: {user.branch}
              </p>

              <div className="mt-6">
                <p className="text-sm opacity-80">
                  Current Balance
                </p>

                <h3 className="text-4xl font-bold">
                  {user.balance.toLocaleString()}
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex justify-between">
                    <h4 className="font-semibold">
                      {card.type}
                    </h4>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        card.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {card.status}
                    </span>
                  </div>

                  <p className="mt-6 tracking-widest text-slate-600">
                    {card.number}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "Cards" && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Cards
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex justify-between">
                    <h4 className="font-semibold">
                      {card.type}
                    </h4>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        card.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {card.status}
                    </span>
                  </div>

                  <p className="mt-6 tracking-widest text-slate-600">
                    {card.number}
                  </p>

                  <button
                    onClick={() =>
                      toggleCardStatus(card.id)
                    }
                    className="mt-6 w-full border border-slate-300 py-2 rounded-xl hover:bg-slate-100 transition"
                  >
                    Toggle Status
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {section === "Loans" && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Loan Requests
              </h3>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loans.map((loan) => (
                    <tr
                      key={loan.id}
                      className="border-t"
                    >
                      <td className="p-4">
                        {loan.id}
                      </td>

                      <td className="p-4">
                        {loan.amount}
                      </td>

                      <td className="p-4">
                        {loan.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {section === "Profile" && (
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4">
              Profile
            </h2>

            <div className="space-y-3">
              <p>
                Name: {user.name}
              </p>

              <p>
                Account: {user.accountNumber}
              </p>

              <p>
                Branch: {user.branch}
              </p>

              <p>
                Email: {user.email}
              </p>

              <p>
                Phone: {user.phone}
              </p>

              <p>
                Level: {user.level}
              </p>

              <p>
                Balance: $
                {user.balance.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        </main>
      </div>
  );
}