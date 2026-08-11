import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = mode === "login" ? "/api/login" : "/api/register";

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (mode === "register") {
        alert("Registered! Please check your email to verify your account before logging in.");
        setMode("login");
        return;
      }

      login(data.email);
      onClose();
    } catch (err) {
      setError("Could not connect to server");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-bold text-[#6d3545]">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <button onClick={onClose} className="text-[#8c6b63]">✕</button>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#eadbd5] px-4 py-2.5 outline-none focus:border-[#a34f67]"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#eadbd5] px-4 py-2.5 outline-none focus:border-[#a34f67]"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-[#6d3545] py-2.5 font-semibold text-white hover:bg-[#542936]"
          >
            {mode === "login" ? "Log In" : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[#725b55]">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="font-semibold text-[#a34f67]"
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;