import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import Profile from "./pages/Profile";
import { isAuthed, logout } from "./utils/auth";

function Navbar() {
  const authed = isAuthed();
  return (
    <nav className="p-4 bg-sky-500 text-white flex justify-between sticky top-0 z-50">
      <span className="font-bold">Smart Habit Tracker</span>
      <div className="space-x-4">
        {authed && <Link to="/">Dashboard</Link>}
        {authed && <Link to="/charts">Charts</Link>}
        {authed && <Link to="/profile">Profile</Link>}
        {!authed ? (
          <Link to="/auth" className="bg-white text-sky-700 px-3 py-1 rounded-md font-semibold">
            Login / Signup
          </Link>
        ) : (
          <button onClick={logout} className="bg-white text-sky-700 px-3 py-1 rounded-md font-semibold">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function PrivateRoute({ children }) {
  const location = useLocation();
  if (!isAuthed()) return <Navigate to="/auth" state={{ from: location }} replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/charts"
          element={
            <PrivateRoute>
              <Charts />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
