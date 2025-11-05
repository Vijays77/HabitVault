import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthed } from "../utils/auth";

export default function ProtectedRoute({ redirect = "/auth" }) {
  return isAuthed() ? <Outlet /> : <Navigate to={redirect} replace />;
}
