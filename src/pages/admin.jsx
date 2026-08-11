import { useState, useEffect } from "react";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const ADMIN_PASSWORD = "curvyminds2026"; // change this to whatever you want

  useEffect(() => {
    if (authenticated) {
      fetch(`${import.meta.env.VITE_API_URL}/api/admin/orders`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Failed to fetch orders:", err));
    }
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf7]">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold text-[#6d3545]">Admin Login</h2>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#eadbd5] px-4 py-2.5 outline-none focus:border-[#a34f67]"
          />
          <button type="submit" className="mt-4 w-full rounded-full bg-[#6d3545] py-2.5 font-semibold text-white hover:bg-[#542936]">
            Log In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf7] px-6 py-16 text-[#3d2925]">
      <h1 className="mx-auto max-w-5xl text-3xl font-bold">All Orders</h1>

      <div className="mx-auto mt-8 max-w-5xl space-y-4">
        {orders.length === 0 ? (
          <p className="text-[#725b55]">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-[#eadbd5] bg-white p-6">
              <div className="flex justify-between">
                <p className="font-semibold">{order.user_email}</p>
                <p className="text-sm text-[#8c6b63]">{new Date(order.created_at).toLocaleString()}</p>
              </div>
              <p className="mt-2 text-sm text-[#725b55]">Status: {order.status}</p>
              <p className="mt-1 font-bold text-[#6d3545]">Total: ₹{order.total}</p>
              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-[#a34f67]">View items</summary>
                <pre className="mt-2 whitespace-pre-wrap text-xs text-[#725b55]">
                  {JSON.stringify(JSON.parse(order.items), null, 2)}
                </pre>
              </details>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Admin;