import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      {/* Navbar boshlanishi */}
      <nav style={{ padding: "10px", backgroundColor: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Bosh sahifa</Link>
        <Link to="/categories" style={{ marginRight: "10px" }}>Kategoriyalar</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      {/* Navbar tugadi */}

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
