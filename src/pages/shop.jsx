import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthModal from "../components/AuthModal";
import CartDrawer from "../components/CartDrawer";
import { link } from "react-router-dom"


function Shop() {
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const { user, logout } = useAuth();
  const { addToCart, totalItems } = useCart();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fffaf7] text-[#3d2925]">

      <nav className="sticky top-0 z-50 border-b border-[#eadbd5] bg-[#fffaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#6d3545]">Curvy Minds</h1>
            <p className="text-xs tracking-[0.2em] text-[#8c6b63]">HANDMADE • CUSTOM • CROCHET</p>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <link to="/" className="font-medium hover:text-[#a34f67]">Home</link>
            <link to="/shop" className="font-medium hover:text-[#a34f67]">Creations</link>
            <a href="/#about" className="font-medium hover:text-[#a34f67]">About</a>
            <a href="/#contact" className="font-medium hover:text-[#a34f67]">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative text-xl">
              🛒
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#a34f67] text-xs text-white">
                  {totalItems}
                </span>
              )}
            </button>
            {user ? (
              <button onClick={logout} className="rounded-full bg-[#6d3545] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#542936]">Log Out</button>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="rounded-full bg-[#6d3545] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#542936]">Login</button>
            )}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 pt-16 text-center">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#a34f67]">Curvy Minds</p>
        <h1 className="mt-3 text-5xl font-bold">Our Creations</h1>
        <p className="mx-auto mt-5 max-w-2xl text-[#725b55]">
          Explore some of the things we can create. Everything is handmade and can be customized according to your preferences.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-center gap-3 px-6">
        {["All", "Flowers", "Bags", "Amigurumi", "Accessories", "Gifts", "Home"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-[#6d3545] text-white border-[#6d3545]"
                : "border-[#d9b8c1] text-[#6d3545] hover:bg-[#6d3545] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-7 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-[#725b55]">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-[#eadbd5] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-64 overflow-hidden bg-[#f7e8e9]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#a34f67]">{product.category}</p>
                <h2 className="mt-2 text-xl font-bold">{product.name}</h2>
                <p className="mt-2 text-sm leading-6 text-[#725b55]">{product.description}</p>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-lg font-bold text-[#6d3545]">₹{product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-[#6d3545] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#542936]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default Shop;