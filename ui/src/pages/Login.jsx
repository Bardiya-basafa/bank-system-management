import { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  {
    username: "client",
    password: "client123",
    role: "client",
  },
  {
    username: "employee",
    password: "employee123",
    role: "employee",
  },
  {
    username: "manager",
    password: "manager123",
    role: "manager",
  },
  {
    username: "admin",
    password: "admin123",
    role: "admin",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
      setError("Invalid username or password");
      return;
    }

    navigate(`/${user.role}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <p className="text-3xl font-bold text-center text-black">
          Bank System
        </p>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Login to continue
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">
            Demo Accounts
          </p>

          <div>client / client123</div>
          <div>employee / employee123</div>
          <div>manager / manager123</div>
          <div>admin / admin123</div>
        </div>
      </div>
    </div>
  );
}