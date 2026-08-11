import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          items: cartItems,
          total: totalPrice,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong placing your order.");
        return;
      }

      setOrderPlaced(true);
    } catch (err) {
      alert("Could not connect to server.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40">
      <div className="flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#6d3545]">Your Cart</h2>
          <button onClick={onClose} className="text-[#8c6b63]">✕</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-[#725b55]">Your cart is empty.</p>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border-b border-[#eadbd5] pb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f7e8e9] text-3xl overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    item.emoji
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-[#725b55]">₹{item.price}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-6 w-6 rounded-full border border-[#d9b8c1] text-sm">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-6 w-6 rounded-full border border-[#d9b8c1] text-sm">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-sm text-[#a34f67]">Remove</button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 border-t border-[#eadbd5] pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={handleCheckout} className="mt-4 w-full rounded-full bg-[#6d3545] py-3 font-semibold text-white hover:bg-[#542936]">
              Checkout
            </button>
          </div>
        )}

        {orderPlaced && (
          <div className="mt-4 rounded-2xl bg-[#f8eee9] p-4 text-center">
            <p className="font-semibold text-[#6d3545]">Order request received!</p>
            <p className="mt-1 text-sm text-[#725b55]">We'll reach out to confirm details and pricing.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;