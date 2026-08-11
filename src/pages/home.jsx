import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthModal from "../components/AuthModal";
import CartDrawer from "../components/CartDrawer";
import flowereach from "../assets/products/flowereach.jpg.jpeg";
import totebag from "../assets/products/totebag.jpg.jpeg";
import catplush from "../assets/products/catplush.jpg.jpeg";
import heart from "../assets/products/heart.jpg.jpeg";

const products = [
  {
    name: "Custom Crochet Flowers",
    description: "Handmade flowers created in your choice of colors.",
    emoji: "🌷",
    image: flowereach,
  },
  {
    name: "Crochet Bags",
    description: "Custom-made bags designed around your style.",
    emoji: "👜",
    image: totebag,
  },
  {
    name: "Amigurumi",
    description: "Cute handmade crochet characters made to order.",
    emoji: "🧸",
    image: catplush,
  },
  {
    name: "Custom Gifts",
    description: "Personalized crochet gifts for every occasion.",
    emoji: "🎁",
    image: heart,
  },
];

function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-[#fffaf7] text-[#3d2925]">

      <nav className="sticky top-0 z-50 border-b border-[#eadbd5] bg-[#fffaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#6d3545]">Curvy Minds</h1>
            <p className="text-xs tracking-[0.2em] text-[#8c6b63]">HANDMADE • CUSTOM • CROCHET</p>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="/" className="font-medium hover:text-[#a34f67]">Home</a>
            <a href="/shop" className="font-medium hover:text-[#a34f67]">Creations</a>
            <a href="#about" className="font-medium hover:text-[#a34f67]">About</a>
            <a href="#contact" className="font-medium hover:text-[#a34f67]">Contact</a>
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

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-4 font-semibold uppercase tracking-[0.25em] text-[#a34f67]">Handmade with love</p>
          <h2 className="text-5xl font-bold leading-tight md:text-7xl">
            Your idea.<br /><span className="text-[#a34f67]">Our crochet.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#725b55]">
            Welcome to Curvy Minds — a handmade crochet business where everything is created on demand and made specially for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/shop" className="rounded-full bg-[#6d3545] px-7 py-3.5 font-semibold text-white transition hover:bg-[#542936]">Explore Creations</a>
            <a href="#contact" className="rounded-full border border-[#c99aaa] px-7 py-3.5 font-semibold text-[#6d3545] transition hover:bg-[#f8e8ed]">Request Custom Order</a>
          </div>
        </div>
        <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#f5e4e8]">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#e8c1cc]" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#ead4ca]" />
          <div className="relative text-center">
            <div className="text-9xl">🧶</div>
            <p className="mt-5 text-xl font-semibold text-[#6d3545]">Made just for you</p>
            <p className="mt-2 text-[#8c6b63]">Custom crochet • Handmade • Unique</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f8eee9] px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#a34f67]">Why Curvy Minds?</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Nothing ordinary. Nothing mass-produced.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="text-4xl">🧵</div>
              <h3 className="mt-5 text-xl font-bold">Made by Hand</h3>
              <p className="mt-3 leading-7 text-[#725b55]">Every piece is carefully handmade instead of coming from a factory.</p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="text-4xl">✨</div>
              <h3 className="mt-5 text-xl font-bold">Made to Order</h3>
              <p className="mt-3 leading-7 text-[#725b55]">Tell us what you want and we'll create something around your idea.</p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="text-4xl">💝</div>
              <h3 className="mt-5 text-xl font-bold">Made for You</h3>
              <p className="mt-3 leading-7 text-[#725b55]">Colors, designs and details can be customized to make every creation personal.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="creations" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#a34f67]">What we create</p>
          <h2 className="mt-3 text-4xl font-bold">A little bit of everything</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#725b55]">These are examples of what we can create. Have something else in mind? Just ask.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.name} className="group overflow-hidden rounded-3xl border border-[#eadbd5] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="h-56 overflow-hidden bg-[#f7e8e9] transition group-hover:scale-105">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#725b55]">{product.description}</p>
                <a href="/shop" className="mt-5 inline-block font-semibold text-[#a34f67] hover:text-[#6d3545]">Request this →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#6d3545] px-8 py-16 text-center text-white md:px-16">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#f2c8d2]">Have an idea?</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Let's turn it into crochet.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#ead5da]">Send us your idea, preferred colors and any references you have. We'll work with you to create something unique.</p>
          <button className="mt-8 rounded-full bg-white px-8 py-3.5 font-semibold text-[#6d3545] transition hover:bg-[#f8e8ed]">Start a Custom Order</button>
        </div>
      </section>

      <section id="about" className="bg-[#f8eee9] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#a34f67]">About Curvy Minds</p>
          <h2 className="mt-3 text-4xl font-bold">Handmade isn't just a product.</h2>
          <p className="mt-6 text-lg leading-8 text-[#725b55]">
            Curvy Minds is a custom crochet business focused on creating handmade pieces based on what our customers imagine. From small gifts to completely custom creations, every order is made with care and attention to detail.
          </p>
        </div>
      </section>

      <section id="contact" className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#a34f67]">Get in touch</p>
          <h2 className="mt-3 text-4xl font-bold">Let's make something together.</h2>
          <p className="mt-5 text-[#725b55]">Have a custom idea? Contact Curvy Minds and tell us what you're looking for.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="mailto:youremail@example.com" className="rounded-full bg-[#6d3545] px-7 py-3 font-semibold text-white">Contact Us</a>
            <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#c99aaa] px-7 py-3 font-semibold text-[#6d3545]">Instagram</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#eadbd5] bg-[#fffaf7] px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <p className="font-bold text-[#6d3545]">Curvy Minds</p>
            <p className="text-sm text-[#8c6b63]">Handmade. Custom. Yours.</p>
          </div>
          <p className="text-sm text-[#8c6b63]">© 2026 Curvy Minds. All rights reserved.</p>
        </div>
      </footer>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default Home