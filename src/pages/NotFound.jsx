import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fffaf7] px-6 text-center text-[#3d2925]">
      <p className="text-8xl">🧶</p>
      <h1 className="mt-6 text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-[#725b55]">
        This thread seems to have come loose.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-[#6d3545] px-7 py-3 font-semibold text-white hover:bg-[#542936]"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;