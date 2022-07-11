import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/* Function which only allow's logged in users to see that page */
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
}
