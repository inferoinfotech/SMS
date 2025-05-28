// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie'; // Import js-cookie

const ProtectedRoute = ({ children }) => {
  const admin = localStorage.getItem('adminId');

  // const r_admin = Cookies.get('token'); // Get the token from the cookie
  // console.log("Route Screen token", r_admin);
    
  if (!admin) {
    return <Navigate to="/" replace />;
  }

  if (!children) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedRoute;