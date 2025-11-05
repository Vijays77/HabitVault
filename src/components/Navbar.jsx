import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthed, logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const authed = isAuthed();

  const base = "px-3 py-2 rounded-md text-sm font-medium transition";
  const active = "bg-white/10";
  const idle = "hover:bg-white/10";

  const doLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <span className="font-extrabold tracking-tight">Smart Habit Tracker</span>
        <div className="flex items-center gap-2">
          {authed && (
            <NavLink to="/dashboard" className={({isActive}) => `${base} ${isActive?active:idle}`}>
              Dashboard
            </NavLink>
          )}
          {authed && (
            <NavLink to="/charts" className={({isActive}) => `${base} ${isActive?active:idle}`}>
              Charts
            </NavLink>
          )}
          {!authed ? (
            <NavLink
              to="/auth"
              className={({isActive}) =>
                `${base} ${isActive ? "bg-white text-blue-600" : "bg-white text-blue-600 hover:bg-white/90"}`
              }
            >
              Login / Signup
            </NavLink>
          ) : (
            <button onClick={doLogout} className="ml-1 px-3 py-2 rounded-md text-sm font-semibold bg-white text-blue-600 hover:bg-white/90">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
